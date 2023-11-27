import React from 'react'
import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'

import { Link } from '../link'

describe('link', () => {
  it('renders', () => {
    const { container } = render(<Link href="https://vtex.com">Label</Link>)

    expect(container.querySelector('[data-sl-link]')).toBeInTheDocument()
  })
})
