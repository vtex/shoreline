import React, { cloneElement, forwardRef, Ref } from 'react'
import { Set } from '../../Set'
import { Text } from '../../Text'
import { SystemComponent } from '../../../types'
import { SidebarChildren, SidebarSecretProps } from '../types'
import { CompositeItem } from './Aria'

export const SidebarSection = forwardRef(function SidebarSection(
  props: _SidebarSectionProps,
  ref: Ref<HTMLButtonElement>
) {
  const { title, children, state, parentId } = props

  return (
    <Set
      spacing={0.5}
      orientation="vertical"
      csx={{
        themeKey: 'components.sidebar.section',
      }}
    >
      <Text
        variant="action"
        csx={{
          color: 'dark.primary',
          fontSize: '0.6875rem',
          paddingBottom: '0.8125rem',
          paddingX: '0.75rem',
          fontSettings: 'medium',
        }}
      >
        {title}
      </Text>
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <CompositeItem {...state} key={index} ref={ref}>
            {(itemProps) =>
              cloneElement(child, {
                parentId,
                ...itemProps,
                children: child.props.children,
              })
            }
          </CompositeItem>
        ))
      ) : (
        <CompositeItem {...state} ref={ref}>
          {(itemProps) =>
            cloneElement(children, {
              parentId,
              ...itemProps,
              children: children.props.children,
            })
          }
        </CompositeItem>
      )}
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
   * `chilren` should be multiple `<Sidebar.SubItem {...props} />` components.
   * Those are the items over which clients will interact in order to
   * navigate between different pages.
   */
  children: SidebarChildren
}
