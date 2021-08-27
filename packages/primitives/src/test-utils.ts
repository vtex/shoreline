import type { RenderOptions } from '@testing-library/react'
import { render as baseRender } from '@testing-library/react'
import { createSystem } from '@vtex/admin-ui-core'
import type { ReactElement } from 'react'

const [ThemeProvider] = createSystem({
  key: 'test',
})

function render(ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) {
  return baseRender(ui, { wrapper: ThemeProvider, ...options })
}

export * from '@testing-library/react'
export { render }
