import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../../design/tokens";

interface LandBackgroundProps {
  eraTheme?: "peach" | "green" | "sepia";
}

export const LandBackground: React.FC<LandBackgroundProps> = ({ eraTheme = "peach" }) => {
  const frame = useCurrentFrame();

  // Sky gradient presets based on geological era
  const skyThemes = {
    peach: { top: "#4A1E2B", mid: "#8C4A42", horizon: "#C9A96A" },
    green: { top: "#13332A", mid: "#2B5E4F", horizon: "#88B08B" },
    sepia: { top: "#3D2B1F", mid: "#6E4E37", horizon: colors.landTan },
  };

  const theme = skyThemes[eraTheme] || skyThemes.peach;

  // Parallax layers (different speeds)
  const mountainParallaxBack = interpolate(frame, [0, 900], [0, -35]);
  const mountainParallaxMid = interpolate(frame, [0, 900], [0, -75]);
  const mountainParallaxFore = interpolate(frame, [0, 900], [0, -120]);

  // Slow teal water wave at bottom
  const waveShift = Math.sin(frame / 30) * 12;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${theme.top} 0%, ${theme.mid} 45%, ${theme.horizon} 80%)`,
        overflow: "hidden",
      }}
    >
      {/* Distant Mountains (Layer 1 - Slow) */}
      <svg
        viewBox="0 0 1920 600"
        style={{
          position: "absolute",
          bottom: 120,
          left: mountainParallaxBack,
          width: 2100,
          height: 480,
          opacity: 0.45,
        }}
      >
        <path
          d="M0,450 L180,280 L420,380 L680,220 L960,360 L1240,240 L1520,390 L1780,260 L1980,450 L2100,600 L0,600 Z"
          fill="#1C1824"
        />
      </svg>

      {/* Mid Mountains (Layer 2 - Mid speed) */}
      <svg
        viewBox="0 0 1920 600"
        style={{
          position: "absolute",
          bottom: 90,
          left: mountainParallaxMid,
          width: 2200,
          height: 420,
          opacity: 0.7,
        }}
      >
        <path
          d="M0,400 L240,260 L540,360 L820,210 L1120,340 L1440,230 L1760,330 L2040,220 L2200,600 L0,600 Z"
          fill="#13141E"
        />
      </svg>

      {/* Foreground Ridge (Layer 3 - Faster) */}
      <svg
        viewBox="0 0 1920 500"
        style={{
          position: "absolute",
          bottom: 70,
          left: mountainParallaxFore,
          width: 2300,
          height: 320,
          opacity: 0.95,
        }}
      >
        <path
          d="M0,320 L310,210 L680,300 L1040,190 L1420,280 L1800,180 L2300,320 L2300,500 L0,500 Z"
          fill="#0B0E14"
        />
      </svg>

      {/* Horizon Line */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          height: 2,
          background: "rgba(255, 255, 255, 0.2)",
        }}
      />

      {/* Teal Water Strip with Slow Wave */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: -40,
          right: -40,
          height: 82 + waveShift,
          background: `linear-gradient(180deg, ${colors.waterLight} 0%, ${colors.waterMid} 45%, ${colors.waterDeep} 100%)`,
          boxShadow: `0 -10px 25px ${colors.waterLight}40`,
        }}
      />
    </AbsoluteFill>
  );
};
