module.exports = {
	ignorePatterns: ["**/public", "**/__mocks"],
	env: {
		browser: true,
		node: true,
		es6: true,
		jest: true,
	},
	extends: ["eslint:recommended", "plugin:react/recommended"],
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly",
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: "module",
	},
	plugins: ["react"],
	overrides: [
		{
			files: ["**/*.ts?(x)"],
			parser: "@typescript-eslint/parser",
			extends: [
				"plugin:@typescript-eslint/eslint-recommended",
				"plugin:@typescript-eslint/recommended",
			],
			rules: {
				"@typescript-eslint/ban-ts-comment": "off",
			},
			plugins: ["@typescript-eslint"],
		},
	],
	settings: {
		react: {
			version: "detect",
		},
	},
	rules: {
		"react/display-name": "off",
		"react/prop-types": "off",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/no-explicit-any": "off",
	},
};
