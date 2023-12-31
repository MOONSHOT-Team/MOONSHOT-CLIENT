module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'plugin:jsx-a11y/recommended',
		'plugin:prettier/recommended',
		'plugin:@typescript-eslint/parser',
	],
	ignorePatterns: ['.eslintrc.cjs', 'vite.config.ts', 'index.ts'],
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
				project: ['tsconfig.json'],
				createDefaultProgram: true,
			},
		},
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true, //일반 자바스크립트의 확장 문법도 린트하기 위해
			tsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: './tsconfig.json',
	},
	plugins: ['@typescript-eslint', 'react', 'import'],
	rules: {
		indent: ['off', 2, { SwitchCase: 1, css: [1, 6] }], // 들여쓰기 몇 칸? 기본 2칸으로 하되, switch문에서는 1칸으로 지정
		quotes: ['off', 'single'], // 쌍따옴표가 아닌 홑따옴표를 사용
		semi: ['error', 'always'], // semi colon을 강제함
		'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
		'no-multi-spaces': 'error', // 스페이스 여러개 금지
		'comma-dangle': ['error', 'always-multiline'], // 두 줄 이상의 경우에는 후행 쉼표를 항상 사용, 한 개 일 때는 사용하지 않음
		'object-curly-spacing': ['error', 'always'], // 객체 괄호 앞 뒤 공백 추가
		'space-in-parens': ['error', 'never'], // 일반 괄호 앞 뒤 공백 추가
		'computed-property-spacing': ['error', 'never'], // 대괄호 앞 뒤 공백 추가하지 않음
		'comma-spacing': ['error', { before: false, after: true }], // 반점 앞 뒤 공백: 앞에는 없고, 뒤에는 있게
		'eol-last': ['error', 'always'], // line의 가장 마지막 줄에는 개행 넣기
		'no-tabs': ['error', { allowIndentationTabs: true }], // \t의 사용을 금지하고 tab키의 사용은 허용
		'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
		'react-hooks/exhaustive-deps': 'off', // Checks effect dependencies
		'react/react-in-jsx-scope': 'off', // import React from "react"가 필수였던 시기에 필요한 규칙이므로 off
		'simple-import-sort/imports': 'error', //import 정렬 강제
		'simple-import-sort/exports': 'error', //export 정렬 강제},
	},
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx', '.js'],
		},
		'import/resolver': {
			node: {
				moduleDirectory: ['node_modules', 'src/'],
				extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
			},
			typescript: './tsconfig.json',
		},
	},
};
