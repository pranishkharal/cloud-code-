import React from "react";
import { registerRoot, Composition } from "remotion";
import { FoundationTestOcean, FoundationTestLand } from "./FoundationTest";
import { DocumentaryMaster } from "./DocumentaryMaster";
import { SyncTestComposition } from "./SyncTestComposition";
import scriptData from "../script.json";

const totalDurationInFrames = scriptData.scenes.reduce(
  (sum, scene) => sum + scene.durationInFrames,
  0
);

export const RemotionRoot = () => {
  return (
    <>
      {/* 1. Sync & Calibration Test Composition (Step 4) */}
      <Composition
        id="SyncTest"
        component={SyncTestComposition}
        durationInFrames={1870} // Matches full vo.mp3 duration
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 2. Main Master Documentary Template with Root Kinetic Captions (Step 2 & 3) */}
      <Composition
        id="DocumentaryTemplate"
        component={DocumentaryMaster}
        durationInFrames={totalDurationInFrames}
        fps={scriptData.meta.fps || 30}
        width={scriptData.meta.width || 1920}
        height={scriptData.meta.height || 1080}
      />

      {/* 3. Foundation test compositions */}
      <Composition
        id="FoundationOcean"
        component={FoundationTestOcean}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="FoundationLand"
        component={FoundationTestLand}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

registerRoot(RemotionRoot);
