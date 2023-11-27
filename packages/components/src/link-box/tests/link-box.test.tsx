import React from 'react'
import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'

import { LinkBox } from '../link-box'

describe('link-box', () => {
  it('renders', () => {
    const { container } = render(<LinkBox href="">Text</LinkBox>)

    expect(container.querySelector('[data-sl-link-box]')).toBeInTheDocument()
  })
})
