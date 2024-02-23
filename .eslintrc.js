const EXCLUDE_NAMES_NAMING_CONVENTION_WORDS = [];
const EXCLUDE_NAMES_NAMING_CONVENTION_REGEXPS = [];

const excludeNamesNamingConventionWordsRegex =
  EXCLUDE_NAMES_NAMING_CONVENTION_WORDS.join('|');
const excludeNamesNamingConventionRegexpsRegex =
  EXCLUDE_NAMES_NAMING_CONVENTION_REGEXPS.join('|');

const underscoreAndExcludeNamingConventionWordsRegex = `^(_|${excludeNamesNamingConventionWordsRegex})`;

const finalExcludeRegex = `${excludeNamesNamingConventionRegexpsRegex}|${underscoreAndExcludeNamingConventionWordsRegex}`;

const initialRules = {
  'eslint-comments/require-description': [
    'warn',
    { ignore: ['eslint-enable'] },
  ], // we don't need to comment why we used "eslint-enable"
  'eslint-comments/disable-enable-pair': 'off',
  'prefer-arrow-callback': 'error',
  'arrow-parens': ['error', 'always'],
  'quote-props': ['error', 'consistent-as-needed'],
  quotes: ['error', 'single', { avoidEscape: true }],
  curly: ['error', 'all'],
  'no-plusplus': 'off', 
  'no-void': ['error', { allowAsStatement: true }], 
  'no-unused-expressions': ['error'],
  'no-empty-function': [
    'error',
    {
      allow: ['constructors'],
    },
  ],
  'no-param-reassign': 'error',
  'no-dupe-keys': 'error',
  'no-console': ['error', { allow: ['warn', 'error', 'debug'] }],
  'no-underscore-dangle': ['off'], 
  'no-magic-numbers': [
    'error',
    {
      ignore: [-1, 0, 1],
      ignoreArrayIndexes: true,
      ignoreDefaultValues: true,
      ignoreClassFieldInitialValues: true,
    },
  ],
  'no-new': 'off',
  'no-multiple-empty-lines': ['error', { max: 2, maxBOF: 0, maxEOF: 1 }],
  'prefer-destructuring': 'error',
  'default-case': 'off',
  'func-names': ['error', 'always', { generators: 'never' }],
  'typescript-sort-keys/interface': [
    'error',
    'asc',
    { caseSensitive: false, natural: false, requiredFirst: true },
  ],
};

