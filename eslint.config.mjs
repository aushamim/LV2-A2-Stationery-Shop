import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-config-prettier";
import stylisticJs from "@stylistic/eslint-plugin-js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.node } },
  { ignores: [".node_modules/*", "dist"] },
  { plugins: { "@stylistic/js": stylisticJs } },
  {
    rules: {
      "no-undef"                 : "error",
      "prefer-const"             : "error",
      "no-console"               : "warn",
      "@stylistic/js/key-spacing": ["error", { align: "colon" }],
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettier,
];
