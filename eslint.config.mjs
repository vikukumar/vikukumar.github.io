import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    name: "app",
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      "@next/next": nextPlugin
    },
    rules: {
      ...(nextPlugin.configs?.["core-web-vitals"]?.rules ?? {})
    }
  },
  {
    ignores: [".next/**", "out/**", "node_modules/**"]
  }
];
