import React, { Fragment, FunctionComponentElement } from 'react'
import { DisclosureInitialState } from 'reakit/ts'

import {
  StatelessModal,
  StatelessModalProps,
  ModalDisclosure,
  useModalState,
} from './Stateless'

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
  const { disclosure, visible, ...modalProps } = props
  const state = useModalState({ visible })

  return (
    <Fragment>
      <ModalDisclosure {...state}>{disclosure}</ModalDisclosure>
      <StatelessModal state={state} {...modalProps} />
    </Fragment>
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
Modal.Header = StatelessModal.Header

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
Modal.Content = StatelessModal.Content
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
Modal.Footer = StatelessModal.Footer

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
Modal.Button = StatelessModal.Button

export interface ModalProps
  extends Omit<StatelessModalProps, 'state'>,
    Pick<DisclosureInitialState, 'visible'> {
  /**
   * Visibility toggle. It implements the [WAI-ARIA Disclosure Pattern](https://www.w3.org/TR/wai-aria-practices/#disclosure)
   */
  disclosure: FunctionComponentElement<unknown>
}
