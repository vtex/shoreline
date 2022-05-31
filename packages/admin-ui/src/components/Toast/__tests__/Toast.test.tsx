import React from 'react'
import { render, axe } from '../../../test-utils'

import { ToastProvider } from '../index'
import { Toast } from '../components/Toast'

const toastProps = {
  onClear: () => {},
  id: 'toast-id',
  dedupeKey: 'toast-id',
  message: 'This is a toast!',
  action: {
    label: 'Action',
    onClick: () => {},
  },
  shouldRemove: true,
  dismissible: true,
}

describe('Toast', () => {
  it('should not have a11y violations', async () => {
    const { container } = render(
      <ToastProvider>
        <Toast {...toastProps} />
      </ToastProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
