export type ProjectConfig = {
  name: string;
  language: "ts" | "js";
  db: "mongodb" | "mysql" | "sqlite" | "postgresql" | "none";
  install: boolean;
};
