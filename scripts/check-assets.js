const fs = require("fs");
const path = require("path");

const PROJECT_ROOT = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(PROJECT_ROOT, "public");
const SCRIPT_PATH = path.join(PROJECT_ROOT, "script.json");

console.log("==================================================");
console.log("🔍 Checking all required assets in public/ folder...");
console.log("==================================================");

let missingAssets = [];
let checkedAssets = new Set();

function checkFileExists(relPath, sourceDesc) {
  // Normalize path separators
  const cleanRel = relPath.replace(/^\//, "").replace(/\//g, path.sep);
  const fullPath = path.join(PUBLIC_DIR, cleanRel);

  checkedAssets.add(relPath);

  if (!fs.existsSync(fullPath)) {
    missingAssets.push({
      requiredPath: relPath,
      resolvedPath: fullPath,
      source: sourceDesc
    });
  }
}

// 1. Scan script.json (contains all images, audio, sfx, ambience)
if (fs.existsSync(SCRIPT_PATH)) {
  const scriptData = JSON.parse(fs.readFileSync(SCRIPT_PATH, "utf8"));

  // Check meta assets
  if (scriptData.meta) {
    if (scriptData.meta.voiceover) checkFileExists(scriptData.meta.voiceover, "script.json -> meta.voiceover");
    if (scriptData.meta.music) checkFileExists(scriptData.meta.music, "script.json -> meta.music");
    if (scriptData.meta.ambience) checkFileExists(scriptData.meta.ambience, "script.json -> meta.ambience");
  }

  // Check scene assets
  if (Array.isArray(scriptData.scenes)) {
    scriptData.scenes.forEach((sc, idx) => {
      if (sc.creature && sc.creature.image) {
        checkFileExists(sc.creature.image, `script.json -> scene[${idx}].creature.image`);
      }
      if (sc.leftCreature && sc.leftCreature.silhouette) {
        checkFileExists(sc.leftCreature.silhouette, `script.json -> scene[${idx}].leftCreature.silhouette`);
      }
      if (sc.rightCreature && sc.rightCreature.silhouette) {
        checkFileExists(sc.rightCreature.silhouette, `script.json -> scene[${idx}].rightCreature.silhouette`);
      }
      if (Array.isArray(sc.events)) {
        sc.events.forEach((ev) => {
          if (ev.sfx) checkFileExists(ev.sfx, `script.json -> scene[${idx}] event sfx`);
        });
      }
    });
  }
}

// 2. Scan src/ for staticFile() calls and font references
function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (/\.(jsx?|tsx?)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, "utf8");
      // Find staticFile("...") patterns
      const regex = /staticFile\(["'`]([^"'`]+)["'`]\)/g;
      let match;
      while ((match = regex.exec(content)) !== null) {
        const assetPath = match[1];
        // Skip dynamically evaluated paths or template literals with expressions
        if (!assetPath.includes("${")) {
          checkFileExists(assetPath, `src/${path.relative(path.join(PROJECT_ROOT, "src"), fullPath)}`);
        }
      }
    }
  }
}

scanDir(path.join(PROJECT_ROOT, "src"));

console.log(`✅ Checked ${checkedAssets.size} asset paths.`);

if (missingAssets.length > 0) {
  console.error("\n❌ FAILED! The following required assets are MISSING from public/:");
  missingAssets.forEach((item, i) => {
    console.error(`  ${i + 1}. [${item.requiredPath}]`);
    console.error(`     Referenced in: ${item.source}`);
    console.error(`     Looked for: ${item.resolvedPath}\n`);
  });
  process.exit(1);
} else {
  console.log("🎉 ALL ASSETS PRESENT AND VERIFIED!\n");
  process.exit(0);
}
