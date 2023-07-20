import React, { forwardRef } from 'react'
import { Stack, cx } from '@vtex/admin-ui'
import * as styles from './sidebar.css'
import type { Ref, ComponentPropsWithoutRef } from 'react'

export const Sidebar = forwardRef(
  (props: SidebarProps, ref: Ref<HTMLDivElement>) => {
    const { className = '', children, ...restProps } = props

    return (
      <div ref={ref} className={cx(styles.sidebar, className)} {...restProps}>
        <Stack fluid>{children}</Stack>
      </div>
    )
  }
)

export type SidebarProps = ComponentPropsWithoutRef<'div'>
