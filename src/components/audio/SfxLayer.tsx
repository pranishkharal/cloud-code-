import React from "react";
import { Audio, Sequence, staticFile } from "remotion";

export interface SfxCue {
  id?: string;
  frame: number;
  sfx: string; // e.g. "audio/sfx/stamp-hit.mp3"
  volume?: number;
  durationInFrames?: number;
}

interface SfxLayerProps {
  cues: SfxCue[];
}

export const SfxLayer: React.FC<SfxLayerProps> = ({ cues }) => {
  if (!cues || cues.length === 0) return null;

  return (
    <>
      {cues.map((cue, idx) => {
        const dur = cue.durationInFrames || 45; // default 1.5s window for SFX
        const vol = cue.volume !== undefined ? cue.volume : 0.85;

        return (
          <Sequence
            key={cue.id || `sfx-cue-${idx}-${cue.frame}`}
            from={cue.frame}
            durationInFrames={dur}
          >
            <Audio src={staticFile(cue.sfx)} volume={vol} />
          </Sequence>
        );
      })}
    </>
  );
};
