import { cx } from '@vtex/admin-ui-core'
import type { Ref, ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

import { toastContainerTheme } from './toast.style'
import type { ToastVariant } from './types'

export const ToastContainer = forwardRef(
  (props: ToastContainerProps, ref: Ref<HTMLDivElement>) => {
    const { variant = 'info', className = '', ...restProps } = props

    return (
      <div
        ref={ref}
        data-variant={variant}
        className={cx(toastContainerTheme, className)}
        {...restProps}
      />
    )
  }
)

interface ToastContainerProps extends ComponentPropsWithoutRef<'div'> {
  variant?: ToastVariant
}
