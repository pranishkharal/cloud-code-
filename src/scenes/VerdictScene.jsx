import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TimelineBar } from "../components/TimelineBar";

export const VerdictScene = ({ sceneData, sceneIndex, totalScenes }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Violent stamp slam effect
  const stampSpring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 9, mass: 0.5 },
  });

  const isDies = sceneData.verdictType === "DIES";
  const badgeBorderColor = isDies ? "#ef4444" : "#fbbf24";
  const badgeGlow = isDies ? "rgba(239, 68, 68, 0.5)" : "rgba(251, 191, 36, 0.4)";

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TimelineBar
        era={sceneData.era}
        depth={sceneData.depth}
        currentSceneIndex={sceneIndex}
        totalScenes={totalScenes}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          maxWidth: 1000,
          padding: "0 40px",
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 4,
            color: "#94a3b8",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          SIMULATION FINAL VERDICT
        </div>

        {/* The Animated Stamp Badge */}
        <div
          style={{
            transform: `scale(${stampSpring}) rotate(-5deg)`,
            opacity: interpolate(frame, [15, 25], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            border: `8px solid ${badgeBorderColor}`,
            borderRadius: 24,
            padding: "18px 60px",
            backgroundColor: "rgba(10, 15, 26, 0.75)",
            boxShadow: `0 0 60px ${badgeGlow}`,
            marginBottom: 34,
          }}
        >
          <span
            style={{
              fontSize: 76,
              fontWeight: 900,
              color: badgeBorderColor,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            {sceneData.badgeText}
          </span>
        </div>

        {/* Reason Headline */}
        <div
          style={{
            fontSize: 26,
            fontWeight: 800,
            color: "#38bdf8",
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 14,
            opacity: interpolate(frame, [35, 55], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {sceneData.reasonTitle}
        </div>

        {/* Reason Detailed Paragraph */}
        <p
          style={{
            fontSize: 24,
            lineHeight: 1.6,
            color: "#cbd5e1",
            margin: 0,
            opacity: interpolate(frame, [45, 65], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {sceneData.reason}
        </p>
      </div>
    </AbsoluteFill>
  );
};
