import React from 'react'
import { render, axe } from '../../test-utils'

import { Toast } from '../toast'
import { ToastProvider } from '../toast-context'

describe('toast', () => {
  it('should not have a11y violations', async () => {
    const { container } = render(
      <ToastProvider>
        <Toast
          id="toast-id"
          dedupeKey="toast-id"
          message="This is a toast!"
          action={{
            label: 'Action',
            onClick: () => {},
          }}
          shouldRemove
          onClear={() => {}}
          dismissible
        />
      </ToastProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
