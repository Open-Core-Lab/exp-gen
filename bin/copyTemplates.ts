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
    const filesToCopy = [
      { src: ".gitignore", dest: ".gitignore" },
      { src: "LICENSE", dest: "LICENSE" },
      { src: "README.md", dest: "README.md" },
      { src: "package-config/package.json", dest: "package.json" },
    ];

    for (const file of filesToCopy) {
      const srcFile = path.resolve(rootDir, file.src);
      const destFile = path.resolve(distDir, file.dest);

      // Check if file exists before copying to avoid errors
      if (await fs.pathExists(srcFile)) {
        await fs.copy(srcFile, destFile);
        console.log(`✅ ${file.src} copied to dist/${file.dest}`);
      } else {
        console.warn(`⚠️ Warning: ${file.src} not found in root, skipping.`);
      }
    }

    console.log("\n✨ Build assets finalized!");
  } catch (err) {
    console.error("❌ Error copying assets:", err);
    process.exit(1);
  }
}

copyAssets();
