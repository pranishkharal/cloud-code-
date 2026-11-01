import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { UnderwaterBackground } from "./UnderwaterBackground";
import { PrehistoricDocVideo } from "./PrehistoricDocVideo";

export const DocumentaryComposition = () => {
  return (
    <AbsoluteFill>
      {/* Dynamic 2.5D underwater environment with particles and caustics */}
      <UnderwaterBackground />

      {/* Main Documentary Stage (HUD, Timelines, Comparison Cards, Verdict) */}
      <PrehistoricDocVideo />

      {/* Synchronized Neural Voiceover */}
      <Audio src={staticFile("voiceover.mp3")} volume={1} />
    </AbsoluteFill>
  );
};
