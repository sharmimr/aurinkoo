import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const N = 50; // Number of vertices per line
const AnimatedLines = ({ numberOfLines, travelDistance = 6 }) => {
  const linesData = useMemo(() => {
    const color = new THREE.Color();

    return new Array(numberOfLines).fill().map((_, lineIndex) => {
      const positions = new Float32Array(N * 3).fill(0);
      const colors = new Float32Array(N * 3);

      for (let i = 0; i < N; i++) {
        color.setHSL(0.3 + 0.4 * (lineIndex / numberOfLines), 1, 0.5); // Shades of green
        colors.set([color.r, color.g, color.b], i * 3);
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const material = new THREE.LineBasicMaterial({
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        linewidth: 20,
      });

      const line = new THREE.Line(geometry, material);
      line.motionRandomizer = Math.random() * 1 - 1;

      // Spheres at the ends of the line
      const sphereGeometry = new THREE.SphereGeometry(0.9, 20, 20);
      const sphereMaterial = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: true,
      });
      const startSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      const endSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

      return { line, startSphere, endSphere };
    });
  }, [numberOfLines]);

  const sceneRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    linesData.forEach(({ line, startSphere, endSphere }, lineIndex) => {
      const positions = line.geometry.attributes.position.array;
      for (let i = 0; i < positions.length / 2; i++) {
        const theta =
          t / 5 + line.motionRandomizer + (i / positions.length) * Math.PI * 2;
        const relativeFactor = Math.sin(
          theta + (lineIndex / numberOfLines) * Math.PI
        );

        positions[i * 3] =
          Math.sin(theta + lineIndex) * travelDistance * relativeFactor; // X position
        positions[i * 3 + 1] =
          Math.cos(theta + lineIndex) * travelDistance * relativeFactor; // Y position
        positions[i * 3 + 2] = (i - N / 2) * line.motionRandomizer; // Z position
      }
      line.geometry.attributes.position.needsUpdate = true;

      // Update start and end spheres
      const firstVertexIndex = 0;
      const lastVertexIndex = (positions.length / 3 - 1) * 3;
      startSphere.position.set(
        positions[firstVertexIndex],
        positions[firstVertexIndex + 1],
        positions[firstVertexIndex + 2]
      );
      endSphere.position.set(
        positions[lastVertexIndex],
        positions[lastVertexIndex + 1],
        positions[lastVertexIndex + 2]
      );
    });
    //if (sceneRef.current) {
    //    sceneRef.current.rotation.x += 0.005;
    //  sceneRef.current.rotation.y += 0.005; // Adjust rotation speed here
    //}
  });

  return (
    <group ref={sceneRef}>
      {linesData.map(({ line, startSphere, endSphere }, index) => (
        <React.Fragment key={index}>
          <primitive object={line} />
          <primitive object={startSphere} />
          <primitive object={endSphere} />
        </React.Fragment>
      ))}
    </group>
  );
};

const SamplePageFour = ({ enableZoom = false, travelDistance = 30 }) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Canvas camera={{ fov: 75, position: [0, 0, 50] }}>
        <ambientLight intensity={0.5} />
        <AnimatedLines numberOfLines={30} travelDistance={travelDistance} />
        <OrbitControls
          enableZoom={enableZoom}
          enableRotate={false}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
};

export default SamplePageFour;
