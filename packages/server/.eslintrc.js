module.exports = {
  ignorePatterns: ["**/dist"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parserOptions: {
    sourceType: "module",
  },
  rules: {
    "@typescript-eslint/no-var-requires": "off",
  },
};