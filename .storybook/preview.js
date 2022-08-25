import { themeDecorator } from './themeDecorator'

export const parameters = {
  controls: { expanded: true },
  chromatic: { disableSnapshot: true },
  layout: 'fullscreen',
}

export const decorators = [themeDecorator]
