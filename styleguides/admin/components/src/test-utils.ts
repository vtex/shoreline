import { render as baseRender, RenderOptions } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import serializer, { matchers } from 'jest-emotion'
import { axe, toHaveNoViolations } from 'jest-axe'
import { ThemeProvider } from '@vtex/admin-core'
import { ReactElement } from 'react'

expect.addSnapshotSerializer(serializer)
expect.extend(matchers)
expect.extend(toHaveNoViolations)

function render(ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) {
  return baseRender(ui, { wrapper: ThemeProvider, ...options })
}

export * from '@testing-library/react'
export { render, axe }
