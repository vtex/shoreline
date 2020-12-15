module.exports = {
  verbose: true,
  setupFilesAfterEnv: ['./setupTests.ts'],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.stories.tsx',
    '!**/dist/**',
    '!**/.storybook/**',
  ],
}
