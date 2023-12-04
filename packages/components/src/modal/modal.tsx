import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Dialog } from '@ariakit/react'

import { Container } from '../content'
import './modal.css'

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
