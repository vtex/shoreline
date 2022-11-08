import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'

import { modalFooterTheme } from './modal.css'

/**
 * Component responsible for rendering the modal footer
 * @example
 * <Modal>
 *  <ModalFooter>
 *    <ModalDismiss>Close modal</ModalDismiss>
 *  </ModalFooter>
 * </Modal>
 */
const ModalFooter = forwardRef(
  (props: ModalFooterProps, ref: Ref<HTMLDivElement>) => {
    const { className = '', ...htmlProps } = props

    return (
      <footer
        ref={ref}
        className={cx(modalFooterTheme, className)}
        {...htmlProps}
      />
    )
  }
)

ModalFooter.displayName = 'ModalFooter'

type ModalFooterProps = ComponentPropsWithoutRef<'footer'>

export { ModalFooter }
export type { ModalFooterProps }
