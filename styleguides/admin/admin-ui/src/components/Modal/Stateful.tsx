import React, { Fragment, FunctionComponentElement } from 'react'

import { StatelessModal, StatelessModalProps } from './Stateless'
import {
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalButton,
  ModalDisclosure,
} from './components'
import { ModalState, ModalInitialState } from './state'

/**
 * Stateful Modal
 * Composites: Modal.Header, Modal.Content, Modal.Footer, & Modal.Button
 * @example
 * ```jsx
 * import { Modal } from `@vtex/admin-ui`
 *
 *
 * <Modal state={state} disclosure={<button>Open Modal</button>}>
 *  <Modal.Content>
 *   Example
 *  </Modal.Content>
 * </Modal>
 * ```
 */
export function Modal(props: ModalProps) {
  const { disclosure, visible, animated = true, ...modalProps } = props

  return (
    <ModalState initialState={{ visible, animated }}>
      {(state) => (
        <Fragment>
          <ModalDisclosure state={state}>{disclosure}</ModalDisclosure>
          <StatelessModal state={state} {...modalProps} />
        </Fragment>
      )}
    </ModalState>
  )
}

/**
 * Header of the modal
 * Renders a header element
 * @example
 * ```jsx
 * import { Modal } from `@vtex/admin-ui`
 * <Modal>
 *  <Modal.Header title="Example">
 *    <Button>Cancel</Button>
 *  </Modal.Header>
 * </Modal>
 * ```
 */
Modal.Header = ModalHeader

/**
 * Content of the modal
 * Renders a section element
 * @example
 * ```jsx
 * import { Modal } from `@vtex/admin-ui`
 * <Modal>
 *  <Modal.Content>
 *    <Button>Cancel</Button>
 *  </Modal.Content>
 * </Modal>
 * ```
 */
Modal.Content = ModalContent
/**
 * Footer of the modal
 * Renders a footer element
 * @example
 * ```jsx
 * import { Modal } from `@vtex/admin-ui`
 * <Modal>
 *  <Modal.Footer>
 *    <Button>Cancel</Button>
 *  </Modal.Footer>
 * </Modal>
 * ```
 */
Modal.Footer = ModalFooter

/**
 * Button capable of close the modal when clicked
 * It implements an admin-ui/Button, with all its features
 * @example
 * ```jsx
 * import { Modal } from `@vtex/admin-ui`
 *
 * <Modal>
 *    <Modal.Content>
 *      <Modal.Button closeModalOnClick>Save</Modal.Button>
 *    <Modal.Content>
 * </Modal>
 * ```
 */
Modal.Button = ModalButton

export interface ModalProps
  extends Omit<StatelessModalProps, 'state'>,
    Pick<ModalInitialState, 'visible' | 'animated'> {
  /**
   * Visibility toggle. It implements the [WAI-ARIA Disclosure Pattern](https://www.w3.org/TR/wai-aria-practices/#disclosure)
   */
  disclosure: FunctionComponentElement<unknown>
}
