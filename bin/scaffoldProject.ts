import * as p from "@clack/prompts";
import pc from "picocolors";
import fs from "fs";
import path from "path";
import { ProjectConfig } from "./type/projectConfig.js";
import copyDir from "./copyDir.js";
import { installProjectDependencies } from "./installDependencies.js";
import { fileURLToPath } from "url";

// __dirname replacement for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function scaffoldProject(config: ProjectConfig) {
  const cwd = process.cwd();

  // 📁 Resolve project directory
  const isCurrentDir = config.name === ".";
  const projectPath = isCurrentDir ? cwd : path.join(cwd, config.name);

  // 📁 Check if directory exists
  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath, { recursive: true });
  } else {
    const files = fs.readdirSync(projectPath);

    if (files.length > 0 && !isCurrentDir) {
      p.cancel(
        pc.red(
          `Directory "${config.name}" is not empty. Please choose an empty folder.`
        )
      );
      process.exit(1);
    }

    if (files.length > 0 && isCurrentDir) {
      p.cancel(
        pc.red(
          `Current directory is not empty. Please run in an empty folder or use a new project name.`
        )
      );
      process.exit(1);
    }
  }

  console.log(pc.dim(`\n📁 Creating project in: ${projectPath}`));

  // 📦 Template path
  const templatePath = path.join(
    __dirname,
    "../src/templates",
    config.language,
    config.db
  );

  if (!fs.existsSync(templatePath)) {
    p.cancel(pc.red("Template not found. Something went wrong."));
    process.exit(1);
  }

  // 📂 Copy template files
  await copyDir(templatePath, projectPath, config);

  // Run the new dependency logic
  await installProjectDependencies(config, projectPath);

  console.log(pc.green("\n✔ Project scaffolded successfully!\n"));
}

export default scaffoldProject;
