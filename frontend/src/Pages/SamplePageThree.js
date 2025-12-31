import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedLines = ({ numberOfLines }) => {
  const linesRef = useRef([]);
  const N = 45; // Number of vertices per line
  const color = new THREE.Color();

  // Create initial positions for multiple lines
  const linesData = useMemo(() => {
    return new Array(numberOfLines).fill().map(() => {
      const positions = new Float32Array(N * 3);
      const colors = new Float32Array(N * 3);

      for (let i = 0; i < N; i++) {
        color.setHSL(0.6, 1, (1 - i / (N - 1)) ** 4);
        colors.set([color.r, color.g, color.b], i * 3);
        positions.set([0, 0, 0], i * 3);
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.LineBasicMaterial({
        vertexColors: true,
        blending: THREE.AdditiveBlending,
      });

      return new THREE.Line(geometry, material);
    });
  }, [N, numberOfLines]);

  // Animation logic
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    linesData.forEach((line, lineIndex) => {
      const positions = line.geometry.attributes.position.array;
      for (let i = 0; i < N; i++) {
        const theta = (t + i / N * Math.PI * 2);
        // Wave Motion
        positions[i * 3] = i - N / 2; // X position
        positions[i * 3 + 1] = Math.sin(theta + lineIndex) * 5; // Y position
        // Parabolic Motion
        positions[i * 3 + 2] = ((i - N / 2) ** 2) / 20 - lineIndex * 2; // Z position
      }
      line.geometry.attributes.position.needsUpdate = true;
    });
  });

  return (
    <>
      {linesData.map((line, index) => (
        <primitive key={index} object={line} />
      ))}
    </>
  );
};

const SamplePageThree = () => {
  const numberOfLines = 20; // Number of lines to render

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Canvas camera={{ fov: 75, position: [0, 0, 50] }}>
        <ambientLight intensity={0.5} />
        <AnimatedLines numberOfLines={numberOfLines} />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default SamplePageThree;
