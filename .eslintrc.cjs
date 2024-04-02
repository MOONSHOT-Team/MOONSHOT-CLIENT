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
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['.eslintrc.cjs', 'vite.config.ts'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      tsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'simple-import-sort',
    'import',
    'react-hooks',
    '@emotion',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    overrides: [
      // override "simple-import-sort" config
      {
        files: ['*.ts', '*.tsx'],
        rules: {
          'simple-import-sort/imports': [
            'error',
            {
              groups: [
                // Packages `react` related packages come first.
                ['^react', '^@?\\w'],
                // Internal packages.
                ['^(@|components)(/.*|$)'],
                // Side effect imports.
                ['^\\u0000'],
                // Parent imports. Put `..` last.
                ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                // Other relative imports. Put same-folder imports and `.` last.
                ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                // Style imports.
                ['^.+\\.?(css)$'],
              ],
            },
          ],
        },
      },
    ],
  },
};
