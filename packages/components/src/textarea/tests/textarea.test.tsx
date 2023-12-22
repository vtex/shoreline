import React from 'react'
import { describe, expect, it, render } from '@vtex/shoreline-test-utils'

import { Textarea } from '..'

describe('textarea', () => {
  it('renders', () => {
    const { container } = render(<Textarea />)

    expect(container.querySelector('[data-sl-textarea]')).toBeInTheDocument()
  })

  it('render max length counter', () => {
    const { container, getByText } = render(
      <Textarea value="value" onChange={() => null} maxLength={120} />
    )

    expect(
      container.querySelector('[data-sl-textarea-char-counter]')
    ).toBeInTheDocument()

    expect(getByText('5 / 120')).toBeInTheDocument()
  })
})
