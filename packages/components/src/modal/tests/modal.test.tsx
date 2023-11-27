import React from 'react'
import { describe, expect, it } from 'vitest'
import { act, render } from '@testing-library/react'

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
