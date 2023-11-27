import React from 'react'
import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'

import { Tag } from '../tag'

describe('tag', () => {
  test('renders', () => {
    const { container } = render(<Tag>Text</Tag>)

    expect(container.querySelector('[data-sl-tag]')).toBeInTheDocument()
  })
})
