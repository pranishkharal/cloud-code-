import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const PrehistoricDocVideo = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation Timers (based on 30fps)
  // Scene 1: 0 - 150 frames (Intro Great White)
  // Scene 2: 150 - 360 frames (Dunkleosteus stats & Devonian Era)
  // Scene 3: 360 - 620 frames (Size Comparison & Clash)
  // Scene 4: 620 - 800 frames (Survival Verdict)

  // Subtitles synced with script
  let subtitle = "";
  if (frame >= 0 && frame < 75) subtitle = "The Great White Shark.";
  else if (frame >= 75 && frame < 165) subtitle = "Apex predator of the modern ocean.";
  else if (frame >= 165 && frame < 270) subtitle = "What if we dropped it 370 Million Years back into the Devonian?";
  else if (frame >= 270 && frame < 400) subtitle = "Here, the waters belong to Dunkleosteus.";
  else if (frame >= 400 && frame < 540) subtitle = "A 10-meter armored beast with over 4,000 lbs of bite force.";
  else if (frame >= 540 && frame < 670) subtitle = "Against this living tank, could our modern king survive?";
  else if (frame >= 670 && frame <= 800) subtitle = "Or become prehistoric prey?";

  // Stamp entrance
  const stampSpring = spring({
    frame: frame - 680,
    fps,
    config: { damping: 10, mass: 0.6 },
  });

  return (
    <AbsoluteFill
      style={{
        fontFamily: "'Trebuchet MS', 'Segoe UI', system-ui, sans-serif",
        color: "#ffffff",
      }}
    >
      {/* Top Geological Header Bar (Tusk & Talon Style) */}
      <div
        style={{
          position: "absolute",
          top: 36,
          left: 60,
          right: 60,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(80, 200, 255, 0.3)",
          paddingBottom: 16,
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: frame > 165 ? "#ef4444" : "#06b6d4",
              boxShadow: frame > 165 ? "0 0 12px #ef4444" : "0 0 12px #06b6d4",
            }}
          />
          <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#e2e8f0" }}>
            PREHISTORIC SURVIVAL SIMULATION
          </span>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#38bdf8", letterSpacing: 1 }}>
            {frame < 165 ? "HOLOCENE • MODERN ERA" : "DEVONIAN PERIOD • 370 MYA"}
          </div>
          <div style={{ fontSize: 13, color: "#94a3b8", letterSpacing: 0.5 }}>
            {frame < 165 ? "Ocean Depth: 0 - 1,200m" : "The Age of Armored Fishes"}
          </div>
        </div>
      </div>

      {/* CENTER VISUAL STAGE */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Phase 1: Great White Card (0 - 180) */}
        {frame < 190 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transform: `scale(${interpolate(frame, [0, 180], [1, 1.08])})`,
              opacity: interpolate(frame, [160, 185], [1, 0]),
            }}
          >
            {/* Silhouette / Representation */}
            <svg width="420" height="180" viewBox="0 0 200 90">
              <path
                d="M 10 45 C 40 30, 80 20, 130 35 C 160 40, 185 30, 195 45 C 185 60, 160 50, 130 55 C 80 70, 40 60, 10 45 Z"
                fill="url(#sharkGrad)"
              />
              <polygon points="90,26 115,5 110,32" fill="#38bdf8" />
              <polygon points="60,50 45,75 75,54" fill="#0284c7" />
              <polygon points="175,45 195,20 188,48 198,70 178,48" fill="#38bdf8" />
              <defs>
                <linearGradient id="sharkGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0369a1" />
                </linearGradient>
              </defs>
            </svg>

            <div style={{ fontSize: 44, fontWeight: 900, letterSpacing: -1, marginTop: 24, textShadow: "0 0 30px rgba(56,189,248,0.6)" }}>
              GREAT WHITE SHARK
            </div>
            <div style={{ fontSize: 18, color: "#93c5fd", letterSpacing: 4, textTransform: "uppercase" }}>
              Carcharodon carcharias
            </div>

            {/* Quick Stat Pill */}
            <div style={{ display: "flex", gap: 32, marginTop: 28 }}>
              <div style={{ background: "rgba(15, 23, 42, 0.75)", padding: "10px 22px", borderRadius: 12, border: "1px solid rgba(56, 189, 248, 0.3)" }}>
                <span style={{ color: "#94a3b8", fontSize: 13, display: "block" }}>LENGTH</span>
                <span style={{ fontSize: 22, fontWeight: 700, color: "#38bdf8" }}>5 - 6 METERS</span>
              </div>
              <div style={{ background: "rgba(15, 23, 42, 0.75)", padding: "10px 22px", borderRadius: 12, border: "1px solid rgba(56, 189, 248, 0.3)" }}>
                <span style={{ color: "#94a3b8", fontSize: 13, display: "block" }}>BURST SPEED</span>
                <span style={{ fontSize: 22, fontWeight: 700, color: "#38bdf8" }}>56 KM/H</span>
              </div>
            </div>
          </div>
        )}

        {/* Phase 2: Dunkleosteus Encounter & Stat Clash (180 - 640) */}
        {frame >= 170 && frame < 650 && (
          <div
            style={{
              width: 1400,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              opacity: interpolate(frame, [170, 195, 620, 645], [0, 1, 1, 0]),
            }}
          >
            {/* Great White Challenger Card */}
            <div
              style={{
                width: 480,
                background: "rgba(8, 24, 43, 0.85)",
                border: "1px solid rgba(56, 189, 248, 0.4)",
                borderRadius: 20,
                padding: "36px 32px",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
              }}
            >
              <div style={{ color: "#38bdf8", fontSize: 14, fontWeight: 800, letterSpacing: 2 }}>MODERN CONTENDER</div>
              <div style={{ fontSize: 32, fontWeight: 900, margin: "6px 0 20px 0" }}>Great White Shark</div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 6 }}>
                  <span>Armor / Protection</span>
                  <span style={{ color: "#94a3b8" }}>Low (Denticles only)</span>
                </div>
                <div style={{ height: 8, background: "#1e293b", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: "35%", height: "100%", background: "#38bdf8" }} />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 6 }}>
                  <span>Agility & Speed</span>
                  <span style={{ color: "#38bdf8" }}>95% (Apex Burst)</span>
                </div>
                <div style={{ height: 8, background: "#1e293b", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: "95%", height: "100%", background: "#38bdf8" }} />
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 6 }}>
                  <span>Bite Force</span>
                  <span style={{ color: "#94a3b8" }}>~1,800 PSI</span>
                </div>
                <div style={{ height: 8, background: "#1e293b", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: "45%", height: "100%", background: "#38bdf8" }} />
                </div>
              </div>
            </div>

            {/* VS Emblem in Center */}
            <div
              style={{
                fontSize: 64,
                fontWeight: 900,
                fontStyle: "italic",
                color: "#f59e0b",
                textShadow: "0 0 30px rgba(245, 158, 11, 0.7)",
                transform: `scale(${1 + Math.sin(frame / 10) * 0.05})`,
              }}
            >
              VS
            </div>

            {/* Dunkleosteus Titan Card */}
            <div
              style={{
                width: 480,
                background: "rgba(43, 14, 14, 0.85)",
                border: "1px solid rgba(239, 68, 68, 0.5)",
                borderRadius: 20,
                padding: "36px 32px",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
              }}
            >
              <div style={{ color: "#f87171", fontSize: 14, fontWeight: 800, letterSpacing: 2 }}>DEVONIAN APEX BEAST</div>
              <div style={{ fontSize: 32, fontWeight: 900, margin: "6px 0 20px 0" }}>Dunkleosteus terrelli</div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 6 }}>
                  <span>Armor Plating</span>
                  <span style={{ color: "#ef4444" }}>100% (Solid Bone Plates)</span>
                </div>
                <div style={{ height: 8, background: "#1e293b", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: "100%", height: "100%", background: "#ef4444" }} />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 6 }}>
                  <span>Agility & Speed</span>
                  <span style={{ color: "#94a3b8" }}>Moderate (Heavy)</span>
                </div>
                <div style={{ height: 8, background: "#1e293b", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: "50%", height: "100%", background: "#ef4444" }} />
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 6 }}>
                  <span>Bite Force</span>
                  <span style={{ color: "#ef4444" }}>~5,000+ PSI (Crushing)</span>
                </div>
                <div style={{ height: 8, background: "#1e293b", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: "95%", height: "100%", background: "#ef4444" }} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Phase 3: Final Verdict (640 - 800) */}
        {frame >= 640 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: 4, color: "#94a3b8", textTransform: "uppercase", marginBottom: 16 }}>
              DEVONIAN SURVIVAL VERDICT
            </div>

            {/* Stamp Box */}
            <div
              style={{
                transform: `scale(${stampSpring}) rotate(-6deg)`,
                opacity: Math.min(1, Math.max(0, (frame - 670) / 10)),
                border: "8px solid #f59e0b",
                borderRadius: 24,
                padding: "20px 60px",
                backgroundColor: "rgba(245, 158, 11, 0.15)",
                boxShadow: "0 0 60px rgba(245, 158, 11, 0.4)",
              }}
            >
              <span
                style={{
                  fontSize: 78,
                  fontWeight: 900,
                  color: "#fbbf24",
                  letterSpacing: 6,
                  textTransform: "uppercase",
                }}
              >
                SURVIVES (NARROWLY)
              </span>
            </div>

            <p
              style={{
                maxWidth: 820,
                textAlign: "center",
                fontSize: 24,
                lineHeight: 1.6,
                color: "#cbd5e1",
                marginTop: 36,
                opacity: interpolate(frame, [700, 740], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              }}
            >
              While outgunned by Dunkleosteus' armored jaws in head-to-head combat, the Great White’s superior burst speed and deep pelagic diving allow it to evade and hunt smaller Devonian placoderms.
            </p>
          </div>
        )}
      </div>

      {/* BOTTOM CAPTION BAR (Documentary Subtitles) */}
      <div
        style={{
          position: "absolute",
          bottom: 54,
          left: 100,
          right: 100,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(12px)",
            padding: "16px 36px",
            borderRadius: 16,
            border: "1px solid rgba(255, 255, 255, 0.15)",
            fontSize: 26,
            fontWeight: 600,
            color: "#f8fafc",
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            letterSpacing: 0.5,
          }}
        >
          {subtitle}
        </div>
      </div>
    </AbsoluteFill>
  );
};
