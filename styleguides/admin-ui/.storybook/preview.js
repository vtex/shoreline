import { themeDecorator } from './themeDecorator'
import { withPlayroom } from 'storybook-addon-playroom'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  playroom: {
    url:
      process.env.NODE_ENV === 'production'
        ? '/playroom/'
        : 'http://localhost:9000',
  },
}

export const decorators = [withPlayroom, themeDecorator]
