import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { TimelineBar } from "../components/TimelineBar";

export const SizeCompareScene = ({ sceneData, sceneIndex, totalScenes }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { leftCreature, rightCreature } = sceneData;

  // Slide-in animations
  const leftSlide = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14 },
  });

  const rightSlide = spring({
    frame: frame - 30,
    fps,
    config: { damping: 14 },
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <TimelineBar
        era={sceneData.era}
        depth={sceneData.depth}
        currentSceneIndex={sceneIndex}
        totalScenes={totalScenes}
      />

      {/* Heading */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontSize: 34,
            fontWeight: 900,
            letterSpacing: 2,
            color: "#ffffff",
            textTransform: "uppercase",
            textShadow: "0 0 25px rgba(56, 189, 248, 0.4)",
          }}
        >
          {sceneData.heading}
        </span>
      </div>

      {/* Comparison Arena */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: 170,
          gap: 80,
        }}
      >
        {/* Left Silhouette (Great White) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transform: `translateX(${(1 - leftSlide) * -120}px)`,
            opacity: leftSlide,
          }}
        >
          <Img
            src={staticFile(leftCreature.silhouette)}
            style={{
              height: 250 * leftCreature.scaleFactor,
              objectFit: "contain",
              filter: `drop-shadow(0 0 25px ${leftCreature.accentColor})`,
            }}
          />
          <div style={{ marginTop: 20, textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: leftCreature.accentColor }}>
              {leftCreature.name}
            </div>
            <div style={{ fontSize: 18, color: "#cbd5e1" }}>
              {leftCreature.lengthText} • {leftCreature.weightText}
            </div>
          </div>
        </div>

        {/* Center VS Divider & Measurement Grid */}
        <div
          style={{
            height: 280,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              width: 2,
              height: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
            }}
          />
          <div
            style={{
              position: "absolute",
              background: "#0f172a",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "50%",
              width: 52,
              height: 52,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              fontWeight: 900,
              color: "#fbbf24",
            }}
          >
            VS
          </div>
        </div>

        {/* Right Silhouette (Dunkleosteus) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transform: `translateX(${(1 - rightSlide) * 120}px)`,
            opacity: rightSlide,
          }}
        >
          <Img
            src={staticFile(rightCreature.silhouette)}
            style={{
              height: 250 * rightCreature.scaleFactor,
              objectFit: "contain",
              filter: `drop-shadow(0 0 25px ${rightCreature.accentColor})`,
            }}
          />
          <div style={{ marginTop: 20, textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: rightCreature.accentColor }}>
              {rightCreature.name}
            </div>
            <div style={{ fontSize: 18, color: "#cbd5e1" }}>
              {rightCreature.lengthText} • {rightCreature.weightText}
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Scale Baseline */}
      <div
        style={{
          position: "absolute",
          bottom: 155,
          left: 200,
          right: 200,
          borderBottom: "2px dashed rgba(255, 255, 255, 0.25)",
        }}
      />
    </AbsoluteFill>
  );
};
