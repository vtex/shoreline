import React from 'react'
import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'

import { Modal } from '../modal'

describe('modal', () => {
  test('renders', () => {
    const { container } = render(<Modal />)

    expect(container.querySelector('[data-sl-modal]')).toBeInTheDocument()
  })
})
