import '@testing-library/jest-dom/extend-expect'
import { matchers } from 'jest-emotion'
import { buildPlugins } from '../../system'

import { plugins } from '../../plugins'
import { createClsx, createStyles } from '../../runtime'
import createEmotion from '@emotion/css/create-instance'

expect.extend(matchers)

const theme = {
  space: [0, 1, 2, 4, 8],
  fonts: {
    sans: 'sans-serif',
  },
  fontSizes: [12, 14, 16],
  text: {
    small: {
      fontSize: 1,
      fontFamily: 'sans',
    },
  },
  colors: {
    primary: {
      default: 'blue',
      hover: 'red',
    },
  },
  foreground: {
    primary: {
      default: 'blue',
      hover: 'red',
    },
  },
  background: {
    primary: {
      default: 'blue',
      hover: 'red',
    },
  },
}

const emotion = createEmotion({ key: 'test' })
const steps = buildPlugins(theme, plugins)
const clsx = createClsx(emotion)
const parse = createStyles(steps, theme)

export { clsx, parse }
