// src/design/easing.ts
import { interpolate, Easing } from "remotion";

export const smoothFade = (
  frame: number,
  start: number,
  duration: number,
  from = 0,
  to = 1
) => {
  return interpolate(frame, [start, start + duration], [from, to], {
    easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

export const smoothMove = (
  frame: number,
  start: number,
  duration: number,
  from: number,
  to: number
) => {
  return interpolate(frame, [start, start + duration], [from, to], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};
