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
import { fireEvent, screen } from '@testing-library/react'

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

    expect(getByTestId('modal')).toHaveStyleRule('background', 'coral')
    expect(getByTestId('header')).toHaveStyleRule('background', 'azure')
    expect(getByTestId('content')).toHaveStyleRule('background', 'aquamarine')
    expect(getByTestId('footer')).toHaveStyleRule('background', 'firebrick')
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

  it('should call onClose when calls state.hide', () => {
    const onCloseMocked = jest.fn()

    const Example = () => {
      const state = useModalState({ visible: true })

      return (
        <>
          <Modal state={state} onClose={onCloseMocked} aria-label="modal">
            <ModalHeader title="Header" />
            <ModalContent>
              <div>modal content</div>
            </ModalContent>
            <ModalFooter>
              <button>footer button</button>
            </ModalFooter>
          </Modal>
          <button onClick={state.hide}>Hide</button>
        </>
      )
    }

    render(<Example />)

    fireEvent.click(screen.getByText('Hide'))
    fireEvent.click(screen.getByText('Hide'))

    expect(onCloseMocked).toBeCalledTimes(1)
  })

  it('should call onClose with hideOnEsc', () => {
    const onCloseMocked = jest.fn()

    const Example = () => {
      const state = useModalState({ visible: true })

      return (
        <>
          <Modal
            state={state}
            onClose={onCloseMocked}
            aria-label="modal"
            hideOnEsc
          >
            <ModalHeader title="Header" />
            <ModalContent>
              <div>modal content</div>
            </ModalContent>
            <ModalFooter>
              <button>footer button</button>
            </ModalFooter>
          </Modal>
        </>
      )
    }

    render(<Example />)

    fireEvent.keyDown(screen.getByLabelText('modal'), { key: 'Escape' })
    fireEvent.keyDown(screen.getByLabelText('modal'), { key: 'Escape' })

    expect(onCloseMocked).toBeCalledTimes(1)
  })

  it('should call onClose with hideOnClickOutside', () => {
    const onCloseMocked = jest.fn()

    const Example = () => {
      const state = useModalState({ visible: true })

      return (
        <>
          <Modal
            state={state}
            onClose={onCloseMocked}
            aria-label="modal"
            hideOnClickOutside
          >
            <ModalHeader title="Header" />
            <ModalContent>
              <div>modal content</div>
            </ModalContent>
            <ModalFooter>
              <button>footer button</button>
            </ModalFooter>
          </Modal>
        </>
      )
    }

    const { baseElement } = render(<Example />)

    fireEvent.mouseDown(baseElement)
    fireEvent.click(baseElement)

    fireEvent.mouseDown(baseElement)
    fireEvent.click(baseElement)

    expect(onCloseMocked).toBeCalledTimes(1)
  })
})
