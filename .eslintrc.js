module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
	},
	extends: 'standard-with-typescript',
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		allowImportExportEverywhere: true,
	},
	rules: {
		semi: 0,
		indent: [2, 'tab'],
		'no-tabs': 0,
		'no-unused-vars': 0,
		'space-before-function-paren': [
			'error',
			{
				anonymous: 'always',
				named: 'never',
				asyncArrow: 'always',
			},
		],
	},
};
