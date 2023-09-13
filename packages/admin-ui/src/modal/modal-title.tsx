import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'
import { DialogHeading } from 'ariakit'

import { modalTitleTheme } from './modal.style'

const ModalTitle = forwardRef(
  (props: ModalTitleProps, ref: Ref<HTMLHeadingElement>) => {
    const { className = '', ...htmlProps } = props

    return (
      <DialogHeading
        {...htmlProps}
        ref={ref}
        className={cx(modalTitleTheme, className)}
      />
    )
  }
)

ModalTitle.displayName = 'ModalTitle'

type ModalTitleProps = ComponentPropsWithoutRef<'h1'>

export { ModalTitle }
export type { ModalTitleProps }
