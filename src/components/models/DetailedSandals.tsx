import React, { useMemo } from 'react';
import * as THREE from 'three';

export default function DetailedSandals() {
  // Biên dạng đế dép
  const soleShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.15, -0.4);
    shape.quadraticCurveTo(-0.25, -0.4, -0.25, -0.2); // gót dép
    shape.lineTo(-0.2, 0.1); // eo dép
    shape.quadraticCurveTo(-0.3, 0.4, -0.15, 0.5); // mũi dép trái
    shape.quadraticCurveTo(0, 0.55, 0.15, 0.5); // mũi dép phải
    shape.quadraticCurveTo(0.3, 0.4, 0.2, 0.1);
    shape.lineTo(0.25, -0.2); // gót phải
    shape.quadraticCurveTo(0.25, -0.4, 0.15, -0.4); // bo tròn gót
    shape.lineTo(-0.15, -0.4);
    return shape;
  }, []);

  const extrudeSole = {
    depth: 0.04,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.01,
    bevelThickness: 0.01,
  };

  // Đường cong quai dép (Curve)
  const strapCurve1 = useMemo(() => {
    return new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.22, 0.02, 0.2),
      new THREE.Vector3(0, 0.15, 0.2),
      new THREE.Vector3(0.22, 0.02, 0.15)
    );
  }, []);

  const strapCurve2 = useMemo(() => {
    return new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.22, 0.02, 0.1),
      new THREE.Vector3(0, 0.15, 0.1),
      new THREE.Vector3(0.22, 0.02, 0.2)
    );
  }, []);

  const strapCurveFront = useMemo(() => {
    return new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.15, 0.02, 0.45),
      new THREE.Vector3(0, 0.12, 0.4),
      new THREE.Vector3(0.15, 0.02, 0.45)
    );
  }, []);

  const strapCurveFront2 = useMemo(() => {
    return new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.1, 0.02, 0.4),
      new THREE.Vector3(0, 0.12, 0.45),
      new THREE.Vector3(0.1, 0.02, 0.4)
    );
  }, []);

  return (
    <group scale={1.5} position={[0, -0.3, 0]}>
      {/* Chiếc dép trái */}
      <group position={[-0.3, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        {/* Đế dép */}
        <mesh castShadow receiveShadow>
          <extrudeGeometry args={[soleShape, extrudeSole]} />
          <meshStandardMaterial color="#181818" roughness={0.9} />
        </mesh>
        
        {/* Quai hậu (chéo nhau) */}
        <mesh castShadow>
          <tubeGeometry args={[strapCurve1, 20, 0.02, 8, false]} />
          <meshStandardMaterial color="#111111" roughness={0.9} />
        </mesh>
        <mesh castShadow>
          <tubeGeometry args={[strapCurve2, 20, 0.02, 8, false]} />
          <meshStandardMaterial color="#111111" roughness={0.9} />
        </mesh>
        {/* Quai trước (chéo nhau) */}
        <mesh castShadow>
          <tubeGeometry args={[strapCurveFront, 20, 0.02, 8, false]} />
          <meshStandardMaterial color="#111111" roughness={0.9} />
        </mesh>
        <mesh castShadow>
          <tubeGeometry args={[strapCurveFront2, 20, 0.02, 8, false]} />
          <meshStandardMaterial color="#111111" roughness={0.9} />
        </mesh>
      </group>

      {/* Chiếc dép phải (Lật ngược trục X một chút và xoay xéo) */}
      <group position={[0.3, 0, 0.1]} rotation={[-Math.PI / 2, 0, -0.2]}>
        <mesh scale={[-1, 1, 1]} castShadow receiveShadow>
          <extrudeGeometry args={[soleShape, extrudeSole]} />
          <meshStandardMaterial color="#181818" roughness={0.9} />
        </mesh>
        
        {/* Quai hậu */}
        <mesh castShadow scale={[-1, 1, 1]}>
          <tubeGeometry args={[strapCurve1, 20, 0.02, 8, false]} />
          <meshStandardMaterial color="#111111" roughness={0.9} />
        </mesh>
        <mesh castShadow scale={[-1, 1, 1]}>
          <tubeGeometry args={[strapCurve2, 20, 0.02, 8, false]} />
          <meshStandardMaterial color="#111111" roughness={0.9} />
        </mesh>
        {/* Quai trước */}
        <mesh castShadow scale={[-1, 1, 1]}>
          <tubeGeometry args={[strapCurveFront, 20, 0.02, 8, false]} />
          <meshStandardMaterial color="#111111" roughness={0.9} />
        </mesh>
        <mesh castShadow scale={[-1, 1, 1]}>
          <tubeGeometry args={[strapCurveFront2, 20, 0.02, 8, false]} />
          <meshStandardMaterial color="#111111" roughness={0.9} />
        </mesh>
      </group>
    </group>
  );
}
