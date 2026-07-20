"use client";

import { EffectComposer, Bloom, Vignette, DepthOfField, SMAA } from "@react-three/postprocessing";
import { useStore } from "@/store/useStore";
import { RadialFocusMask } from "@/components/shaders/RadialFocusMaskEffect";

export default function PostProcessingPipeline() {
  const activeArtifactId = useStore((state) => state.activeArtifactId);
  const activeArtifact = useStore((state) => state.getActiveArtifact());

  const isMonument = activeArtifact?.type === 'monument';
  // Dynamic focal plane: 6.5m for monuments, 4.8m for standard artifacts, 3.5m for ambient hall view
  const focusDistance = activeArtifact ? (isMonument ? 0.065 : 0.048) : 0.035;

  return (
    <EffectComposer multisampling={0}>
      {/* High-Resolution Soft Depth of Field (Crisp focus, no text duplication) */}
      <DepthOfField
        focusDistance={focusDistance}
        focalLength={0.018}
        bokehScale={activeArtifactId ? 1.8 : 0.8}
        height={720}
      />

      {/* Feathered Radial Focus Mask Effect on Active Artifact */}
      <RadialFocusMask
        center={[0.38, 0.5]}
        innerRadius={0.28}
        outerRadius={0.68}
        blurIntensity={activeArtifactId ? 1.0 : 0}
        darkness={activeArtifactId ? 0.25 : 0}
      />

      {/* Warm Golden Bloom Glow */}
      <Bloom
        intensity={0.4}
        luminanceThreshold={0.75}
        luminanceSmoothing={0.85}
        mipmapBlur
      />

      {/* Cinematic Scene-Wide Vignette Frame */}
      <Vignette
        eskil={false}
        offset={0.18}
        darkness={0.62}
      />

      {/* Anti-aliasing pass for crisp edges */}
      <SMAA />
    </EffectComposer>
  );
}
