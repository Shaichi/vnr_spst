import React, { useLayoutEffect, useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

export default function HatsuneMiku({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/assets/models/hatsune_miku.glb');
  const { actions } = useAnimations(animations, groupRef);

  useEffect(() => {
    // Tự động phát animation đầu tiên (idle)
    if (actions && Object.keys(actions).length > 0) {
      const firstActionKey = Object.keys(actions)[0];
      actions[firstActionKey]?.reset().fadeIn(0.5).play();
    }
  }, [actions]);

  useLayoutEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    // SkinnedMesh bounding boxes can be unreliable, so we use a fixed scale.
    // Adjust this scalar based on the actual model size (usually 1.0 is fine for 1 unit = 1 meter).
    const fixedScale = 1.6; 
    scene.scale.setScalar(fixedScale);
    scene.position.set(0, 0, 0); 
  }, [scene]);

  return (
    <group ref={groupRef} position={position}>
      <primitive object={scene} />
    </group>
  );
}