const tsRules = {
  '@typescript-eslint/no-shadow': 'error', 
  '@typescript-eslint/no-unused-vars': [
    'error',
    { argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' },
  ], // Ignore variables with "_" prefix
  '@typescript-eslint/no-unused-expressions': ['error'],
  '@typescript-eslint/explicit-function-return-type': [
    'error',
    {
      allowExpressions: true,
      allowTypedFunctionExpressions: true,
      allowHigherOrderFunctions: true,
    },
  ],
  '@typescript-eslint/no-floating-promises': 'error',
  '@typescript-eslint/no-use-before-define': [
    'error',
    {
      variables: false,
    },
  ],
  '@typescript-eslint/lines-between-class-members': [
    'error',
    {
      enforce: [{ blankLine: 'never', prev: 'field', next: 'field' }],
    },
  ],
  '@typescript-eslint/no-inferrable-types': 'off', 
  'class-methods-use-this': 'off',
  'consistent-return': 'off',
  '@typescript-eslint/no-unsafe-assignment': 'error',
  '@typescript-eslint/no-unsafe-member-access': 'error',
  '@typescript-eslint/no-unsafe-return': 'error',
  '@typescript-eslint/no-misused-promises': [
    'error',
    {
      checksVoidReturn: false,
    },
  ],
};

const spellCheckerRule = {
  '@cspell/spellchecker': [
    'error',
    {
      checkComments: true,
    },
  ],
};

const importSortOrderRule = {
  'simple-import-sort/imports': ['error'],
};

const importRules = {
  'import/extensions': 'off', 
  'no-duplicate-imports': 'error', 
  'no-restricted-imports': [
    'error',
    {
      patterns: [
        {
          group: ['lodash', '!lodash/'], 
          message: "Please use 'lodash/*' instead.",
        },
        {
          group: ['./module'],
          message: 'Please import modules directly.',
        },
      ],
    },
  ],
  'import/no-cycle': ['error', { maxDepth: '∞' }],
  'import/prefer-default-export': 'off', 
  'import/no-extraneous-dependencies': [
    'error',
    {
      devDependencies: ['scripts/*.ts'],
    },
  ],
  ...importSortOrderRule,
};

const paddingsRule = {
  'padding-line-between-statements': [
    'error',
    {
      blankLine: 'always',
      prev: '*',
      next: [
        'return',
        'if',
        'export',
        'function',
        'while',
        'try',
        'throw',
        'class',
      ],
    },
    {
      blankLine: 'always',
      prev: ['if', 'function', 'while', 'export', 'throw', 'class'],
      next: '*',
    },
    { blankLine: 'any', prev: 'const', next: ['const', 'let'] },
    { blankLine: 'always', prev: 'const', next: '*' },
    { blankLine: 'any', prev: 'const', next: 'const' },
    {
      blankLine: 'always',
      prev: 'multiline-const',
      next: '*',
    },
    {
      blankLine: 'always',
      prev: '*',
      next: 'multiline-const',
    },
  ],
};

const namingConventionRule = {
  '@typescript-eslint/naming-convention': [
    'error',
    {
      selector: 'default',
      format: ['strictCamelCase'],
      filter: {
        match: false,
        regex: finalExcludeRegex,
      },
    },
    {
      selector: 'variable',
      modifiers: ['global'],
      types: ['number', 'string'],
      format: ['UPPER_CASE'],
      filter: {
        match: false,
        regex: finalExcludeRegex,
      },
    },
    {
      selector: 'variable',
      modifiers: ['destructured'],
      format: ['strictCamelCase', 'StrictPascalCase'],
      filter: {
        match: false,
        regex: finalExcludeRegex,
      },
    },
    {
      selector: 'variable',
      modifiers: ['exported'],
      format: ['strictCamelCase', 'StrictPascalCase', 'UPPER_CASE'],
      filter: {
        match: false,
        regex: finalExcludeRegex,
      },
    },
    {
      selector: 'variable',
      types: ['function'],
      format: ['strictCamelCase', 'StrictPascalCase'],
      filter: {
        match: false,
        regex: finalExcludeRegex,
      },
    },
    {
      selector: 'function',
      format: ['strictCamelCase', 'StrictPascalCase'],
      filter: {
        match: false,
        regex: finalExcludeRegex,
      },
    },
    {
      selector: 'property',
      format: ['strictCamelCase', 'StrictPascalCase'],
      filter: {
        match: false,
        regex: finalExcludeRegex,
      },
    },
    {
      selector: 'enum',
      format: ['StrictPascalCase'],
      filter: {
        match: false,
        regex: finalExcludeRegex,
      },
    },
    {
      selector: 'enumMember',
      format: ['UPPER_CASE'],
    },
    {
      selector: 'parameter',
      format: ['strictCamelCase'],
      leadingUnderscore: 'allow',
      filter: {
        match: false,
        regex: finalExcludeRegex,
      },
    },
    {
      selector: 'variable',
      types: ['boolean'],
      format: ['StrictPascalCase'],
      prefix: [
        'is',
        'are',
        'has',
        'show',
        'with',
        'use',
        'no',
        'newIs',
        'initialIs',
        'can',
        'should',
      ],
      filter: {
        match: false,
        regex: finalExcludeRegex,
      },
    },
    {
      selector: 'interface',
      format: ['StrictPascalCase'],
      filter: {
        match: false,
        regex: finalExcludeRegex,
      },
    },
    {
      selector: 'typeLike',
      format: ['StrictPascalCase'],
      filter: {
        match: false,
        regex: finalExcludeRegex,
      },
    },
  ],
};

const override = {
  tsFilesOnlyWithExports: {
    files: ['**/index.ts', '**/constants.ts'],
    rules: {
      'padding-line-between-statements': [
        'error',
        { blankLine: 'any', prev: 'export', next: 'export' },
      ],
    },
  },
  js: {
    files: ['**/*.js'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
  namingConventionExceptions: {
    files: ['src/config/*.ts'],
    rules: {
      '@typescript-eslint/naming-convention': 'off',
    },
  },
  env: {
    files: ['env.d.ts'],
    rules: {
      'typescript-sort-keys/interface': 'off',
      '@typescript-eslint/naming-convention': 'off',
    },
  },
  disableReturnType: {
    files: [
      'src/decorators/**/*.ts', // we don't need set return type for decorators
      'src/config/*.ts', // we don't need duplicate type
    ],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
};

/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb/base',
    'airbnb-typescript/base',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@cspell/recommended',
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
    sourceType: 'module',
    ecmaVersion: 2023,
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'eslint-plugin-import',
    'simple-import-sort',
    'typescript-sort-keys',
  ],
  ignorePatterns: ['.eslintrc.js', '.prettierrc.js'],
  rules: {
    ...initialRules,
    ...tsRules,
    ...spellCheckerRule,
    ...importRules,
    ...paddingsRule,
    ...namingConventionRule,
  },
  overrides: [
    override.tsFilesOnlyWithExports,
    override.js,
    override.namingConventionExceptions,
    override.env,
    override.disableReturnType,
  ],
};
