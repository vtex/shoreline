module.exports = {
  verbose: true,
  setupFilesAfterEnv: ['./setupTests.ts'],
  testEnvironment: 'jest-environment-jsdom-fourteen',
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.stories.tsx',
    '!**/dist/**',
    '!**/.storybook/**',
  ],
}
