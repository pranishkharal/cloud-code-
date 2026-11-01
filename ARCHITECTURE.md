# Project: Remotion 2D Documentary Engine (Depth Theory / Tusk and Talon style)
# Runtime: React 18.3.1 pinned, Remotion 4.0+
# Working Directory: D:\video-engine ONLY. Never work on C:.

Rules:
1. All animation uses useCurrentFrame / interpolate / spring. No CSS transitions, no setTimeout, no Math.random (use random(seed) from remotion).
2. All content comes from src/data/script.yaml (or JSON) and words.json. Never hardcode video text or timings in components.
3. All colors, fonts and timings come from src/design/tokens.ts.
4. Creatures are SVG with named groups (body, tail, fin-top, fin-side, jaw, eye).
5. Every component must accept typed props and work with any future script.
6. After each change, render a still frame with `npx remotion still` and verify visually.
7. Keep each file under 300 lines. One component per file.
8. Free and open-source packages only. No paid APIs.
9. Pin React to 18.3.1. Never run concurrent npm installs.
