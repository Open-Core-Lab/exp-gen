import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function copyAssets() {
  try {
    // Define Paths
    // __dirname is in /scripts, so we go up one level to reach project root
    const rootDir = path.resolve(__dirname, "..");
    const distDir = path.resolve(rootDir, "dist");

    // Copy Templates folder
    const srcTemplates = path.resolve(rootDir, "src/templates");
    const destTemplates = path.resolve(distDir, "src/templates");
    await fs.copy(srcTemplates, destTemplates);
    console.log("✅ Templates copied to dist/src/templates");

    // List of root files to copy
    const filesToCopy = [".gitignore", "LICENSE", "README.md", "package.json"];

    for (const file of filesToCopy) {
      const srcFile = path.resolve(rootDir, file);
      const destFile = path.resolve(distDir, file);

      // Check if file exists before copying to avoid errors
      if (await fs.pathExists(srcFile)) {
        await fs.copy(srcFile, destFile);
        console.log(`✅ ${file} copied to dist/`);
      } else {
        console.warn(`⚠️ Warning: ${file} not found in root, skipping.`);
      }
    }

    console.log("\n✨ Build assets finalized!");
  } catch (err) {
    console.error("❌ Error copying assets:", err);
    process.exit(1);
  }
}

copyAssets();
