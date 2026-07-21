import React, { useLayoutEffect, useMemo } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

export default function DetailedTank() {
  const { scene } = useGLTF('/assets/models/t_5455_tank.glb');
  const bgTexture = useTexture('/assets/images/tank_background.jpg');

  useLayoutEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    const clone = scene.clone();
    clone.position.set(0, 0, 0);
    clone.rotation.set(0, 0, 0);
    clone.scale.set(1, 1, 1);
    clone.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    
    const maxDim = Math.max(size.x, size.y, size.z);
    let scale = 1;
    if (maxDim > 0) {
      // Bệ trưng bày rộng khoảng 1.5 - 2 đơn vị.
      // Mô hình cũ sau khi scale là khoảng 1.1 đơn vị. Gấp 4 lần = 4.4 đơn vị.
      scale = 4.4 / maxDim; 
    }

    scene.scale.setScalar(scale);
    scene.position.sub(center.multiplyScalar(scale));
    scene.position.y += (size.y * scale) / 2;
  }, [scene]);

  // VPA Roundel Star
  const starShape = useMemo(() => {
    const shape = new THREE.Shape();
    const outerRadius = 0.15;
    const innerRadius = 0.06;
    for (let i = 0; i < 10; i++) {
      const angle = (i * Math.PI) / 5 - Math.PI / 2;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      if (i === 0) shape.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
      else shape.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
    }
    shape.closePath();
    return shape;
  }, []);

  return (
    <group position={[0, -0.4, 0]} rotation={[0, Math.PI / 5, 0]}>
      {/* Background Image Panel */}
      {/* Đưa sang bên trái mô hình (trục +X) */}
      <mesh position={[3, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[4.8, 2.7]} />
        <meshBasicMaterial map={bgTexture} side={THREE.DoubleSide} />
      </mesh>

      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/assets/models/t_5455_tank.glb');
