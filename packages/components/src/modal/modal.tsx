import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Dialog } from '@ariakit/react'

import { Container } from '../content'

/**
 * Modal containers allow users to view content that demands attention through an overlay window that opens on top of the current page.
 *
 * @playground
 * @example
 * ```jsx
 * function Example() {
 *  const [open, setOpen] = React.useState(false)
 *
 *  return (
 *    <>
 *      <Button onClick={() => setOpen(true)}>Open modal</Button>
 *      <Modal
 *        open={open}
 *        onClose={() => {
 *          setOpen(false)
 *        }}
 *      >
 *        <ModalContent>Content</ModalContent>
 *      </Modal>
 *    </>
 *  )
 * }
 * ```
 */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(function Modal(
  props,
  ref
) {
  const { children, portal = true, size = 'medium', ...otherProps } = props

  return (
    <Dialog
      data-sl-modal
      ref={ref}
      backdrop={<div data-sl-modal-backdrop />}
      portal={portal}
      data-size={size}
      {...otherProps}
    >
      <Container data-sl-modal-container>{children}</Container>
    </Dialog>
  )
})

export interface ModalProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Callback fired when the backdrop or close button is clicked.
   */
  onClose?: (event: Event) => void
  /**
   * Whether the modal is open or not
   * @default false
   */
  open?: boolean
  /**
   * Whether to render the modal inside a portal or not
   * @default true
   */
  portal?: boolean
  /**
   * Modal size
   * @default medium
   */
  size?: 'small' | 'medium' | 'large'
}
