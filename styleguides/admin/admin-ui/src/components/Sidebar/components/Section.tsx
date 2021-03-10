import React, { forwardRef, Ref } from 'react'
import { SidebarSubItemProps, CompositeItem } from './index'
import { Set } from '../../Set'
import { Text } from '../../Text'
import { SystemComponent } from '../../../types'
import { SidebarSecretProps } from '../types'
import { SidebarSubItem } from './SubItem'

export const SidebarSection = forwardRef(function SidebarSection(
  props: _SidebarSectionProps,
  ref: Ref<HTMLButtonElement>
) {
  const { title, children, state, parentId } = props

  return (
    <Set
      spacing={0.5}
      orientation="vertical"
      themeKey={'components.sidebar.section'}
    >
      <Text
        variant="action"
        styleOverrides={{
          color: 'dark.primary',
          fontSize: '0.6875rem',
          paddingBottom: '0.8125rem',
          paddingX: '0.75rem',
          fontSettings: 'medium',
        }}
      >
        {title}
      </Text>
      {children.map((props, index) => (
        <CompositeItem {...state} key={index} ref={ref}>
          {(itemProps) => (
            <SidebarSubItem
              state={state}
              parentId={parentId}
              {...itemProps}
              {...props}
            />
          )}
        </CompositeItem>
      ))}
    </Set>
  )
})

export type SidebarSectionProps = Omit<_SidebarSectionProps, 'state'>

/**
 * Private interface
 */
export interface _SidebarSectionProps
  extends SystemComponent,
    SidebarSecretProps {
  /**
   * `title` of a section. This is what separates each item's section.
   */
  title: string
  /**
   * `chilren` are multiple `<Sidebar.SubItem {...props} />` components.
   * Those are the items over which clients will interact in order to
   * navigate between different pages.
   */
  children: SidebarSubItemProps[]
}
