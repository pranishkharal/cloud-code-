// src/utils/audioSync.ts
import wordsData from "../data/words.json";

export interface WordTimestamp {
  word: string;
  start: number;
  end: number;
  startFrame: number;
  endFrame: number;
  sentenceIndex?: number;
}

const words = wordsData as WordTimestamp[];

/**
 * wordToFrame: Given a 0-indexed word number in words.json,
 * returns the exact starting video frame.
 */
export function wordToFrame(wordIndex: number): number {
  if (wordIndex < 0) return 0;
  if (wordIndex >= words.length) {
    return words[words.length - 1].endFrame;
  }
  return words[wordIndex].startFrame;
}

/**
 * isSpeechActiveAtFrame: Determines if any speech is occurring
 * around the given frame (with attack & release padding for smooth ducking).
 */
export function isSpeechActiveAtFrame(
  frame: number,
  attackFrames = 6,
  releaseFrames = 10
): boolean {
  for (const w of words) {
    if (frame >= w.startFrame - attackFrames && frame <= w.endFrame + releaseFrames) {
      return true;
    }
  }
  return false;
}
