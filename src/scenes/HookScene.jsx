import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TimelineBar } from "../components/TimelineBar";

export const HookScene = ({ sceneData, sceneIndex, totalScenes }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow zoom on background / text
  const zoom = interpolate(frame, [0, sceneData.durationInFrames], [1, 1.15]);
  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

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
          transform: `scale(${zoom * entrance})`,
          opacity: interpolate(frame, [0, 20], [0, 1]),
          padding: "0 100px",
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: 4,
            color: "#38bdf8",
            textTransform: "uppercase",
            marginBottom: 20,
            border: "1px solid rgba(56, 189, 248, 0.4)",
            padding: "8px 24px",
            borderRadius: 30,
            background: "rgba(56, 189, 248, 0.1)",
          }}
        >
          {sceneData.tag}
        </div>

        <h1
          style={{
            fontSize: 84,
            fontWeight: 900,
            lineHeight: 1.08,
            letterSpacing: -2,
            margin: 0,
            background: "linear-gradient(180deg, #ffffff 0%, #93c5fd 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 20px 60px rgba(0, 0, 0, 0.8)",
          }}
        >
          {sceneData.title}
        </h1>

        <h2
          style={{
            fontSize: 54,
            fontWeight: 800,
            color: "#38bdf8",
            margin: "16px 0 0 0",
            letterSpacing: 2,
            textShadow: "0 0 35px rgba(56, 189, 248, 0.6)",
          }}
        >
          {sceneData.subtitle}
        </h2>
      </div>
    </AbsoluteFill>
  );
};
