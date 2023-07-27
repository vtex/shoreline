import React, { forwardRef } from 'react'
import {
  IconCaretUp,
  IconCaretDown,
  Stack,
  cx,
  useCollapse,
} from '@vtex/admin-ui'
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
            data-active={visible}
            {...getToggleProps()}
          >
            {icon}
            <div>{title}</div>
            {visible ? (
              <IconCaretUp className="sidebar-section-caret" />
            ) : (
              <IconCaretDown className="sidebar-section-caret" />
            )}
          </button>
          <div {...getCollapseProps()}>{children}</div>
        </Stack>
      </section>
    )
  }
)

export type SidebarSectionProps = ComponentPropsWithoutRef<'section'> & {
  icon: ReactNode
}
