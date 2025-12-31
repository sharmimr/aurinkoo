///assets/images/

import React, { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const LogoCube = () => {
  const texture = useLoader(
    THREE.TextureLoader,
    "/assets/images/PrelimLogoLeftSide.png"
  ); // Path to your logo image
  const cubeRef = useRef();

  // Apply rotation to cube
  useFrame(() => {
    cubeRef.current.rotation.x += 0.01;
    cubeRef.current.rotation.y += 0.01;
  });

  // Size of the cube
  const size = 2;
  const halfSize = size / 2;

  // Generate the planes
  const planes = [
    // Positive x, y, z planes
    { position: [halfSize, 0, 0], rotation: [0, Math.PI / 2, 0] },
    { position: [0, halfSize, 0], rotation: [Math.PI / 2, 0, 0] },
    { position: [0, 0, halfSize], rotation: [0, 0, 0] },
    // Negative x, y, z planes
    { position: [-halfSize, 0, 0], rotation: [0, -Math.PI / 2, 0] },
    { position: [0, -halfSize, 0], rotation: [-Math.PI / 2, 0, 0] },
    { position: [0, 0, -halfSize], rotation: [0, Math.PI, 0] },
  ];

  return (
    <group ref={cubeRef}>
      {planes.map((plane, index) => (
        <mesh position={plane.position} rotation={plane.rotation} key={index}>
          <planeBufferGeometry attach="geometry" args={[size, size]} />
          <meshBasicMaterial
            attach="material"
            map={texture}
            transparent={true}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
};

const SamplePageSix = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <LogoCube />
        <OrbitControls
          enableZoom={false}
          enableRotate={false}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
};

export default SamplePageSix;
