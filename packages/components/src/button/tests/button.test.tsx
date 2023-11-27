import React from 'react'
import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'

import { Button } from '../button'

describe('button', () => {
  it('renders', () => {
    const { container } = render(<Button>Text</Button>)

    expect(container.querySelector('[data-sl-button]')).toBeInTheDocument()
  })
})
