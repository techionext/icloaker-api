module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:prettier/recommended', 'prettier', 'eslint:recommended'],
  plugins: ['@typescript-eslint', 'eslint-plugin-import-helpers'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: 'tsconfig.json',
  },
  env: {
    es6: true,
    node: true,
  },
  rules: {
    'no-var': 'error',
    semi: 'error',
    indent: ['error', 2, { SwitchCase: 1 }],
    'no-multi-spaces': 'error',
    'space-in-parens': 'error',
    'no-multiple-empty-lines': 'error',
    'prefer-const': 'error',
    camelcase: 'off',
    'no-shadow': 'off',
    'no-empty-function': 'off',
    'lines-between-class-members': 'off',
    'no-useless-constructor': 'off',
    'no-await-in-loop': 'off',
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true,
        },
      },
    ],
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: ['/^express/', 'module', '/^@shared/', ['parent', 'sibling', 'index']],
        alphabetize: {
          order: 'asc',
          ignoreCase: true,
        },
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
