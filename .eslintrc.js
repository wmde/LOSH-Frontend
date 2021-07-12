module.exports = {
	env: {
		browser: true,
		node: true,
		es6: true,
		jest: true
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/eslint-recommended"
	],
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly"
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 2018,
		sourceType: "module"
	},
	plugins: ["plugin:react/recommended", "@typescript-eslint",],
	rules: {}
};
