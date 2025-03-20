#!/usr/bin/env bun

import { $ } from "bun";
import { mkdirSync, existsSync } from "fs";
import { join } from "path";

// === Utilities ===
const ensureDir = (dir: string) => {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
};

const downloadFile = async (url: string, dest: string) => {
  try {
    await $`curl -sSL ${url} -o ${dest}`;
    console.log(`✅ Saved: ${dest}`);
  } catch (err) {
    console.error(`❌ Failed to download from ${url}`);
    process.exit(1);
  }
};

// === Main ===
const moduleName = process.argv[2];

if (!moduleName) {
  console.log("❗ Usage: mycli <module-name>");
  process.exit(1);
}

console.log(`🚀 Fetching files for module: ${moduleName}`);

const repoBaseURL =
  "https://raw.githubusercontent.com/AltruisticCraftLab/my-reusable-snippets/main/nozips";

const svgUrl = `${repoBaseURL}/${moduleName}.svg`;
const tsxUrl = `${repoBaseURL}/${moduleName}.tsx`;

const targetDir1 = join(process.cwd(), "public");
const targetDir2 = join(process.cwd(), "src/components");

ensureDir(targetDir1);
ensureDir(targetDir2);

const svgTargetPath = join(targetDir1, `${moduleName}.svg`);
const tsxTargetPath = join(targetDir2, `${moduleName}.tsx`);

console.log(`⬇️ Downloading SVG...`);
await downloadFile(svgUrl, svgTargetPath);

console.log(`⬇️ Downloading React component...`);
await downloadFile(tsxUrl, tsxTargetPath);

console.log("🎉 Done! Files added successfully.");
