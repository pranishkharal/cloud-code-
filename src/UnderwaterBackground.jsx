import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const UnderwaterBackground = () => {
  const frame = useCurrentFrame();

  // Gentle wave sway
  const sway = Math.sin(frame / 20) * 15;
  const lightShift = Math.sin(frame / 40) * 20;

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at 50% 10%, #0c3656 0%, #031424 55%, #01080e 100%)",
        overflow: "hidden",
      }}
    >
      {/* Light Caustics / Sun Rays */}
      <div
        style={{
          position: "absolute",
          top: -200,
          left: `calc(10% + ${sway}px)`,
          width: 350,
          height: 1400,
          background: "linear-gradient(180deg, rgba(80, 200, 255, 0.18) 0%, rgba(10, 80, 140, 0.03) 70%, transparent 100%)",
          transform: "rotate(-22deg)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -200,
          right: `calc(15% - ${lightShift}px)`,
          width: 450,
          height: 1500,
          background: "linear-gradient(180deg, rgba(120, 220, 255, 0.15) 0%, rgba(10, 80, 140, 0.02) 65%, transparent 100%)",
          transform: "rotate(18deg)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      {/* Floating Deep-Sea Particles */}
      {[...Array(18)].map((_, i) => {
        const speed = 1 + (i % 3) * 0.8;
        const initialY = (i * 70) % 1080;
        const currentY = (initialY - frame * speed + 1080 * 2) % 1080;
        const currentX = (i * 110 + Math.sin((frame + i * 20) / 30) * 25) % 1920;
        const size = 3 + (i % 4) * 2;
        const opacity = interpolate(currentY, [0, 200, 800, 1080], [0, 0.6, 0.6, 0]);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: currentX,
              top: currentY,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: "rgba(160, 230, 255, 0.7)",
              filter: "blur(1px)",
              opacity,
            }}
          />
        );
      })}

      {/* Cinematic Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 160px rgba(0, 0, 0, 0.85)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
