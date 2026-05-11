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
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const content = await response.text();

    // Check if content is actually a 404 page
    if (content.includes("404") && content.length < 1000) {
      throw new Error("File not found (404)");
    }

    await Bun.write(dest, content);
    console.log(`✅ Saved: ${dest}`);
  } catch (err) {
    console.error(`❌ Failed to download from ${url}`);
    console.error(`   Error: ${err instanceof Error ? err.message : err}`);
    process.exit(1);
  }
};

// === Main ===

// Updated to use 'main' branch - change this if your default branch is different
const repoBaseURL =
  "https://raw.githubusercontent.com/AltruisticCraftLab/starter-snippets/main/logo";

const file = "logo.tsx";

const tsxUrl = `${repoBaseURL}/${file}`;

const outputArg = process.argv
  .find((a) => a.startsWith("--output="))
  ?.split("=")[1];
const targetDir = outputArg
  ? join(process.cwd(), outputArg)
  : join(process.cwd(), "src/components/shared");

ensureDir(targetDir);

const tsxTargetPath = join(targetDir, file);

console.log(`⬇️ Downloading React component...`);
await downloadFile(tsxUrl, tsxTargetPath);

console.log("🎉 Done! Files added successfully.");
