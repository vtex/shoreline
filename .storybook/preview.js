import { defaultTheme, themes } from '../packages/shoreline/src/themes/themes'
import { applyTheme, themeDecorator } from './themeDecorator'

export const parameters = {
  controls: { expanded: true },
  layout: 'fullscreen',
}

export const globalTypes = {
  theme: {
    description: 'Shoreline theme applied to the preview',
    toolbar: {
      title: 'Theme',
      icon: 'paintbrush',
      items: themes.map((theme) => ({ value: theme, title: theme })),
      dynamicTitle: true,
    },
  },
}

export const initialGlobals = {
  theme: defaultTheme,
}

export const decorators = [themeDecorator]

// Style the first paint with the default theme; the decorator follows the
// toolbar selection from then on.
applyTheme(defaultTheme)
