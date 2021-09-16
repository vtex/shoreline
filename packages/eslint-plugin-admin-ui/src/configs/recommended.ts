import type { Linter } from 'eslint'

export const recommended: Linter.BaseConfig = {
  plugins: ['@vtex/admin-ui'],
  rules: {
    '@vtex/admin-ui/create-tag-component-outside-render-phase': 'error',
    '@vtex/admin-ui/prefer-flex': 'error',
    '@vtex/admin-ui/prefer-grid': 'error',
  },
}
