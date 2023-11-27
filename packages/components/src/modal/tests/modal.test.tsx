import React, { useState } from 'react'
import { describe, expect, it } from 'vitest'
import { act, render } from '@testing-library/react'

import { Modal } from '../modal'

import { Content } from '../../content'
import { Button } from '../../button'
import userEvent from '@testing-library/user-event'

export function BasicModal() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button data-testid="modal-disclosure" onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Content data-testid="modal-content">Modal content</Content>
      </Modal>
    </>
  )
}

describe('modal', () => {
  it('renders', () => {
    render(<Modal open>Test</Modal>)

    expect(document.querySelector('[data-sl-modal]')).toBeInTheDocument()
  })

  it('opens and closes', async () => {
    const { findByTestId } = render(<BasicModal />)

    const modal = document.querySelector('[data-sl-modal]')

    // expect to be hidden
    expect(modal && modal.hasAttribute('hidden')).toBeTruthy()

    const button = await findByTestId('modal-disclosure')

    await act(() => userEvent.click(button))

    // expect to not be hidden
    expect(modal && modal.hasAttribute('hidden')).toBeFalsy()

    const backdrop = document.querySelector('[data-sl-modal-backdrop]')

    backdrop && (await act(() => userEvent.click(backdrop)))

    // expect to be hidden
    expect(modal && modal.hasAttribute('hidden')).toBeTruthy()
  })
})
