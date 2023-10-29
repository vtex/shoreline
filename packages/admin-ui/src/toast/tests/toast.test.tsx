import React from 'react'
import { render } from '../../test-utils'

import { Toast } from '../toast'
import { ToastProvider } from '../use-toast'

describe('toast', () => {
  it('renders', async () => {
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

    expect(container).toBeInTheDocument()
  })
})
