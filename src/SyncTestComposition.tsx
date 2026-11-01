import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import wordsData from "./data/words.json";
import { OceanBackground } from "./components/backgrounds/OceanBackground";
import { KineticCaption, WordItem } from "./components/overlays/KineticCaption";
import { fonts, colors } from "./design/tokens";

export const SyncTestComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const words = wordsData as WordItem[];

  // Detect starts of new sentences (sentenceIndex changes or punctuation followed by word)
  const sentenceStarts: number[] = [];
  let lastSentenceIdx = -1;

  for (const w of words) {
    if (w.sentenceIndex !== undefined && w.sentenceIndex !== lastSentenceIdx) {
      sentenceStarts.push(w.startFrame);
      lastSentenceIdx = w.sentenceIndex;
    }
  }

  // Flash white for 3 frames at every sentence start
  const isFlash = sentenceStarts.some(
    (sf) => frame >= sf && frame <= sf + 3
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <OceanBackground depth={0.3} />

      {/* Voiceover audio track */}
      <Audio src={staticFile("audio/vo.mp3")} volume={1.0} />

      {/* HUD Info */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 60,
          fontFamily: fonts.mono,
          color: colors.mapGlow,
          fontSize: 22,
          background: "rgba(0,0,0,0.7)",
          padding: "16px 24px",
          borderRadius: 12,
          border: `1px solid ${colors.borderSubtle}`,
        }}
      >
        <div>TIMING & SYNC CALIBRATION MONITOR</div>
        <div style={{ color: colors.textWhite, marginTop: 6 }}>
          Frame: {frame} | Time: {(frame / 30).toFixed(2)}s
        </div>
        <div style={{ color: colors.accentGold, marginTop: 4 }}>
          White Flash = Sentence Acoustic Onset
        </div>
      </div>

      {/* Kinetic Captions positioned at ROOT LEVEL */}
      <KineticCaption words={words} />

      {/* White flash overlay triggered at sentence starts */}
      {isFlash && (
        <AbsoluteFill
          style={{
            backgroundColor: "#FFFFFF",
            opacity: 0.85,
            pointerEvents: "none",
            zIndex: 10000,
          }}
        />
      )}
    </AbsoluteFill>
  );
};
