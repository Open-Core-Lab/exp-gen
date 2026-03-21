import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: [
      "src/templates/js/**/*.js",
      "src/templates/js/**/*.mjs",
      "src/templates/js/**/*.cjs",
    ],
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
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
]);
