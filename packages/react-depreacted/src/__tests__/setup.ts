import { ReactElement } from 'react'
import { render as baseRender, RenderOptions } from '@testing-library/react'
import { createOnda, createPlugin } from '@vtex/onda-core'
import '@testing-library/jest-dom/extend-expect'
import serializer, { matchers } from 'jest-emotion'
import { toHaveNoViolations } from 'jest-axe'

const [ThemeProvider] = createOnda({
  name: 'styleguide-test',
  description: 'styleguide-test description',
  plugins: [
    createPlugin({
      name: 'onda-plugin-colors',
      namespaces: ['colors'],
      rules: {
        color: 'colors',
        backgroundColor: 'colors',
        borderColor: 'colors',
      },
      aliases: {
        c: 'color',
        bg: 'backgroundColor',
        bc: 'borderColor',
      },
    }),
  ],
  theme: {
    colors: {
      primary: 'blue',
      secondary: 'green',
    },
  },
  options: {
    disableCSSVariables: true,
  },
})

function render(ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) {
  return baseRender(ui, { wrapper: ThemeProvider, ...options })
}

export * from '@testing-library/react'
export { render }

expect.addSnapshotSerializer(serializer)
expect.extend(matchers)
expect.extend(toHaveNoViolations)
