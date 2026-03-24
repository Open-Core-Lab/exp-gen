import * as p from "@clack/prompts";
import pc from "picocolors";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { ProjectConfig } from "./type/projectConfig.js";
import copyDir from "./copyDir.js";

async function scaffoldProject(config: ProjectConfig) {
  const cwd = process.cwd();

  // 📁 Resolve project directory
  const isCurrentDir = config.name === ".";
  const projectPath = isCurrentDir ? cwd : path.join(cwd, config.name);

  const projectName = isCurrentDir ? path.basename(cwd) : config.name;

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
    process.cwd(),
    "src/templates",
    config.language,
    config.db === "mongodb" ? "mongodb" : "none"
  );

  // console.log(templatePath)

  if (!fs.existsSync(templatePath)) {
    p.cancel(pc.red("Template not found. Something went wrong."));
    process.exit(1);
  }

  // 📂 Copy template files
  copyDir(templatePath, projectPath);

  // 📝 Update package.json
  const pkgPath = path.join(projectPath, "package.json");
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
    pkg.name = projectName;

    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  }

  // 📦 Install dependencies
  if (config.install) {
    console.log(pc.dim("\n📦 Installing dependencies..."));
    execSync("npm install", {
      cwd: projectPath,
      stdio: "inherit",
    });
  }

  console.log(pc.green("\n✔ Project scaffolded successfully!\n"));
}

export default scaffoldProject;
