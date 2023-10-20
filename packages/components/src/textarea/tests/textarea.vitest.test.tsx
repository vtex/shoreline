import React from 'react'
import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'

import { Textarea } from '..'

describe('textarea', () => {
  test('renders', () => {
    const { container } = render(<Textarea />)

    expect(container.querySelector('[data-sl-textarea]')).toBeInTheDocument()
  })

  test('render max length counter', () => {
    const { container, getByText } = render(
      <Textarea value="value" maxLength={120} />
    )

    expect(
      container.querySelector('[data-sl-textarea-char-counter]')
    ).toBeInTheDocument()

    expect(getByText('5 / 120')).toBeInTheDocument()
  })

  test('render field label', () => {
    const { getByText } = render(<Textarea label="label" />)

    expect(getByText('label')).toBeInTheDocument()
  })
})
