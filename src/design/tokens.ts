// src/design/tokens.ts
// Official Design System extracted from Depth Theory documentary frames

export const colors = {
  // Water gradients
  waterDeep: "#06182B",
  waterMid: "#0E4A5C",
  waterLight: "#3F8FA0",

  // Highlight / Accents
  accentGold: "#F2A93B",
  alertRed: "#E5554F",
  successGreenTeal: "#3CB8A8",
  landTan: "#C9A96A",

  // Map & UI panels
  mapPanel: "#14566E",
  mapGlow: "#5BC8E0",

  // Typography
  textWhite: "#FFFFFF",
  textMuted: "#9FB6C3",
  textDark: "#0A1D2E",
  borderSubtle: "rgba(91, 200, 224, 0.25)",
};

export const fonts = {
  primary: "'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  mono: "'Courier New', Courier, monospace",
};

export const timings = {
  crossfade: 15,       // 12-20 frame crossfade between scenes
  overlayFade: 12,     // 10-15 frames for overlays
  pathDraw: 16,        // 12-20 frames for underlines & circles
  eraCardHold: 50,     // 45-60 frames
  stampDrop: 12,       // Bouncy spring
};

/**
 * Global audio lead/lag offset for captions in milliseconds.
 * Positive = captions appear earlier than audio (anticipation).
 * Negative = captions appear later than audio.
 * Default recommended: 100ms lead (3 frames at 30fps).
 */
export const CAPTION_LEAD_MS = 100;
