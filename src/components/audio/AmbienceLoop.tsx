import React from "react";
import { Audio, staticFile } from "remotion";

interface AmbienceLoopProps {
  src?: string;
  volume?: number;
}

export const AmbienceLoop: React.FC<AmbienceLoopProps> = ({
  src = "audio/ambience/ocean-abyss.mp3",
  volume = 0.12, // subtle background hum
}) => {
  return (
    <Audio
      src={staticFile(src)}
      volume={volume}
      loop
    />
  );
};
