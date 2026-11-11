import { createRef } from 'react'
import {
  describe,
  expect,
  it,
  render,
  screen,
} from '@vtex/shoreline-test-utils'

import { AIComposerHeader } from '..'

describe('AIComposerHeader', () => {
  it('renders its children in a neutral element', () => {
    render(
      <AIComposerHeader>
        <span data-testid="card" />
      </AIComposerHeader>
    )

    const header = document.querySelector('[data-sl-ai-composer-header]')

    expect(header).toContainElement(screen.getByTestId('card'))
    expect(header?.tagName).toBe('DIV')
  })

  it('forwards the ref and the HTML props', () => {
    const ref = createRef<HTMLDivElement>()

    render(<AIComposerHeader ref={ref} aria-label="Context" className="own" />)

    expect(ref.current).toBe(
      document.querySelector('[data-sl-ai-composer-header]')
    )
    expect(ref.current).toHaveAttribute('aria-label', 'Context')
    expect(ref.current).toHaveClass('own')
  })
})
