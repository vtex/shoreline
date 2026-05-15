/**
 * ESLint config for `@vtex/shoreline-ai`.
 *
 * The rest of the Shoreline monorepo uses Biome (see root `biome.json`).
 * This package adds ESLint locally to enforce three architectural rules
 * that Biome does not (yet) express:
 *
 *   (a) FR-020 / FR-063 — no `@assistant-ui/*` or `@vtex/agentic-ui` in any
 *       file that re-exports to the public barrel.
 *       Exception: `src/runtime/adapter-bridge.ts` is the documented bridge.
 *
 *   (b) Constitution Principle I / FR-064 — sibling components MUST go through
 *       the package barrel. No deep imports across component directories.
 *
 *   (c) Vercel `rerender-no-inline-components` (data-model §10.6) — components
 *       passed to `makeAIToolUI({ render })`, `makeAIToolUI({ Trigger })`, and
 *       `<AIMessageToolCall fallback>` MUST be module-level identifiers.
 *
 * Spec ref: tasks.md T006, plan.md "Constitution Check" → Architectural Boundaries.
 */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  plugins: ['@typescript-eslint', 'react'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  settings: {
    react: { version: '18.3' },
  },
  rules: {
    'react/no-unstable-nested-components': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
  overrides: [
    {
      // (a) Public surface: forbid @assistant-ui/* and @vtex/agentic-ui.
      files: ['src/**/*.{ts,tsx}'],
      excludedFiles: [
        'src/runtime/adapter-bridge.ts',
        'src/runtime/adapter-bridge.test.ts',
        'src/runtime/adapter-bridge.*.test.ts',
        '**/*.test.{ts,tsx}',
        '**/*.stories.{ts,tsx}',
      ],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              {
                group: ['@assistant-ui/*'],
                message:
                  'Forbidden in the public surface (FR-020 / FR-063). Only `src/runtime/adapter-bridge.ts` may import from `@assistant-ui/*`.',
              },
              {
                group: ['@vtex/agentic-ui', '@vtex/agentic-ui/*'],
                message:
                  'Circular dependency forbidden (FR-063). `@vtex/shoreline-ai` is the upstream package; `@vtex/agentic-ui` re-exports from it, never the other way around.',
              },
            ],
          },
        ],
      },
    },
    {
      // (b) Sibling components MUST go through the package barrel.
      // Block any path matching `**/components/<other>/!(index)*` or `../<other>/!(index)*`.
      files: ['src/components/*/**/*.{ts,tsx}'],
      excludedFiles: ['src/components/*/index.ts'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              {
                group: [
                  '../*/!(index)',
                  '../*/!(index)/**',
                  '../*/!(index).*',
                  '**/components/*/!(index)',
                  '**/components/*/!(index).*',
                  '**/components/*/!(index)/**',
                ],
                message:
                  'Constitution Principle I / FR-064 — sibling components MUST be imported via their barrel. Use `from "../<sibling>"` (resolves to that sibling\'s `index.ts`), not a deep path inside the sibling.',
              },
            ],
          },
        ],
      },
    },
    {
      // Tests and stories may import freely (including @assistant-ui/* for round-trip checks).
      files: [
        '**/*.test.{ts,tsx}',
        '**/*.test-d.ts',
        '**/*.stories.{ts,tsx}',
        '**/*.show.stories.{ts,tsx}',
        '**/*.play.stories.{ts,tsx}',
        'tests/**/*.{ts,tsx}',
      ],
      rules: {
        'no-restricted-imports': 'off',
      },
    },
  ],
}
