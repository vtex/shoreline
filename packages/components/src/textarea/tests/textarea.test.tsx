import React from 'react'
import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'

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

  it('render field label', () => {
    const { getByText } = render(<Textarea label="label" />)

    expect(getByText('label')).toBeInTheDocument()
  })
})
