import { themeDecorator } from './themeDecorator'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}

export const decorators = [themeDecorator]
