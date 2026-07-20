import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

export default function DetailedTypewriter() {
  const bodyShape = useMemo(() => {
    const shape = new THREE.Shape();
    // Vỏ máy chữ uốn lượn mượt mà
    shape.moveTo(-0.8, -0.6);
    shape.lineTo(0.8, -0.6);
    shape.quadraticCurveTo(0.9, -0.6, 0.9, -0.4);
    shape.lineTo(0.9, 0.2);
    shape.quadraticCurveTo(0.9, 0.4, 0.6, 0.4);
    shape.lineTo(-0.6, 0.4);
    shape.quadraticCurveTo(-0.9, 0.4, -0.9, 0.2);
    shape.lineTo(-0.9, -0.4);
    shape.quadraticCurveTo(-0.9, -0.6, -0.8, -0.6);
    return shape;
  }, []);

  const extrudeBody = {
    depth: 1.2,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 2,
    bevelSize: 0.05,
    bevelThickness: 0.05,
  };

  const keyboardRows = [11, 10, 9, 8];

  return (
    <group scale={1} position={[0, -0.1, 0]}>
      {/* Vỏ máy chính (Main Body) */}
      <mesh position={[0, 0.2, -0.6]} rotation={[-Math.PI / 16, 0, 0]} castShadow receiveShadow>
        <extrudeGeometry args={[bodyShape, extrudeBody]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* Trục cuộn giấy (Platen) */}
      <group position={[0, 0.8, -0.4]}>
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 1.6, 32]} />
          <meshStandardMaterial color="#333333" roughness={0.9} />
        </mesh>
        {/* Trục xoay 2 bên (Knobs) */}
        <mesh position={[0.85, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.15, 16]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[-0.85, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.15, 16]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* Giấy (Paper) uốn cong */}
      <mesh position={[0, 1.1, -0.5]} rotation={[-Math.PI / 6, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.8, 0.8, 1.2, 16, 1, true, Math.PI * 0.9, Math.PI * 0.2]} />
        <meshStandardMaterial color="#f4ebd8" roughness={1} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Khung Carriage (Giá kẹp giấy) */}
      <mesh position={[0, 0.7, -0.6]} castShadow>
         <boxGeometry args={[1.8, 0.1, 0.2]} />
         <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Bàn phím (Keyboard) */}
      <group position={[0, 0.35, 0.2]} rotation={[Math.PI / 6, 0, 0]}>
        {keyboardRows.map((keysCount, rowIdx) => (
          <group key={rowIdx} position={[0, 0, rowIdx * 0.18]}>
            {[...Array(keysCount)].map((_, colIdx) => {
              const xOffset = (colIdx - keysCount / 2 + 0.5) * 0.14;
              return (
                <group key={colIdx} position={[xOffset, 0, 0]}>
                  {/* Cần trục phím */}
                  <mesh position={[0, -0.05, -0.05]} rotation={[-Math.PI/6, 0, 0]}>
                    <cylinderGeometry args={[0.01, 0.01, 0.15]} />
                    <meshStandardMaterial color="#888888" metalness={0.8} />
                  </mesh>
                  {/* Nút phím (Keycap) */}
                  <mesh position={[0, 0, 0]} castShadow>
                    <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
                    <meshStandardMaterial color="#e0e0e0" roughness={0.5} />
                  </mesh>
                  <mesh position={[0, 0, 0]}>
                    <cylinderGeometry args={[0.06, 0.06, 0.015, 16]} />
                    <meshStandardMaterial color="#222222" />
                  </mesh>
                </group>
              );
            })}
          </group>
        ))}
        {/* Phím Space */}
        <mesh position={[0, 0, 0.7]} castShadow>
           <boxGeometry args={[0.8, 0.03, 0.1]} />
           <meshStandardMaterial color="#222222" roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}
