"use client";

import { EffectComposer, Bloom, Vignette, SMAA } from "@react-three/postprocessing";

export default function PostProcessingPipeline() {
  return (
    <EffectComposer multisampling={0}>
      {/* Subtle Bloom glow for gold highlights */}
      <Bloom
        intensity={0.1}
        luminanceThreshold={0.92}
        luminanceSmoothing={0.9}
        mipmapBlur
      />

      {/* Cinematic Vignette */}
      <Vignette
        eskil={false}
        offset={0.25}
        darkness={0.6}
      />

      {/* Anti-aliasing pass for crisp 3D edges */}
      <SMAA />
    </EffectComposer>
  );
}
