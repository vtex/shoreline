import { Dialog } from 'ariakit'
import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'

import { modalTheme, modalBackdropTheme } from './modal.css'
import { Provider } from 'jotai'

/**
 * Renders a modal
 * @example
 * cosnt modal = useModalState()
 *
 * <button onClick={modal.toggle}>open modal</button>
 *
 * <Modal state={modal}>
 *  any content
 * </Modal>
 */
const Modal = forwardRef((props: ModalProps, ref: Ref<HTMLDivElement>) => {
  const { className = '', size = 'medium', backdropProps, ...htmlProps } = props

  return (
    <Provider>
      <Dialog
        ref={ref}
        className={cx(modalTheme, className)}
        backdropProps={{
          ...backdropProps,
          className: cx(modalBackdropTheme, backdropProps?.className ?? ''),
        }}
        {...htmlProps}
        data-size={size}
      />
    </Provider>
  )
})

Modal.displayName = 'Modal'

type ModalSize = 'small' | 'medium' | 'large'

interface ModalProps extends ComponentPropsWithoutRef<typeof Dialog> {
  size?: ModalSize
}

export { Modal }
export type { ModalProps, ModalSize }
