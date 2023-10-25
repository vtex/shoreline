import React from 'react'
import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'

import { Checkbox } from '../checkbox'

describe('checkbox', () => {
  test('renders', () => {
    const { container } = render(<Checkbox>Label</Checkbox>)

    expect(container.querySelector('[data-sl-checkbox]')).toBeInTheDocument()
  })
})
