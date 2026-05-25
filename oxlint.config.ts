import { defineConfig } from "oxlint";
import astro from "ultracite/oxlint/astro";
import core from "ultracite/oxlint/core";
import react from "ultracite/oxlint/react";

export default defineConfig({
  categories: {
    correctness: "error",
    nursery: "allow",
    pedantic: "off",
    perf: "warn",
    style: "allow",
    suspicious: "warn",
  },
  env: {
    astro: true,
    browser: true,
    es2022: true,
  },
  extends: [core, astro, react],
  ignorePatterns: ["dist/**", ".astro/**", "prisma/**", "migrations/**", "scripts/**"],

  overrides: [
    // en tests: any y console son aceptables
    {
      files: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "no-console": "off",
      },
    },
    // en .astro: hooks de React no aplican al frontmatter
    {
      env: { astro: true },
      files: ["**/*.astro"],
      rules: {
        "react-hooks/exhaustive-deps": "off",
        "react-hooks/rules-of-hooks": "off",
      },
    },
  ],
  plugins: ["jsx-a11y", "typescript", "react", "import"],
  rules: {
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": "error",
    eqeqeq: "error",
    "func-style": "off",
    "import/no-duplicates": "off",
    "no-console": "warn",
    "no-duplicate-imports": "off",
    "no-empty-object-type": "off",
    "no-unused-vars": "off",
    "no-var": "error",
    "prefer-const": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react/react-in-jsx-scope": "off",
    "react/self-closing-comp": "warn",
    "sort-keys": "warn",
    "unicorn/filename-case": [
      "warn",
      {
        cases: {
          camelCase: true,
          kebabCase: true,
        },
        ignore: ["README\\.md", "CHANGELOG\\.md", "\\[.*\\]\\..*"],
      },
    ],
  },
  settings: {
    "jsx-a11y": {
      components: {
        Button: "button",
        Image: "img",
        Link: "a",
      },
    },
  },
});
