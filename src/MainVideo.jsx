import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const MainVideo = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring entrance for Title
  const titleEntrance = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  // Smooth rotation angle
  const rotation = interpolate(frame, [0, 150], [0, 360]);

  // Background hue shift
  const hue = interpolate(frame, [0, 150], [210, 310]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: `hsl(${hue}, 80%, 12%)`,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: "#ffffff",
      }}
    >
      {/* 3D/Animated Geometric element */}
      <div
        style={{
          width: 220,
          height: 220,
          borderRadius: 36,
          background: "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)",
          transform: `scale(${titleEntrance}) rotate(${rotation}deg)`,
          boxShadow: "0 20px 60px rgba(0, 242, 254, 0.4)",
          marginBottom: 40,
        }}
      />

      <h1
        style={{
          fontSize: 72,
          fontWeight: 800,
          margin: 0,
          opacity: titleEntrance,
          transform: `translateY(${(1 - titleEntrance) * 40}px)`,
          letterSpacing: "-2px",
          background: "linear-gradient(90deg, #ffffff, #a5b4fc)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Programmatic Video Engine
      </h1>

      <p
        style={{
          fontSize: 28,
          opacity: interpolate(frame, [20, 50], [0, 0.8], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          marginTop: 16,
          color: "#94a3b8",
        }}
      >
        Remotion • Three.js • GSAP • FFmpeg (Running on D:\)
      </p>
    </AbsoluteFill>
  );
};
