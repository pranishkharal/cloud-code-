import React from "react";
import { Audio, staticFile } from "remotion";
import wordsData from "../../data/words.json";

interface WordItem {
  startFrame: number;
  endFrame: number;
}

interface MusicBedProps {
  src?: string;
  baseVolume?: number;
  duckedVolume?: number;
  attackFrames?: number;
  releaseFrames?: number;
}

export const MusicBed: React.FC<MusicBedProps> = ({
  src = "audio/music/drone-pad.mp3",
  baseVolume = 0.28,
  duckedVolume = 0.07,
  attackFrames = 8,
  releaseFrames = 14,
}) => {
  const words = wordsData as WordItem[];

  return (
    <Audio
      src={staticFile(src)}
      volume={(f) => {
        let isSpeaking = false;
        for (let i = 0; i < words.length; i++) {
          const w = words[i];
          if (f >= w.startFrame - attackFrames && f <= w.endFrame + releaseFrames) {
            isSpeaking = true;
            break;
          }
        }
        return isSpeaking ? duckedVolume : baseVolume;
      }}
      loop
    />
  );
};
