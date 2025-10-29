#!/usr/bin/env bun
// @bun

// scripts/logo-cli.ts
import { mkdirSync, existsSync } from "fs";
import { join } from "path";
var ensureDir = (dir) => {
  if (!existsSync(dir))
    mkdirSync(dir, { recursive: true });
};
var downloadFile = async (url, dest) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const content = await response.text();
    if (content.includes("404") && content.length < 1000) {
      throw new Error("File not found (404)");
    }
    await Bun.write(dest, content);
    console.log(`\u2705 Saved: ${dest}`);
  } catch (err) {
    console.error(`\u274C Failed to download from ${url}`);
    console.error(`   Error: ${err instanceof Error ? err.message : err}`);
    process.exit(1);
  }
};
var repoBaseURL = "https://raw.githubusercontent.com/AltruisticCraftLab/starter-snippets/main/logo";
var file = "logo.tsx";
var tsxUrl = `${repoBaseURL}/${file}`;
var targetDir = join(process.cwd(), "src/components/shared");
ensureDir(targetDir);
var tsxTargetPath = join(targetDir, file);
console.log(`\u2B07\uFE0F Downloading React component...`);
await downloadFile(tsxUrl, tsxTargetPath);
console.log("\uD83C\uDF89 Done! Files added successfully.");
