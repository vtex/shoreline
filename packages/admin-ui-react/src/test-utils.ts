import type { ReactElement } from 'react'
import type { RenderOptions } from '@testing-library/react'
import { render as baseRender } from '@testing-library/react'
import { createSystem } from './system'

const [ThemeProvider] = createSystem()

function render(ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) {
  return baseRender(ui, { wrapper: ThemeProvider, ...options })
}

export { render }
