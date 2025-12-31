import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Node = React.forwardRef(({ color }, ref) => {
  return (
    <mesh ref={ref}>
      <sphereBufferGeometry args={[0.3, 25, 25]} />
      <meshBasicMaterial color={color} wireframe />
    </mesh>
  );
});
/*
const Node = React.forwardRef(({ color, maxNumRings }, ref) => {
  const numRings = useMemo(() => Math.ceil(Math.random() * maxNumRings), [maxNumRings]);
  const ringSizeIncrement = 0.13; // Size increment between each ring

  return (
    <group ref={ref}>
      {Array.from({ length: numRings }).map((_, index) => (
        <mesh key={index}>
          <ringBufferGeometry 
            args={[0.3 + index * ringSizeIncrement, 0.4 + index * ringSizeIncrement, 32]} 
          />
          <meshBasicMaterial color={color} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
});*/

const TubeLine = ({ startRef, endRef , color}) => {
  const meshRef = useRef();

  useFrame(() => {
    if (startRef.current && endRef.current && meshRef.current) {
      const points = [
        startRef.current.position.clone(),
        endRef.current.position.clone(),
      ];
      const path = new THREE.CatmullRomCurve3(points);
      const geometry = new THREE.TubeGeometry(path, 10, 0.03, 6, false);
      meshRef.current.geometry.dispose();
      meshRef.current.geometry = geometry;
    }
  });

  return (
    <mesh ref={meshRef}>
      <meshBasicMaterial color={color} transparent={true} opacity={0.5}/>
    </mesh>
  );
};

const AnimatedNetwork = ({ nodeCount, cubeSize, connectionsPerNode }) => {
  const nodes = useMemo(() => new Array(nodeCount).fill().map(() => ({
    ref: React.createRef(),
    position: new THREE.Vector3(
      (Math.random() - 0.8) * cubeSize,
      (Math.random() - 0.8) * cubeSize,
      (Math.random() - 0.8) * cubeSize
    ),
    velocity: new THREE.Vector3(
      (Math.random() - 0.5) * 0.3,
      (Math.random() - 0.5) * 0.3,
      (Math.random() - 0.5) * 0.3
    )
  })), [nodeCount, cubeSize]);

  const tubeLines = useMemo(() => {
    const lines = [];
    nodes.forEach((node, index) => {
      // Sort other nodes by distance to the current node
      const sortedNodes = nodes.slice().sort((a, b) => 
        node.position.distanceTo(a.position) - node.position.distanceTo(b.position)
      );

      // Connect to the nearest 'connectionsPerNode' nodes
      for (let i = 1; i <= connectionsPerNode && i < sortedNodes.length; i++) {
        lines.push({ startRef: node.ref, endRef: sortedNodes[i].ref });
      }
    });
    return lines;
  }, [nodes, connectionsPerNode]);
const sceneRef = useRef();
  useFrame(() => {
    nodes.forEach(node => {
      node.ref.current.position.add(node.velocity);
      ['x', 'y', 'z'].forEach(axis => {
        if (Math.abs(node.ref.current.position[axis]) > cubeSize / 2) {
          node.velocity[axis] *= -1;
        }
      });
    });
    if (sceneRef.current) {
     //   sceneRef.current.rotation.x += 0.005; 
     // sceneRef.current.rotation.y += 0.005; // Adjust rotation speed here
    }
  });

  return (
    <group ref={sceneRef}>
      {nodes.map((node, index) => (
        <Node key={index} ref={node.ref} color={`hsl(${360 + (index / nodeCount) * 60}, 100%, 50%)`} 
        maxNumRings={10} // Example maximum number of ring
        />
      ))}
      {tubeLines.map((line, index) => (
        <TubeLine key={index} startRef={line.startRef} endRef={line.endRef} color={`hsl(${360 - (index % nodeCount) * (60 / nodeCount)}, 100%, 50%)`}/>
      ))}
    </group>
  );
};

const SamplePageTwo = () => {
  const nodeCount = 300;  // Number of nodes
  const cubeSize = 25;   // Size of the cube area
  const connectionsPerNode = 1; // Number of connections per node

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
     <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'
     ,background: 'radial-gradient(circle,rgb(239, 239, 139),#fff,#dff7f0,#fff, #fff, #fff)' // Gradient from light blue to light cyan
        }}>
            <Canvas camera={{ fov: 75, position: [0, 0, 30] }}>
        <ambientLight intensity={0.5} />
        <AnimatedNetwork nodeCount={nodeCount} cubeSize={cubeSize} connectionsPerNode={connectionsPerNode}  />
        <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />
      </Canvas>
    </div>
    </div> 
  );
};

export default SamplePageTwo;
