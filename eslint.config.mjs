import nextConfig from 'eslint-config-next';

const eslintConfig = [
  {
    ignores: ['.next/**', 'out/**', 'node_modules/**', '.env*'],
  },
  // Spread the Next.js config array since it exports multiple config objects
  ...nextConfig,
  // Override with custom rules
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
];

export default eslintConfig;
