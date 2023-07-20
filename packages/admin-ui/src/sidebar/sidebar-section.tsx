import React, { forwardRef } from 'react'
import { Divider, Stack, cx, useCollapse } from '@vtex/admin-ui'
import * as styles from './sidebar.css'
import type { Ref, ComponentPropsWithoutRef, ReactNode } from 'react'

export const SidebarSection = forwardRef(
  (props: SidebarSectionProps, ref: Ref<HTMLElement>) => {
    const { title, className = '', icon, children, ...restProps } = props

    const { getToggleProps, getCollapseProps, visible } = useCollapse()

    return (
      <section ref={ref} className={styles.sidebarSection} {...restProps}>
        <Stack fluid>
          <button
            className={cx(styles.sidebarSectionButton, className)}
            data-is-active={visible}
            {...getToggleProps()}
          >
            {icon}
            <div>{title}</div>
          </button>
          <div {...getCollapseProps()}>{children}</div>
        </Stack>
        {visible && <Divider className={styles.sidebarSectionDivider} />}
      </section>
    )
  }
)

export type SidebarSectionProps = ComponentPropsWithoutRef<'section'> & {
  icon: ReactNode
}
