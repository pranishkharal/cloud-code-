import React from "react";
import { AbsoluteFill } from "remotion";
import { OceanBackground } from "./components/backgrounds/OceanBackground";
import { LandBackground } from "./components/backgrounds/LandBackground";

export const FoundationTestOcean: React.FC = () => {
  return (
    <AbsoluteFill>
      <OceanBackground depth={0.2} />
    </AbsoluteFill>
  );
};

export const FoundationTestLand: React.FC = () => {
  return (
    <AbsoluteFill>
      <LandBackground eraTheme="peach" />
    </AbsoluteFill>
  );
};
