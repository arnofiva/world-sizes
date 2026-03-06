import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import headers from "eslint-plugin-headers";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "build", "coverage", "node_modules"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      prettier, // Disable formatting rules that conflict with Prettier
    ],
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: { version: "detect" },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "unused-imports": unusedImports,
      headers,
    },
    rules: {
      // Keep concise arrow functions: () => expr (no forced { ... })
      "arrow-body-style": ["error", "as-needed"],
      // Allow concise arrows even if the body is a void expression
      "@typescript-eslint/no-confusing-void-expression": ["off"],
      // --- React rules
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,

      // Unused imports
      "unused-imports/no-unused-imports": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      // License header
      "headers/header-format": [
        "error",
        {
          // Tell the plugin you’re providing a string-based template
          source: "string",

          // Provide the header as an array of lines (the plugin will add /** */)
          content: `Copyright 2026 Esri

Licensed under the Apache License Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.`,

          // Optional nicety
          trailingNewlines: 1,
        },
      ],

      // Inline functions: allow concise arrow bodies (no forced braces)
      "arrow-body-style": ["off"],
      "@typescript-eslint/arrow-body-style": ["off"],
      "arrow-body-style": ["off"],

      // Do not enforce interface over type
      "@typescript-eslint/consistent-type-definitions": ["off"],

      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowNumber: true,
        },
      ],

      // Require trailing commas (handled by Prettier, but ESLint should align)
      "comma-dangle": [
        "error",
        {
          arrays: "always-multiline",
          objects: "always-multiline",
          imports: "always-multiline",
          exports: "always-multiline",
          functions: "never",
        },
      ],

      // Prettier-like semicolon enforcement
      semi: ["error", "always"],
    },
  },
  // Parse but don't report errors for generated files
  {
    files: ["src/generated/**/*.{ts,tsx}"],
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
    },
  },
  // Ensure scripts/ gets parsed with TypeScript parser
  {
    files: ["scripts/**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
    },
  }
);
