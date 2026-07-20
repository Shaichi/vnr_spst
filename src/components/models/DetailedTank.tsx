import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

export default function DetailedTank() {
  const wheelCount = 5;

  const trackShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-1.2, -0.2);
    shape.lineTo(1.2, -0.2);
    shape.absarc(1.2, 0.1, 0.3, -Math.PI / 2, Math.PI / 2, false);
    shape.lineTo(-1.2, 0.4);
    shape.absarc(-1.2, 0.1, 0.3, Math.PI / 2, -Math.PI / 2, false);
    return shape;
  }, []);

  const trackSettings = {
    depth: 0.4,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.05,
    bevelThickness: 0.05,
  };

  const bodyShape = useMemo(() => {
    const shape = new THREE.Shape();
    // Profile of tank hull (sloped armor)
    shape.moveTo(-1.6, 0);
    shape.lineTo(1.5, 0);
    shape.lineTo(1.6, 0.3); // front slope
    shape.lineTo(1.3, 0.6);
    shape.lineTo(-1.4, 0.6);
    shape.lineTo(-1.6, 0.3);
    return shape;
  }, []);

  const bodySettings = {
    depth: 1.6,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.05,
    bevelThickness: 0.05,
  };

  return (
    <group scale={0.6} position={[0, -0.2, 0]} rotation={[0, Math.PI / 5, 0]}>
      {/* Left Tracks & Wheels */}
      <group position={[0, 0.3, 0.9]}>
        <mesh castShadow receiveShadow>
          <extrudeGeometry args={[trackShape, trackSettings]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>
        {[...Array(wheelCount)].map((_, i) => (
          <mesh key={`L-${i}`} position={[-1.0 + i * 0.5, 0.1, 0.2]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.25, 0.25, 0.45, 16]} />
            <meshStandardMaterial color="#2a3322" metalness={0.5} roughness={0.7} />
          </mesh>
        ))}
      </group>

      {/* Right Tracks & Wheels */}
      <group position={[0, 0.3, -1.3]}>
        <mesh castShadow receiveShadow>
          <extrudeGeometry args={[trackShape, trackSettings]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>
        {[...Array(wheelCount)].map((_, i) => (
          <mesh key={`R-${i}`} position={[-1.0 + i * 0.5, 0.1, 0.2]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.25, 0.25, 0.45, 16]} />
            <meshStandardMaterial color="#2a3322" metalness={0.5} roughness={0.7} />
          </mesh>
        ))}
      </group>

      {/* Main Body Hull */}
      <mesh position={[0, 0.3, -0.8]} castShadow receiveShadow>
        <extrudeGeometry args={[bodyShape, bodySettings]} />
        <meshStandardMaterial color="#455533" roughness={0.8} />
      </mesh>

      {/* Turret */}
      <group position={[0.2, 0.9, 0]}>
        {/* Dome */}
        <mesh castShadow receiveShadow position={[0, 0.15, 0]}>
          <sphereGeometry args={[0.7, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#3d4a2d" roughness={0.7} />
        </mesh>
        {/* Main Gun Barrel */}
        <mesh position={[1.5, 0.25, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.08, 0.12, 2.0, 16]} />
          <meshStandardMaterial color="#3d4a2d" roughness={0.7} />
        </mesh>
        {/* Muzzle Brake */}
        <mesh position={[2.5, 0.25, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.3, 16]} />
          <meshStandardMaterial color="#2a3322" roughness={0.8} />
        </mesh>
        {/* Anti-aircraft Machine Gun */}
        <group position={[-0.2, 0.8, -0.2]}>
           <mesh rotation={[0, 0, -Math.PI / 6]} castShadow>
              <cylinderGeometry args={[0.02, 0.02, 0.8]} />
              <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
           </mesh>
        </group>
        {/* Hatch */}
        <mesh position={[-0.3, 0.82, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
           <cylinderGeometry args={[0.2, 0.2, 0.05, 16]} />
           <meshStandardMaterial color="#455533" />
        </mesh>
      </group>

      {/* External Fuel Tanks */}
      <mesh position={[-1.6, 0.6, 0.5]} rotation={[0, 0, Math.PI / 2]} castShadow>
         <cylinderGeometry args={[0.2, 0.2, 0.6, 16]} />
         <meshStandardMaterial color="#3d4a2d" roughness={0.8} />
      </mesh>
      <mesh position={[-1.6, 0.6, -0.5]} rotation={[0, 0, Math.PI / 2]} castShadow>
         <cylinderGeometry args={[0.2, 0.2, 0.6, 16]} />
         <meshStandardMaterial color="#3d4a2d" roughness={0.8} />
      </mesh>

      {/* Text 390 */}
      <Text position={[0.7, 1.25, 0.7]} rotation={[0, Math.PI/2.5, 0]} fontSize={0.25} color="#ffffff" font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf">
        390
      </Text>
      <Text position={[0.7, 1.25, -0.7]} rotation={[0, -Math.PI/2.5, 0]} fontSize={0.25} color="#ffffff" font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf">
        390
      </Text>
    </group>
  );
}
