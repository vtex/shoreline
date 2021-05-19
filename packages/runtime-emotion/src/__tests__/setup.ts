import '@testing-library/jest-dom/extend-expect'
import { matchers } from 'jest-emotion'

expect.extend(matchers)

import { buildRuntime, buildSteps } from '@vtex/onda-system'
import { standard } from '@vtex/onda-plugins'
import { runtime } from '../runtime'

const theme = {
  space: [0, 1, 2, 4, 8],
  text: {
    small: {
      fontSize: 1,
      fontFamily: 'sans-serif',
    },
  },
  colors: {
    primary: {
      default: 'blue',
      hover: 'red',
    },
  },
}

const steps = buildSteps(theme, standard)
const {
  parse: { exec: parse },
  compile: { exec: compile },
} = buildRuntime({ id: 'test' }, steps, runtime)

export { parse, compile }
