import React from "react";
import { AbsoluteFill, useCurrentFrame, random } from "remotion";
import { colors } from "../../design/tokens";

interface OceanBackgroundProps {
  depth?: number; // 0 to 1 (0 = surface light, 1 = abyssal dark)
}

export const OceanBackground: React.FC<OceanBackgroundProps> = ({ depth = 0 }) => {
  const frame = useCurrentFrame();

  // Darken colors based on depth prop (0 to 1)
  const darknessFactor = 1 - depth * 0.45;
  const topColor = depth > 0.5 ? colors.waterDeep : colors.waterMid;
  const bottomColor = colors.waterDeep;

  // 4-6 soft swaying light-ray shapes
  const raySway1 = Math.sin(frame / 45) * 22;
  const raySway2 = Math.cos(frame / 35) * 18;
  const raySway3 = Math.sin((frame + 30) / 40) * 25;

  // 40 deterministic particles drifting up using random('seed')
  const particles = Array.from({ length: 40 }).map((_, i) => {
    const seedX = random(`px-${i}`);
    const seedSpeed = random(`ps-${i}`);
    const seedSize = random(`pz-${i}`);

    const speed = 0.8 + seedSpeed * 1.4;
    const initialY = (i * 28) % 1080;
    const currentY = (initialY - frame * speed + 1080 * 2) % 1080;
    const currentX = (seedX * 1920 + Math.sin((frame + i * 20) / 35) * 20) % 1920;
    const size = 2 + seedSize * 3;
    const opacity = (1 - currentY / 1080) * 0.45 * darknessFactor;

    return { x: currentX, y: currentY, size, opacity, key: i };
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${topColor} 0%, ${bottomColor} 100%)`,
        overflow: "hidden",
      }}
    >
      {/* Light ray 1 */}
      <div
        style={{
          position: "absolute",
          top: -200,
          left: `calc(15% + ${raySway1}px)`,
          width: 320,
          height: 1400,
          background: `linear-gradient(180deg, ${colors.waterLight}40 0%, transparent 75%)`,
          transform: "rotate(-18deg)",
          filter: "blur(40px)",
          pointerEvents: "none",
          opacity: 0.65 * darknessFactor,
        }}
      />

      {/* Light ray 2 */}
      <div
        style={{
          position: "absolute",
          top: -200,
          right: `calc(20% + ${raySway2}px)`,
          width: 420,
          height: 1500,
          background: `linear-gradient(180deg, ${colors.mapGlow}30 0%, transparent 70%)`,
          transform: "rotate(16deg)",
          filter: "blur(50px)",
          pointerEvents: "none",
          opacity: 0.55 * darknessFactor,
        }}
      />

      {/* Light ray 3 */}
      <div
        style={{
          position: "absolute",
          top: -200,
          left: `calc(48% + ${raySway3}px)`,
          width: 250,
          height: 1300,
          background: `linear-gradient(180deg, ${colors.waterLight}25 0%, transparent 65%)`,
          transform: "rotate(-5deg)",
          filter: "blur(45px)",
          pointerEvents: "none",
          opacity: 0.5 * darknessFactor,
        }}
      />

      {/* 40 Particles */}
      {particles.map((p) => (
        <div
          key={p.key}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            backgroundColor: colors.mapGlow,
            opacity: p.opacity,
            filter: "blur(0.8px)",
          }}
        />
      ))}

      {/* Dark fade at the bottom (abyssal fade) */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 380,
          background: `linear-gradient(0deg, #020a13 0%, transparent 100%)`,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
