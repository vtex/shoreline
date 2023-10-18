import React from 'react'
import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'

import { Textarea } from '..'

describe('field', () => {
  test('renders', () => {
    const { container } = render(<Textarea />)

    expect(container.querySelector('[data-sl-textarea]')).toBeInTheDocument()
  })
})
