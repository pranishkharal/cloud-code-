import React from "react";

export const TimelineBar = ({ era, depth, currentSceneIndex, totalScenes }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 36,
        left: 60,
        right: 60,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid rgba(56, 189, 248, 0.25)",
        paddingBottom: 16,
        zIndex: 50,
      }}
    >
      {/* Left indicator */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            backgroundColor: "#38bdf8",
            boxShadow: "0 0 14px #38bdf8",
          }}
        />
        <span
          style={{
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: 2.5,
            textTransform: "uppercase",
            color: "#f1f5f9",
          }}
        >
          {era}
        </span>
      </div>

      {/* Progress markers across scenes */}
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {[...Array(totalScenes)].map((_, idx) => (
          <div
            key={idx}
            style={{
              width: idx === currentSceneIndex ? 36 : 14,
              height: 6,
              borderRadius: 3,
              backgroundColor:
                idx === currentSceneIndex
                  ? "#38bdf8"
                  : idx < currentSceneIndex
                  ? "#0284c7"
                  : "rgba(255, 255, 255, 0.2)",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* Right context info */}
      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: 13, color: "#94a3b8", letterSpacing: 1, textTransform: "uppercase" }}>
          SURVIVAL SIMULATION
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#38bdf8" }}>
          {depth}
        </div>
      </div>
    </div>
  );
};
