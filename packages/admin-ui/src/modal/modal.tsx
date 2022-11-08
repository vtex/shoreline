import { Dialog } from 'ariakit'

import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'

import { modalTheme, modalBackdropTheme } from './modal.css'

const Modal = forwardRef((props: ModalProps, ref: Ref<HTMLDivElement>) => {
  const {
    className = '',
    fluid = false,
    size = 'medium',
    backdropProps,
    ...htmlProps
  } = props

  return (
    <Dialog
      ref={ref}
      className={cx(modalTheme, className)}
      backdropProps={{
        ...backdropProps,
        className: cx(modalBackdropTheme, backdropProps?.className ?? ''),
      }}
      {...htmlProps}
      data-fluid={fluid}
      data-size={size}
    />
  )
})

Modal.displayName = 'Modal'

type ModalSize = 'small' | 'medium' | 'large'

interface ModalProps extends ComponentPropsWithoutRef<typeof Dialog> {
  fluid?: boolean
  size?: ModalSize
}

export { Modal }
export type { ModalProps, ModalSize }
