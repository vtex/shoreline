import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'

import { modalHeaderTheme } from './modal.css'

/**
 * Component responsible for rendering the ModalHeader
 * @example
 * <Modal>
 *  <ModalHeader>
 *    <ModalHeading>Title</ModalHeading>
 *  </ModalHeader>
 * </Modal>
 */
const ModalHeader = forwardRef(
  (props: ModalHeaderProps, ref: Ref<HTMLDivElement>) => {
    const { className = '', ...htmlProps } = props

    return (
      <header
        ref={ref}
        className={cx(modalHeaderTheme, className)}
        {...htmlProps}
      />
    )
  }
)

ModalHeader.displayName = 'ModalHeader'

type ModalHeaderProps = ComponentPropsWithoutRef<'header'>

export { ModalHeader }
export type { ModalHeaderProps }
