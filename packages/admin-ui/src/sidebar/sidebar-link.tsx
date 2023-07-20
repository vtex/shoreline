import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui'
import * as styles from './sidebar.css'
import type { Ref, ComponentPropsWithoutRef } from 'react'

export const SidebarLink = forwardRef(
  (props: SidebarLinkProps, ref: Ref<HTMLAnchorElement>) => {
    const { href, className = '', active, children, ...restProps } = props

    return (
      <a
        ref={ref}
        className={cx(styles.sidebarLink, className)}
        data-is-active={active}
        href={href}
        {...restProps}
      >
        {children}
      </a>
    )
  }
)

export type SidebarLinkProps = ComponentPropsWithoutRef<'a'> & {
  active?: boolean
}
