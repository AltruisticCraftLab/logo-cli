#!/usr/bin/env bun
// @bun

// scripts/logo-cli.ts
var {$ } = globalThis.Bun;
import { mkdirSync, existsSync } from "fs";
import { join } from "path";
var ensureDir = (dir) => {
  if (!existsSync(dir))
    mkdirSync(dir, { recursive: true });
};
var downloadFile = async (url, dest) => {
  try {
    await $`curl -sSL ${url} -o ${dest}`;
    console.log(`\u2705 Saved: ${dest}`);
  } catch (err) {
    console.error(`\u274C Failed to download from ${url}`);
    process.exit(1);
  }
};
var moduleName = process.argv[2];
if (!moduleName) {
  console.log("\u2757 Usage: mycli <module-name>");
  process.exit(1);
}
console.log(`\uD83D\uDE80 Fetching files for module: ${moduleName}`);
var repoBaseURL = "https://raw.githubusercontent.com/AltruisticCraftLab/my-reusable-snippets/main/nozips";
var svgUrl = `${repoBaseURL}/${moduleName}.svg`;
var tsxUrl = `${repoBaseURL}/${moduleName}.tsx`;
var targetDir1 = join(process.cwd(), "public");
var targetDir2 = join(process.cwd(), "src/components");
ensureDir(targetDir1);
ensureDir(targetDir2);
var svgTargetPath = join(targetDir1, `${moduleName}.svg`);
var tsxTargetPath = join(targetDir2, `${moduleName}.tsx`);
console.log(`\u2B07\uFE0F Downloading SVG...`);
await downloadFile(svgUrl, svgTargetPath);
console.log(`\u2B07\uFE0F Downloading React component...`);
await downloadFile(tsxUrl, tsxTargetPath);
console.log("\uD83C\uDF89 Done! Files added successfully.");
