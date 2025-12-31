import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
//import imageSrc from "/assets/images/PrelimLogoV4.png"; // Path to your image

// Image component
const CenteredImage = () => {
  const texture = useLoader(
    THREE.TextureLoader,
    "/assets/images/aurinko-cg.png"
  );
  const imageAspect = texture.image
    ? texture.image.width / texture.image.height
    : 1;

  // Adjust the plane size based on the image's aspect ratio
  const planeWidth = 15;
  const planeHeight = planeWidth / imageAspect;

  return (
    <mesh position={[0, 0, 0]}>
      <planeBufferGeometry args={[planeWidth, planeHeight]} />
      <meshBasicMaterial map={texture} transparent={true} />
    </mesh>
  );
};

// Node component
const Node = ({ color, position }) => {
  const nodeRef = useRef();

  return (
    <mesh ref={nodeRef} position={position}>
      <sphereBufferGeometry args={[0.3, 16, 16]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
};

// Connection component
const Connection = ({ start, end, color }) => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      const points = [start, end];
      const path = new THREE.CatmullRomCurve3(points);
      const geometry = new THREE.TubeGeometry(path, 20, 0.08, 8, false);
      meshRef.current.geometry.dispose();
      meshRef.current.geometry = geometry;
    }
  });

  return (
    <mesh ref={meshRef}>
      <meshBasicMaterial color={color} />
    </mesh>
  );
};

// Generates points using the Fibonacci sphere algorithm
const generateFibonacciSpherePoints = (nodeCount, radius) => {
  const points = [];
  const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

  for (let i = 0; i < nodeCount; i++) {
    const y = 1 - (i / (nodeCount - 1)) * 2; // y goes from 1 to -1
    const radiusAtY = Math.sqrt(1 - y * y); // radius at y

    const theta = phi * i; // golden angle increment

    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    points.push(new THREE.Vector3(x * radius, y * radius, z * radius));
  }

  return points;
};

// AnimatedNetwork component
const AnimatedNetwork = ({ nodeCount, sphereRadius }) => {
  const nodes = useState(() =>
    generateFibonacciSpherePoints(nodeCount, sphereRadius).map(
      (position, i) => {
        return {
          position,
          color: `hsl(${120 + (i / nodeCount) * 80}, 80%, 50%)`,
        };
      }
    )
  )[0];

  // Find nearest nodes for connections
  const connections = nodes
    .map((node) => {
      const distances = nodes.map((otherNode) =>
        node.position.distanceTo(otherNode.position)
      );
      return distances
        .map((distance, index) => ({ distance, index }))
        .sort((a, b) => a.distance - b.distance)
        .slice(1, 3) // Get top 3 nearest nodes
        .map((nearest) => ({
          start: node.position,
          end: nodes[nearest.index].position,
          color: node.color,
        }));
    })
    .flat();

  return (
    <>
      {nodes.map((node, index) => (
        <Node key={index} color={node.color} position={node.position} />
      ))}
      {connections.map((connection, index) => (
        <Connection
          key={index}
          start={connection.start}
          end={connection.end}
          color={connection.color}
        />
      ))}
    </>
  );
};

// RotatingGroup component
const RotatingGroup = ({ children }) => {
  const groupRef = useRef(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.02;
      groupRef.current.rotation.y += 0.02;
      groupRef.current.rotation.z += 0.02;
    }
  });

  return <group ref={groupRef}>{children}</group>;
};

// Main component
const SamplePageSeven = () => {
  const nodeCount = 200;
  const sphereRadius = 8;

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ fov: 75, position: [0, 0, 30] }}>
        <ambientLight intensity={0.5} />
        <CenteredImage />
        <RotatingGroup>
          <AnimatedNetwork nodeCount={nodeCount} sphereRadius={sphereRadius} />
        </RotatingGroup>
        <OrbitControls
          enableZoom={false}
          enableRotate={false}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
};

export default SamplePageSeven;
