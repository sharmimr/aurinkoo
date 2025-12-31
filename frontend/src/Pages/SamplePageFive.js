import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const CubeFace = ({ vertices, color }) => {
  const faceGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(vertices);
    geometry.setIndex([0, 1, 2, 2, 3, 0]); // Define two triangles to form a square face
    return geometry;
  }, [vertices]);

  return (
    <mesh geometry={faceGeometry}>
      <meshBasicMaterial
        color={color}
        side={THREE.DoubleSide}
        transparent={true}
        opacity={0.7}
      />
    </mesh>
  );
};

const Cube = ({ position, cubeSize, rotationSpeed }) => {
  const cubeRef = useRef();
  const cubeHalfSize = cubeSize / 2;

  const cubeFaces = useMemo(
    () => [
      // Front and back faces
      {
        vertices: [
          new THREE.Vector3(-cubeHalfSize, -cubeHalfSize, cubeHalfSize),
          new THREE.Vector3(cubeHalfSize, -cubeHalfSize, cubeHalfSize),
          new THREE.Vector3(cubeHalfSize, cubeHalfSize, cubeHalfSize),
          new THREE.Vector3(-cubeHalfSize, cubeHalfSize, cubeHalfSize),
        ],
        color: "hsl(40, 83.00%, 82.00%)",
      },
      {
        vertices: [
          new THREE.Vector3(-cubeHalfSize, -cubeHalfSize, -cubeHalfSize),
          new THREE.Vector3(cubeHalfSize, -cubeHalfSize, -cubeHalfSize),
          new THREE.Vector3(cubeHalfSize, cubeHalfSize, -cubeHalfSize),
          new THREE.Vector3(-cubeHalfSize, cubeHalfSize, -cubeHalfSize),
        ],
        color: "hsl(40, 92%, 48%)",
      },
      // Left and right faces
      {
        vertices: [
          new THREE.Vector3(-cubeHalfSize, -cubeHalfSize, -cubeHalfSize),
          new THREE.Vector3(-cubeHalfSize, -cubeHalfSize, cubeHalfSize),
          new THREE.Vector3(-cubeHalfSize, cubeHalfSize, cubeHalfSize),
          new THREE.Vector3(-cubeHalfSize, cubeHalfSize, -cubeHalfSize),
        ],
        color: "hsl(13, 79.90%, 51.20%)",
      },
      {
        vertices: [
          new THREE.Vector3(cubeHalfSize, -cubeHalfSize, -cubeHalfSize),
          new THREE.Vector3(cubeHalfSize, -cubeHalfSize, cubeHalfSize),
          new THREE.Vector3(cubeHalfSize, cubeHalfSize, cubeHalfSize),
          new THREE.Vector3(cubeHalfSize, cubeHalfSize, -cubeHalfSize),
        ],
        color: "hsl(13, 79.10%, 77.50%)",
      },
      // Top and bottom faces
      {
        vertices: [
          new THREE.Vector3(-cubeHalfSize, cubeHalfSize, -cubeHalfSize),
          new THREE.Vector3(-cubeHalfSize, cubeHalfSize, cubeHalfSize),
          new THREE.Vector3(cubeHalfSize, cubeHalfSize, cubeHalfSize),
          new THREE.Vector3(cubeHalfSize, cubeHalfSize, -cubeHalfSize),
        ],
        color: "hsl(18, 78.40%, 65.50%))",
      },
      {
        vertices: [
          new THREE.Vector3(-cubeHalfSize, -cubeHalfSize, -cubeHalfSize),
          new THREE.Vector3(-cubeHalfSize, -cubeHalfSize, cubeHalfSize),
          new THREE.Vector3(cubeHalfSize, -cubeHalfSize, cubeHalfSize),
          new THREE.Vector3(cubeHalfSize, -cubeHalfSize, -cubeHalfSize),
        ],
        color: "hsl(40, 80%, 30%))",
      },
    ],
    [cubeHalfSize]
  );

  useFrame(() => {
    cubeRef.current.rotation.x += rotationSpeed.x;
    cubeRef.current.rotation.y += rotationSpeed.y;
    cubeRef.current.rotation.z += rotationSpeed.z;
  });

  return (
    <group ref={cubeRef} position={position}>
      {cubeFaces.map((face, index) => (
        <CubeFace
          key={index}
          vertices={face.vertices}
          color={face.color}
          transparent={true}
          opacity={0.7}
        />
      ))}
    </group>
  );
};

const SamplePageFive = ({ n = 3 }) => {
  const cubeSize = 15; // Size of the cube
  const positionRange = 10; // Range for random positions

  const cubes = useMemo(() => {
    const cubeData = [];
    for (let i = 0; i < n; i++) {
      cubeData.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * positionRange,
          (Math.random() - 0.5) * positionRange,
          (Math.random() - 0.5) * positionRange
        ),
        cubeSize: cubeSize,
        rotationSpeed: new THREE.Vector3(
          Math.random() * 0.02,
          Math.random() * 0.02,
          Math.random() * 0.02
        ),
      });
    }
    return cubeData;
  }, [n, positionRange, cubeSize]);

  return (
    <div
      style={{
        width: "50vw",
        height: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="d-none d-sm-block"
    >
      <h3
        style={{
          position: "absolute",
          top: "75%",
          left: "5%",
          color: "#000",
          fontSize: "1.2rem",
        }}
      >
        Partner with us to elevate your technical capabilities
      </h3>
      <Canvas camera={{ fov: 75, position: [0, 0, 30] }}>
        <ambientLight intensity={0.5} />
        <OrbitControls />
        {cubes.map((cube, index) => (
          <Cube
            key={index}
            position={cube.position}
            cubeSize={cube.cubeSize}
            rotationSpeed={cube.rotationSpeed}
          />
        ))}
      </Canvas>
    </div>
  );
};

export default SamplePageFive;
