import React from 'react'
import { describe, expect, it, act, render } from '@vtex/shoreline-test-utils'

import { Modal } from '../modal'

describe('modal', () => {
  it('renders', async () => {
    const { container } = await act(() =>
      render(
        <Modal portal={false} open>
          Test
        </Modal>
      )
    )

    expect(container.querySelector('[data-sl-modal]')).toBeInTheDocument()
  })
})
