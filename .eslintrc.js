module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:@wordpress/eslint-plugin/recommended',
		'plugin:react/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 13,
		sourceType: 'module',
	},
	plugins: ['react', 'import'],
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.d.ts', '.ts', '.tsx'],
				moduleDirectory: ['node_modules', 'src'],
			},
		},
	},

	rules: {
		'no-useless-constructor': 'off',
		'@typescript-eslint/no-useless-constructor': ['error'],
		'no-shadow': 'off',
		'@typescript-eslint/no-shadow': 'error',
		'jsx-a11y/label-has-associated-control': [
			'error',
			{
				required: {
					some: ['nesting', 'id'],
				},
			},
		],
		'jsx-a11y/label-has-for': [
			'error',
			{
				required: {
					some: ['nesting', 'id'],
				},
			},
		],
	},
	globals: {
		JSX: true,
	},
};
