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
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ModalWithState
        data-testid="modal"
        aria-label="modal"
        csx={{
          bg: 'coral',
        }}
      >
        <ModalHeader
          data-testid="header"
          title="Header"
          csx={{
            bg: 'azure',
          }}
        />
        <ModalContent
          data-testid="content"
          csx={{
            bg: 'aquamarine',
          }}
        >
          <div>modal content</div>
        </ModalContent>
        <ModalFooter
          data-testid="footer"
          csx={{
            bg: 'firebrick',
          }}
        >
          <button>footer button</button>
        </ModalFooter>
      </ModalWithState>
    )

    expect(getByTestId('modal')).toHaveStyleRule('background-color', 'coral')
    expect(getByTestId('header')).toHaveStyleRule('background-color', 'azure')
    expect(getByTestId('content')).toHaveStyleRule(
      'background-color',
      'aquamarine'
    )
    expect(getByTestId('footer')).toHaveStyleRule(
      'background-color',
      'firebrick'
    )
  })

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
