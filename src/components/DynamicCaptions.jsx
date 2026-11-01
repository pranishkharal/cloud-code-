import React from "react";
import { useCurrentFrame } from "remotion";

export const DynamicCaptions = ({ wordTimestamps, globalFrameOffset = 0 }) => {
  const currentFrame = useCurrentFrame();
  const absoluteFrame = currentFrame + globalFrameOffset;

  if (!wordTimestamps || wordTimestamps.length === 0) return null;

  // Find the word active at the current frame
  const currentIndex = wordTimestamps.findIndex(
    (w) => absoluteFrame >= w.startFrame && absoluteFrame <= w.endFrame
  );

  // If no exact match, find nearest previous word
  let activeIndex = currentIndex;
  if (activeIndex === -1) {
    for (let i = wordTimestamps.length - 1; i >= 0; i--) {
      if (absoluteFrame >= wordTimestamps[i].endFrame) {
        // Keep visible for 15 frames after word ends
        if (absoluteFrame - wordTimestamps[i].endFrame < 25) {
          activeIndex = i;
        }
        break;
      }
    }
  }

  if (activeIndex === -1) return null;

  // Window of words around the active one (e.g., 5 words total)
  const windowSize = 5;
  const startIdx = Math.max(0, activeIndex - 2);
  const endIdx = Math.min(wordTimestamps.length, startIdx + windowSize);
  const currentWords = wordTimestamps.slice(startIdx, endIdx);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 50,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        zIndex: 60,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          background: "rgba(3, 10, 20, 0.82)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(56, 189, 248, 0.3)",
          borderRadius: 18,
          padding: "16px 36px",
          display: "flex",
          gap: 12,
          boxShadow: "0 10px 40px rgba(0,0,0,0.7)",
        }}
      >
        {currentWords.map((item, idx) => {
          const isHighlighted =
            absoluteFrame >= item.startFrame && absoluteFrame <= item.endFrame;

          return (
            <span
              key={idx}
              style={{
                fontSize: 30,
                fontWeight: isHighlighted ? 900 : 600,
                color: isHighlighted ? "#38bdf8" : "#cbd5e1",
                textShadow: isHighlighted
                  ? "0 0 20px rgba(56, 189, 248, 0.9)"
                  : "none",
                transform: isHighlighted ? "scale(1.14)" : "scale(1.0)",
                transition: "all 0.1s ease",
                display: "inline-block",
              }}
            >
              {item.word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
