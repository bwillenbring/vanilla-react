const typescriptEslintParser = require("@typescript-eslint/parser");
const typescriptEslintPlugin = require("@typescript-eslint/eslint-plugin");
const reactPlugin = require("eslint-plugin-react");
const reactHooksPlugin = require("eslint-plugin-react-hooks");
const jsxA11yPlugin = require("eslint-plugin-jsx-a11y");
const sonarjs = require("eslint-plugin-sonarjs");

module.exports = [
  {
    ignores: ["node_modules/**", "build/**"],
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        // jsxPragma: null, // Set jsxPragma to null to support new JSX transform
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
      sonarjs: sonarjs,
    },
    rules: {
      ...typescriptEslintPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      ...sonarjs.configs.recommended.rules,
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off", // Disable the rule for React 17+ with the new JSX transform
      "react/no-deprecated": "off", // Explicitly disable the rule for deprecated React methods
      "sonarjs/no-duplicate-string": "off", // Disable the rule to avoid false positives
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
