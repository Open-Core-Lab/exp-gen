import * as p from "@clack/prompts";

import pc from "picocolors";

import logSymbols from "log-symbols";

import type { ProjectConfig } from "./type/projectConfig";

import scaffoldProject from "./scaffoldProject";

async function safePrompt<T>(value: Promise<T | symbol>): Promise<T> {
  const result = await value;

  if (p.isCancel(result)) {
    p.cancel(pc.red("Operation cancelled."));

    process.exit(0);
  }

  return result;
}

async function main() {
  console.clear();

  p.intro(
    `${pc.bgCyan(pc.black(" EXPRESS GENERATOR "))} ${pc.dim("v1.0.0")}\n${pc.dim(
      "Scaffold your Express API in seconds 🚀"
    )}`
  );

  const project = await p.group<ProjectConfig>(
    {
      name: () =>
        safePrompt(
          p.text({
            message: "Project name",

            placeholder: "my-express-api",

            validate: (value) => {
              if (!value) return "Project name is required";

              if (value.includes(" "))
                return "Spaces are not allowed in project names";
            },
          })
        ),

      language: () =>
        safePrompt(
          p.select({
            message: "Choose language",

            initialValue: "ts",

            options: [
              {
                value: "ts",

                label: pc.blue("TypeScript"),

                hint: pc.dim("Recommended"),
              },

              {
                value: "js",

                label: pc.yellow("JavaScript"),

                hint: pc.dim("Lightweight & fast setup"),
              },
            ],
          })
        ),

      db: () =>
        safePrompt(
          p.select({
            message: "Select database",

            options: [
              {
                value: "mongodb",

                label: pc.green("MongoDB"),

                hint: "via Mongoose (Available ✅)",
              },

              // 🚧 Coming Soon

              {
                value: "mysql",

                label: pc.yellow("MySQL"),

                hint: pc.dim("Coming soon"),
              },

              {
                value: "sqlite",

                label: pc.gray("SQLite"),

                hint: pc.dim("Coming soon"),
              },

              {
                value: "postgresql",

                label: pc.magenta("PostgreSQL"),

                hint: pc.dim("Coming soon (Prisma)"),
              },

              {
                value: "none",

                label: pc.dim("None"),

                hint: "Skip database setup",
              },
            ],
          })
        ),

      install: () =>
        safePrompt(
          p.confirm({
            message: `Install dependencies using ${pc.magenta("npm")}?`,

            initialValue: true,
          })
        ),
    },

    {
      onCancel: () => {
        p.cancel(pc.red("Setup cancelled."));

        process.exit(0);
      },
    }
  );

  // 🚫 Stop if user selected a "coming soon" DB

  const comingSoonDBs: ProjectConfig["db"][] = [
    "mysql",

    "sqlite",

    "postgresql",
  ];

  if (comingSoonDBs.includes(project.db)) {
    p.cancel(
      pc.yellow(
        `🚧 ${project.db.toUpperCase()} support is coming soon!\n\n` +
          pc.dim("Currently only MongoDB is supported.\n") +
          pc.dim("Stay tuned for future updates 🚀")
      )
    );

    process.exit(0);
  }

  const langLabel =
    project.language === "ts" ? pc.blue("TypeScript") : pc.yellow("JavaScript");

  const spinner = p.spinner();

  spinner.start("Creating your project...");

  await scaffoldProject(project);

  spinner.stop(
    `${logSymbols.success} Project ${pc.cyan(project.name)} created successfully!`
  );

  p.note(
    `${pc.bold("Project:")} ${pc.cyan(project.name)}

${pc.bold("Language:")} ${langLabel}

${pc.bold("Database:")} ${pc.green(project.db)}

${pc.bold("Install deps:")} ${project.install ? "Yes" : "No"}`,

    "Configuration Summary"
  );

  p.outro(`${pc.bold("Next steps")}

${pc.cyan(`cd ${project.name}`)}

${
  project.install
    ? pc.cyan("npm run dev")
    : pc.cyan("npm install && npm run dev")
}



${pc.green("Happy coding! 🚀")}`);
}

main().catch((err) => {
  p.cancel(pc.red(`Error: ${err.message}`));

  process.exit(1);
});
