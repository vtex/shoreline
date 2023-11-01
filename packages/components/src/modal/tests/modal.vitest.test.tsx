import React, { useState } from 'react'
import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'

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
  test('renders', () => {
    const { container } = render(<Modal open>Test</Modal>)

    expect(document.querySelector('[data-sl-modal]')).toBeInTheDocument()
  })

  test('opens and closes', async () => {
    const { findByTestId } = render(<BasicModal />)

    const modal = document.querySelector('[data-sl-modal]')

    // expect to be hidden
    expect(modal && modal.hasAttribute('hidden')).toBeTruthy()

    const button = await findByTestId('modal-disclosure')

    await userEvent.click(button)

    // expect to not be hidden
    expect(modal && modal.hasAttribute('hidden')).toBeFalsy()

    const backdrop = await document.querySelector('[data-sl-modal-backdrop]')

    backdrop && (await userEvent.click(backdrop))

    // expect to be hidden
    expect(modal && modal.hasAttribute('hidden')).toBeTruthy()
  })
})
