// eslint.config.js
import js from "@eslint/js";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    ignores: ["node_modules/", "dist/", "build/"],
  },
  js.configs.recommended,
  prettierConfig,
  {
    plugins: {
      prettier,
    },
    rules: {
      "prettier/prettier": "error",
      "no-console": "off",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      eqeqeq: ["error", "always"],
      curly: "error",
      strict: ["error", "global"],
      "no-var": "error",
      "prefer-const": "error",
    },
  },
];
