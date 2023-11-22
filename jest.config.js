module.exports = {
  verbose: true,
  collectCoverageFrom: [
    'packages/**/*.{ts,tsx}',
    '!packages/**/*.stories.tsx',
    '!packages/**/dist/**',
    '!packages/**/.storybook/**',
  ],
  testMatch: ['**/?(*.)+(test).[jt]s?(x)', '!**/*.vitest.test*'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)?$': '@swc-node/jest',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  setupFilesAfterEnv: ['./scripts/setup-test.ts'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  preset: 'jest-preset-stylelint',
}
