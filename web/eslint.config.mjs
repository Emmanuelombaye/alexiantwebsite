import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Ignore our diagnostic scripts
    "scripts/**",
  ]),
  {
    rules: {
      // Allow standard <img> tags — we use them in many places intentionally.
      // Next.js Image is preferred but not required to build.
      "@next/next/no-img-element": "off",
    },
  },
]);

export default eslintConfig;
