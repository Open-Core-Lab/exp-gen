import fs from "fs-extra";
import path from "path";
import { ProjectConfig } from "./type/projectConfig.js";

async function copyDir(
  src: string,
  dest: string,
  config: ProjectConfig
): Promise<void> {
  if (!fs.existsSync(src)) {
    throw new Error(`Source path not found: ${src}`);
  }

  try {
    const stats = await fs.stat(src);
    if (!stats.isDirectory()) {
      throw new Error(`Source is not a directory: ${src}`);
    }

    // Ensure destination and Copy
    await fs.ensureDir(dest);
    await fs.copy(src, dest, {
      overwrite: true,
      errorOnExist: false,
    });

    // update the name in the copied package.json
    await updatePackageJson(dest, config.name);
  } catch (err) {
    throw new Error(`Failed to copy templates from ${src} to ${dest}`, {
      cause: err,
    });
  }
}

// Updates the template package.json with the user's project name
async function updatePackageJson(projectPath: string, projectName: string) {
  const pkgPath = path.join(projectPath, "package.json");

  if (await fs.pathExists(pkgPath)) {
    const pkg = await fs.readJson(pkgPath);

    pkg.name = projectName;

    await fs.writeJson(pkgPath, pkg, { spaces: 2 });
  }
}

export default copyDir;
