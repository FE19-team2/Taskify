import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

import unicorn from 'eslint-plugin-unicorn';
import prettier from 'eslint-plugin-prettier';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      unicorn,
      prettier,
    },
    rules: {
      'id-length': ['error', { min: 2, exceptions: ['i', 'j', '_'] }],
      'id-match': [
        'error',
        '^[A-Za-z_][A-Za-z0-9_]*$',
        {
          properties: false,
          onlyDeclarations: true,
        },
      ],
      camelcase: [
        'error',
        {
          properties: 'never',
          ignoreImports: true,
        },
      ],
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['app/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}'],
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            pascalCase: true,
          },
        },
      ],
    },
  },
  {
    files: ['lib/**/*.{js,jsx,ts,tsx}', 'utils/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            kebabCase: true,
          },
        },
      ],
    },
  },
  {
    files: [
      'app/**/layout.tsx',
      'app/**/page.tsx',
      'app/**/loading.tsx',
      'app/**/error.tsx',
      'app/**/not-found.tsx',
      'app/**/route.ts',
    ],
    rules: {
      'unicorn/filename-case': 'off',
    },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
