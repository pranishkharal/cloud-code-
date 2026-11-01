import React from "react";
import { useCurrentFrame, staticFile } from "remotion";
import { colors, fonts, CAPTION_LEAD_MS } from "../../design/tokens";

export interface WordItem {
  word: string;
  start: number;
  end: number;
  startFrame: number;
  endFrame: number;
  sentenceIndex?: number;
}

export interface CaptionPage {
  words: WordItem[];
  startFrame: number;
  endFrame: number;
  pageIndex: number;
}

/**
 * makePages: Groups individual words into concise, readable caption pages (2-5 words).
 * Ensures phrases break naturally on punctuation or length limits.
 */
export function makePages(words: WordItem[], maxWordsPerPage = 4): CaptionPage[] {
  if (!words || words.length === 0) return [];

  const pages: CaptionPage[] = [];
  let currentPage: WordItem[] = [];

  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    currentPage.push(w);

    const hasPunctuation = /[.,!?;:]$/.test(w.word);
    const reachesLimit = currentPage.length >= maxWordsPerPage;
    const isLastWord = i === words.length - 1;

    // Break page if sentence ends, max word limit is met, or pause > 0.45s occurs
    const nextPause = !isLastWord && words[i + 1].start - w.end > 0.45;

    if (hasPunctuation || reachesLimit || nextPause || isLastWord) {
      const pStart = currentPage[0].startFrame;
      const pEnd = currentPage[currentPage.length - 1].endFrame + 8; // hold 8 frames
      pages.push({
        words: [...currentPage],
        startFrame: pStart,
        endFrame: pEnd,
        pageIndex: pages.length,
      });
      currentPage = [];
    }
  }

  return pages;
}

interface KineticCaptionProps {
  words: WordItem[];
  fps?: number;
  leadMs?: number;
}

/**
 * KineticCaption: Depth-Theory style animated word captions.
 * Placed at the root composition level so it seamlessly persists across scene sequences.
 */
export const KineticCaption: React.FC<KineticCaptionProps> = ({
  words,
  fps = 30,
  leadMs = CAPTION_LEAD_MS,
}) => {
  const currentFrame = useCurrentFrame();

  // Convert leadMs to leadFrames (e.g. 100ms = +3 frames @ 30fps)
  const leadFrames = Math.round((leadMs / 1000) * fps);
  const adjustedFrame = currentFrame + leadFrames;

  const pages = React.useMemo(() => makePages(words, 4), [words]);

  // Find active page for this frame
  const activePage = pages.find(
    (p) => adjustedFrame >= p.startFrame && adjustedFrame <= p.endFrame
  );

  if (!activePage) return null;

  return (
    <>
      {/* Font face declaration for offline Raleway */}
      <style>
        {`
          @font-face {
            font-family: 'Raleway';
            src: url('${staticFile("fonts/Raleway.ttf")}') format('truetype');
            font-weight: 100 900;
            font-style: normal;
          }
        `}
      </style>

      <div
        style={{
          position: "absolute",
          bottom: 46,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999, // Root layer above all sequences
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            background: "rgba(6, 24, 43, 0.88)",
            backdropFilter: "blur(14px)",
            border: `1px solid ${colors.borderSubtle}`,
            borderRadius: 20,
            padding: "14px 34px",
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            boxShadow: "0 12px 45px rgba(0, 0, 0, 0.8)",
            fontFamily: fonts.primary,
          }}
        >
          {activePage.words.map((w, idx) => {
            const isSpoken = adjustedFrame >= w.startFrame;
            const isCurrent =
              adjustedFrame >= w.startFrame && adjustedFrame <= w.endFrame;

            // Highlight keywords (names, stats, numbers, actions)
            const clean = w.word.toLowerCase().replace(/[^a-z0-9]/g, "");
            const isKeyword =
              ["great", "white", "shark", "dunkleosteus", "dunkleastus", "devonian", "5000", "survive", "survives", "speed", "armor"].includes(clean);

            let textColor = colors.textMuted;
            if (isCurrent) {
              textColor = isKeyword ? colors.accentGold : colors.textWhite;
            } else if (isSpoken) {
              textColor = colors.textWhite;
            }

            return (
              <span
                key={idx}
                style={{
                  fontSize: isCurrent ? 36 : 32,
                  fontWeight: isCurrent || isKeyword ? 900 : 700,
                  color: textColor,
                  textShadow: isCurrent
                    ? `0 0 24px ${isKeyword ? colors.accentGold : colors.mapGlow}`
                    : "none",
                  transform: isCurrent ? "scale(1.12)" : "scale(1.0)",
                  transition: "all 0.08s ease-out",
                  display: "inline-block",
                  letterSpacing: "0.5px",
                }}
              >
                {w.word}
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
};
