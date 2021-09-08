import React from 'react'
import { render, axe } from '../../../test-utils'

import { Toast, ToastProvider } from '../index'

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
  it('should match snapshot', () => {
    const { asFragment } = render(
      <ToastProvider>
        <Toast {...toastProps} />
        <Toast {...toastProps} type="success" />
        <Toast {...toastProps} type="warning" />
        <Toast {...toastProps} type="error" />
      </ToastProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

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
