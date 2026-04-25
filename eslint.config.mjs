import {defineConfig, globalIgnores} from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import i18next from "eslint-plugin-i18next";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "messages/**",
  ]),
  {
    files: ["src/**/*.{ts,tsx,js,jsx}"],
    plugins: {i18next},
    rules: {
      // Fail the build when a raw user-facing string lands in JSX.
      // The plugin already ignores short symbols/punctuation/numbers by default,
      // so emoji and `→`-style chars do not trip the rule.
      "i18next/no-literal-string": [
        "error",
        {
          mode: "jsx-text-only",
          "should-validate-template": false,
        },
      ],
    },
  },
  {
    // Translation files and the i18n config itself are exempt.
    files: ["src/i18n/**/*.{ts,tsx}", "messages/**/*.json"],
    rules: {
      "i18next/no-literal-string": "off",
    },
  },
]);

export default eslintConfig;
