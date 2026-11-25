import { createRef } from 'react'
import {
  describe,
  expect,
  it,
  render,
  screen,
} from '@vtex/shoreline-test-utils'

import { AIWorkingMark } from '../ai-working-mark'

describe('AIWorkingMark', () => {
  it('is hidden from assistive tech and renders a default glyph', () => {
    const { container } = render(<AIWorkingMark />)
    const mark = container.querySelector('[data-sl-ai-working-mark]')

    expect(mark).toHaveAttribute('aria-hidden', 'true')
    expect(
      mark?.querySelector('[data-sl-ai-working-mark-glyph] svg')
    ).toBeTruthy()
  })

  it('renders children as the glyph', () => {
    render(
      <AIWorkingMark>
        <i data-testid="g" />
      </AIWorkingMark>
    )

    expect(screen.getByTestId('g').parentElement).toHaveAttribute(
      'data-sl-ai-working-mark-glyph'
    )
  })

  it('forwards props and ref', () => {
    const ref = createRef<HTMLSpanElement>()

    render(<AIWorkingMark ref={ref} data-x="1" />)

    expect(ref.current).toHaveAttribute('data-x', '1')
  })
})
