import React, { forwardRef } from 'react'
import { Stack, cx } from '@vtex/admin-ui'
import * as styles from './sidebar.css'
import type { Ref, ComponentPropsWithoutRef } from 'react'

export const SidebarLinkGroup = forwardRef(
  (props: SidebarLinkGroupProps, ref: Ref<HTMLDivElement>) => {
    const { title, className = '', children, ...restProps } = props

    return (
      <div
        ref={ref}
        className={cx(styles.sidebarGroup, className)}
        data-has-title={!!title}
        {...restProps}
      >
        {title && <h3 className={styles.sidebarGroupTitle}>{title}</h3>}
        <Stack space="$space-0" fluid>
          {children}
        </Stack>
      </div>
    )
  }
)

export type SidebarLinkGroupProps = ComponentPropsWithoutRef<'div'>
