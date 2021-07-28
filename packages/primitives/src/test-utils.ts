import type { RenderOptions } from '@testing-library/react'
import { render as baseRender } from '@testing-library/react'
import { ThemeProvider } from '@vtex/admin-core'
import type { ReactElement } from 'react'

function render(ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) {
  return baseRender(ui, { wrapper: ThemeProvider, ...options })
}

export * from '@testing-library/react'
export { render }
