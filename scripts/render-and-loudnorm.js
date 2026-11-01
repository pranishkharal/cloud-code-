const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const PROJECT_DIR = path.resolve(__dirname, "..");
const RAW_OUTPUT = path.join(PROJECT_DIR, "out", "raw_render.mp4");
const NORMALIZED_OUTPUT = path.join(PROJECT_DIR, "out", "final_broadcast_loudnorm.mp4");

console.log("=================================================");
console.log("1. Rendering Remotion composition...");
console.log("=================================================");
execSync(
  `npx remotion render src/index.jsx DocumentaryTemplate out/raw_render.mp4 --concurrency=8`,
  { cwd: PROJECT_DIR, stdio: "inherit" }
);

console.log("\n=================================================");
console.log("2. Running EBU R128 / YouTube Loudnorm Audio Normalization...");
console.log("   Target: Integrated -14 LUFS, True Peak -1.0 dBTP, LRA 7 LU");
console.log("=================================================");

// FFmpeg two-pass or single pass EBU R128 loudnorm filter
// target I=-14 (YouTube standard), TP=-1.0, LRA=7
const ffmpegCmd = `ffmpeg -y -i "${RAW_OUTPUT}" -af loudnorm=I=-14:TP=-1.0:LRA=7 -c:v copy -c:a aac -b:a 192k "${NORMALIZED_OUTPUT}"`;

execSync(ffmpegCmd, { stdio: "inherit" });

console.log("\n=================================================");
console.log(`✅ COMPLETE! Broadcast Normalized Video:`);
console.log(`   ${NORMALIZED_OUTPUT}`);
console.log("=================================================");
