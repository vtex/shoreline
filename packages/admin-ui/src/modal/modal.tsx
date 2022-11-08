import { Dialog } from 'ariakit'

import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'

import { modalTheme, modalBackdropTheme } from './modal.css'

const Modal = forwardRef((props: ModalProps, ref: Ref<HTMLDivElement>) => {
  const { className = '', backdropProps, ...htmlProps } = props

  return (
    <Dialog
      ref={ref}
      className={cx(modalTheme, className)}
      backdropProps={{
        ...backdropProps,
        className: cx(modalBackdropTheme, backdropProps?.className ?? ''),
      }}
      {...htmlProps}
    />
  )
})

Modal.displayName = 'Modal'

type ModalProps = ComponentPropsWithoutRef<typeof Dialog>

export { Modal }
export type { ModalProps }
