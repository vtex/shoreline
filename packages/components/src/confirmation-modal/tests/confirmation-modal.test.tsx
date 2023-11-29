import React from 'react'
import {
  render,
  fireEvent,
  vi,
  describe,
  it,
  expect,
} from '@vtex/shoreline-test-utils'
import { ConfirmationModal } from '../confirmation-modal'

describe('ConfirmationModal', () => {
  it('should call onConfirm when confirm button is clicked', () => {
    const onConfirm = vi.fn()
    const onCancel = vi.fn()

    const { getByText } = render(
      <ConfirmationModal open onConfirm={onConfirm} onCancel={onCancel}>
        Are you sure you want to proceed?
      </ConfirmationModal>
    )

    const confirmButton = getByText('Confirm')

    fireEvent.click(confirmButton)

    expect(onConfirm).toHaveBeenCalled()
    expect(onCancel).not.toHaveBeenCalled()
  })

  it('should call onCancel when cancel button is clicked', () => {
    const onConfirm = vi.fn()
    const onCancel = vi.fn()

    const { getByText } = render(
      <ConfirmationModal open onConfirm={onConfirm} onCancel={onCancel}>
        Are you sure you want to proceed?
      </ConfirmationModal>
    )

    const cancelButton = getByText('Cancel')

    fireEvent.click(cancelButton)

    expect(onCancel).toHaveBeenCalled()
    expect(onConfirm).not.toHaveBeenCalled()
  })
})
