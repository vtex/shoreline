import type { ReactElement } from 'react'
import type { RenderOptions } from '@testing-library/react'
import { render as baseRender } from '@testing-library/react'
import { ThemeProvider } from '@vtex/admin-core'
import '@testing-library/jest-dom/extend-expect'
import serializer, { matchers } from 'jest-emotion'
import { toHaveNoViolations } from 'jest-axe'

function render(ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) {
  return baseRender(ui, { wrapper: ThemeProvider, ...options })
}

export * from '@testing-library/react'
export { render }

expect.addSnapshotSerializer(serializer)
expect.extend(matchers)
expect.extend(toHaveNoViolations)
