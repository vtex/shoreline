import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'

import { modalContentTheme } from './modal.css'

/**
 * Component responsible for rendering the modal content
 * @example
 * <Modal>
 *  <ModalContent>
 *    Your content
 *  </ModalContent>
 * </Modal>
 */
const ModalContent = forwardRef(
  (props: ModalContentProps, ref: Ref<HTMLDivElement>) => {
    const { className = '', children, ...htmlProps } = props

    return (
      <div
        ref={ref}
        className={cx(modalContentTheme, className)}
        {...htmlProps}
      >
        <div data-modal-scrollable-content>{children}</div>
      </div>
    )
  }
)

ModalContent.displayName = 'ModalContent'

type ModalContentProps = ComponentPropsWithoutRef<'div'>

export { ModalContent }
export type { ModalContentProps }
