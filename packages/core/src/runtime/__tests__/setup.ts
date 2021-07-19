import '@testing-library/jest-dom/extend-expect'
import { matchers } from 'jest-emotion'

expect.extend(matchers)

import { buildRuntime, buildPlugins } from '@vtex/onda-system'
import { plugins } from '../../plugins'
import { runtime } from '../runtime'

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
}

const steps = buildPlugins(theme, plugins)
const {
  parse: { exec: parse },
  compile: { exec: compile },
} = buildRuntime({ id: 'test' }, steps, runtime)

export { parse, compile }
