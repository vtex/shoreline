import type { RenderOptions } from '@testing-library/react'
import { render as baseRender } from '@testing-library/react'
import { createOndaInstance } from '@vtex/onda-core'
import type { ReactElement } from 'react'

const ThemeProvider = createOndaInstance({
  name: 'test',
  options: {
    disableCSSVariables: true,
  },
})

function render(ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) {
  return baseRender(ui, { wrapper: ThemeProvider, ...options })
}

export * from '@testing-library/react'
export { render }
