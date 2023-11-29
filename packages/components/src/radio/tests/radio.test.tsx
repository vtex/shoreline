import React from 'react'
import { describe, expect, it, render } from '@vtex/shoreline-test-utils'

import { Radio } from '../radio'

describe('radio', () => {
  it('renders', () => {
    const { container } = render(<Radio value="id">test</Radio>)

    expect(container.querySelector('[data-sl-radio]')).toBeInTheDocument()
  })

  it('renders field label', () => {
    const { getByText } = render(<Radio value="id">label</Radio>)

    expect(getByText('label')).toBeInTheDocument()
  })
})
