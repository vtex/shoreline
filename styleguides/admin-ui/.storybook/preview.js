import { themeDecorator } from './themeDecorator'
import { withTests } from '@storybook/addon-jest'
import results from '../.jest-test-results'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}

export const decorators = [themeDecorator, withTests({ results })]
