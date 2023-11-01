import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Dialog } from '@ariakit/react'
import { Container } from '../content'

export const Modal = forwardRef<HTMLDivElement, ModalProps>(function Modal(
  props,
  ref
) {
  const { children, ...otherProps } = props

  return (
    <Dialog
      data-sl-modal
      ref={ref}
      backdrop={<div data-sl-modal-backdrop />}
      {...otherProps}
    >
      <Container>{children}</Container>
    </Dialog>
  )
})

export interface ModalProps extends ComponentPropsWithoutRef<'div'> {
  onClose?: (event: Event) => void
  open?: boolean
}
