import React from "react";
import { AbsoluteFill, Audio, Series, staticFile } from "remotion";
import scriptData from "../script.json";
import wordsData from "./data/words.json";
import { UnderwaterBackground } from "./UnderwaterBackground";
import { HookScene } from "./scenes/HookScene";
import { CreatureIntroScene } from "./scenes/CreatureIntroScene";
import { SizeCompareScene } from "./scenes/SizeCompareScene";
import { VerdictScene } from "./scenes/VerdictScene";
import { KineticCaption, WordItem } from "./components/overlays/KineticCaption";
import { MusicBed } from "./components/audio/MusicBed";
import { SfxLayer, SfxCue } from "./components/audio/SfxLayer";
import { AmbienceLoop } from "./components/audio/AmbienceLoop";
import { wordToFrame } from "./utils/audioSync";

export const DocumentaryMaster = () => {
  const { meta, scenes } = scriptData;

  const sceneComponentMap = {
    HookScene,
    CreatureIntroScene,
    SizeCompareScene,
    VerdictScene,
  };

  // Collect all events with SFX across all scenes and convert atWord to frame
  const allSfxCues: SfxCue[] = React.useMemo(() => {
    const cues: SfxCue[] = [];
    scenes.forEach((sc, sIdx) => {
      if (sc.events && Array.isArray(sc.events)) {
        sc.events.forEach((ev: any, eIdx: number) => {
          if (ev.sfx) {
            const targetFrame =
              ev.atWord !== undefined ? wordToFrame(ev.atWord) : 0;
            cues.push({
              id: `sfx-${sIdx}-${eIdx}-${targetFrame}`,
              frame: targetFrame,
              sfx: ev.sfx,
              volume: ev.volume !== undefined ? ev.volume : 0.8,
              durationInFrames: 60,
            });
          }
        });
      }
    });
    return cues;
  }, [scenes]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#020813" }}>
      {/* 1. Dynamic Ocean Environment Layer */}
      <UnderwaterBackground />

      {/* 2. Audio: Ambience Loop (Step 4 - Low volume rumble) */}
      <AmbienceLoop src={meta.ambience || "audio/ambience/ocean-abyss.mp3"} volume={0.12} />

      {/* 3. Audio: Music Bed with Dynamic Ducking (Step 2 - from words.json) */}
      <MusicBed
        src={meta.music || "audio/music/drone-pad.mp3"}
        baseVolume={0.28}
        duckedVolume={0.07}
        attackFrames={8}
        releaseFrames={14}
      />

      {/* 4. Audio: Primary Voiceover Track */}
      {meta.voiceover && (
        <Audio src={staticFile(meta.voiceover)} volume={1.0} />
      )}

      {/* 5. Audio: SfxLayer (Step 3 - Cues triggered by atWord converted to frame) */}
      <SfxLayer cues={allSfxCues} />

      {/* 6. Sequential Visual Scenes */}
      <Series>
        {scenes.map((scene, idx) => {
          const SceneComponent = sceneComponentMap[scene.type];
          if (!SceneComponent) return null;

          return (
            <Series.Sequence
              key={scene.id || idx}
              durationInFrames={scene.durationInFrames}
            >
              <SceneComponent
                sceneData={scene}
                sceneIndex={idx}
                totalScenes={scenes.length}
              />
            </Series.Sequence>
          );
        })}
      </Series>

      {/* 7. Kinetic Captions at Composition Root */}
      <KineticCaption words={wordsData as WordItem[]} />
    </AbsoluteFill>
  );
};
