import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["node_modules/**", "commitlint.config.ts", "src/templates/ts/**"],
  },
  {
    files: [
      "src/templates/js/**/*.js",
      "src/templates/js/**/*.mjs",
      "src/templates/js/**/*.cjs",
    ],
    ignores: ["*.config.js", "*.config.mjs", "eslint.config.mjs"],
    languageOptions: {
      parser: "@babel/eslint-parser",
      globals: { ...globals.node, ...globals.browser },
    },
    plugins: { js },
    extends: ["js/recommended"],
    rules: {
      "no-undef": "error",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },

  {
    files: ["**/*.{ts,mts,cts}"],
    ignores: ["*.config.ts", "*.config.mts", "eslint.config.mts"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      parserOptions: {
        project: true,
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "no-undef": "off",
    },
  },
  tseslint.configs.recommended,
]);
