import path from "node:path";

import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import reactLint from "eslint-plugin-react/configs/recommended.js";
import globals from "globals";
import tseslint from "typescript-eslint";

const compat = new FlatCompat();
const __dirname = path.resolve();
const config = [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: { import: fixupPluginRules(importPlugin) },
    rules: {
      "import/no-cycle": "error",
      "import/first": "error",
      "import/no-useless-path-segments": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "warn",
    },
  },
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-imports": "error",
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": "error",
    },
  },
  {
    ignores: [
      "dist/**/*",
      ".yarn/**/*",
      ".next/**/*",
      "playwright-report/**/*",
      "coverage/**/*",
    ],
  },
  ...fixupConfigRules(
    ...compat.config({
      extends: ["plugin:react-hooks/recommended"],
      plugins: ["react-hooks"],
    }),
  ),
  ...fixupConfigRules({
    ...reactLint,
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/button-has-type": "warn",
      "react/jsx-max-depth": ["warn", { max: 3 }],
      "react/no-unstable-nested-components": "error",
      "react/no-unused-prop-types": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
  }),
];
export default config;
