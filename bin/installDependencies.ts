import { spawn } from "child_process";
import * as p from "@clack/prompts";
import pc from "picocolors";
import { ProjectConfig } from "./type/projectConfig.js";

// Runs a command in the specified directory and shows progress
function runCommand(
  command: string,
  args: string[],
  cwd: string,
  spinnerText: string
) {
  return new Promise<void>((resolve, reject) => {
    const spinner = p.spinner();
    spinner.start(spinnerText);

    const child = spawn(command, args, { cwd, shell: true });

    child.on("exit", (code) => {
      if (code === 0) {
        spinner.stop(`${pc.green("✔")} ${spinnerText} completed.`);
        resolve();
      } else {
        spinner.stop(`${pc.red("✖")} ${spinnerText} failed.`);
        reject(new Error(`Command failed with code ${code}`));
      }
    });
  });
}


// install project dependencies
export async function installProjectDependencies(
  config: ProjectConfig,
  projectPath: string
) {
  if (!config.install) return;

  // Run the actual installation
  try {
    await runCommand(
      "npm",
      ["install"],
      projectPath,
      "📦 Installing dependencies from template..."
    );

    console.log(pc.green("\n✨ All dependencies installed successfully!"));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    p.log.error(
      pc.red(
        `Dependency installation failed. You may need to run 'npm install' manually. ${message}`
      )
    );
  }
}
