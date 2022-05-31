import React from 'react'
import { render, axe, withState } from '../../../test-utils'
import 'mutationobserver-shim'

import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
  useModalState,
} from '../index'

global.MutationObserver = window.MutationObserver

const ModalWithState = withState(Modal, () =>
  useModalState({
    visible: true,
  })
)

describe('Modal', () => {
  it('should not have a11y violations', async () => {
    const { container } = render(
      <ModalWithState aria-label="modal">
        <ModalHeader title="Header" />
        <ModalContent>
          <div>modal content</div>
        </ModalContent>
        <ModalFooter>
          <button>footer button</button>
        </ModalFooter>
      </ModalWithState>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
