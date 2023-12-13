import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Dialog } from '@ariakit/react'

import { Container } from '../content'
import './modal.css'

/**
 * Modal containers allow users to view content that demands attention through an overlay window that opens on top of the current page.
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
  onClose?: (event: Event) => void
  open?: boolean
  portal?: boolean
  size?: 'small' | 'medium' | 'large'
}
