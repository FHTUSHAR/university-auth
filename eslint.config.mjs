import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  {
    ignores: [
      "node_modules/",
      "dist/",
      "build/",
      // Add other patterns from your .eslintignore file here
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,
    },
    plugins: {
      "@typescript-eslint": tseslint,
      prettier: prettierPlugin,
    },
    extends: [
      pluginJs.configs.recommended,
      tseslint.configs.recommended,
      prettierConfig, // Disables conflicting ESLint rules
    ],
    rules: {
      "prettier/prettier": "error", // Runs Prettier as an ESLint rule
      // Add any custom ESLint or Prettier rules here
    },
  },
];
