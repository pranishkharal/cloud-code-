import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { TimelineBar } from "../components/TimelineBar";

export const CreatureIntroScene = ({ sceneData, sceneIndex, totalScenes }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { creature } = sceneData;

  // Ken Burns zoom & pan effect
  const zoom = interpolate(frame, [0, sceneData.durationInFrames], [1.02, 1.18]);
  const panX = interpolate(frame, [0, sceneData.durationInFrames], [-20, 25]);

  // Stat panel entrance spring
  const panelSpring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 13, mass: 0.7 },
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <TimelineBar
        era={sceneData.era}
        depth={sceneData.depth}
        currentSceneIndex={sceneIndex}
        totalScenes={totalScenes}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "100px 100px 80px 100px",
        }}
      >
        {/* Left Side: Ken Burns Creature Image Showcase */}
        <div
          style={{
            flex: 1.2,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              transform: `scale(${zoom}) translateX(${panX}px)`,
              transition: "transform 0.05s linear",
              filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.85))",
            }}
          >
            <Img
              src={staticFile(creature.image)}
              style={{
                maxWidth: "100%",
                maxHeight: 520,
                objectFit: "contain",
              }}
            />
          </div>
        </div>

        {/* Right Side: Animated Creature Stat HUD */}
        <div
          style={{
            flex: 0.9,
            transform: `scale(${panelSpring})`,
            opacity: interpolate(frame, [20, 35], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            background: "rgba(10, 20, 35, 0.88)",
            border: "1px solid rgba(239, 68, 68, 0.4)",
            borderRadius: 24,
            padding: "36px 36px",
            boxShadow: "0 25px 60px rgba(0,0,0,0.7)",
          }}
        >
          <div style={{ color: "#f87171", fontSize: 13, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase" }}>
            {creature.role}
          </div>
          <div style={{ fontSize: 44, fontWeight: 900, color: "#ffffff", letterSpacing: -1, marginTop: 4 }}>
            {creature.name}
          </div>
          <div style={{ fontSize: 16, color: "#94a3b8", fontStyle: "italic", marginBottom: 26 }}>
            {creature.scientificName} • {creature.era}
          </div>

          {/* Animated Stat Bars */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {creature.stats.map((st, i) => {
              const barDelay = 40 + i * 15;
              const barFill = interpolate(
                frame,
                [barDelay, barDelay + 25],
                [0, st.percent],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );

              return (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, marginBottom: 6 }}>
                    <span style={{ color: "#cbd5e1", fontWeight: 600 }}>{st.label}</span>
                    <span style={{ color: st.color || "#ef4444", fontWeight: 800 }}>{st.value}</span>
                  </div>
                  <div
                    style={{
                      height: 10,
                      background: "rgba(255, 255, 255, 0.1)",
                      borderRadius: 5,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${barFill}%`,
                        height: "100%",
                        background: `linear-gradient(90deg, ${st.color || "#ef4444"}, #f87171)`,
                        borderRadius: 5,
                        boxShadow: `0 0 12px ${st.color || "#ef4444"}`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
