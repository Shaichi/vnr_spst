import React, { useMemo } from 'react';
import * as THREE from 'three';

export default function DetailedHammerSickle({ color = "#ffd700" }: { color?: string }) {
  const { sickleShape, hammerShape } = useMemo(() => {
    // Vẽ biên dạng lưỡi liềm mượt mà bằng Cung tròn
    const sickle = new THREE.Shape();
    sickle.absarc(0, 0, 0.8, 0, Math.PI * 1.2, false);
    sickle.lineTo(0.2, 0.8);
    sickle.absarc(0, 0.1, 0.6, Math.PI * 1.2, 0, true);
    
    // Búa
    const hammer = new THREE.Shape();
    hammer.moveTo(-0.1, -1.0);
    hammer.lineTo(0.1, -1.0);
    hammer.lineTo(0.1, 0.5);
    hammer.lineTo(0.4, 0.5);
    hammer.lineTo(0.4, 0.8);
    hammer.lineTo(-0.5, 0.8);
    hammer.lineTo(-0.4, 0.5);
    hammer.lineTo(-0.1, 0.5);
    hammer.lineTo(-0.1, -1.0);

    return { sickleShape: sickle, hammerShape: hammer };
  }, []);

  const extrudeSettings = {
    depth: 0.1,
    bevelEnabled: true,
    bevelSegments: 5,
    steps: 1,
    bevelSize: 0.02,
    bevelThickness: 0.02,
  };

  return (
    <group scale={1} position={[0, 0.6, 0]}>
      {/* Lưỡi liềm (Sickle) */}
      <mesh position={[0.2, 0, -0.05]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <extrudeGeometry args={[sickleShape, extrudeSettings]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} envMapIntensity={1.5} />
      </mesh>
      
      {/* Tay cầm liềm */}
      <mesh position={[0.8, -0.6, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.7, 32]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} envMapIntensity={1.5} />
      </mesh>

      {/* Búa (Hammer) */}
      <mesh position={[-0.1, -0.1, -0.05]} rotation={[0, 0, -Math.PI / 4]} castShadow>
        <extrudeGeometry args={[hammerShape, extrudeSettings]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} envMapIntensity={1.5} />
      </mesh>
    </group>
  );
}
