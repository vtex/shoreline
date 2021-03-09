import React, {
  cloneElement,
  forwardRef,
  FunctionComponentElement,
  ReactElement,
  Ref,
} from 'react'
import { SidebarSubItemProps, CompositeItem } from './index'
import { Set } from '../../Set'
import { Text } from '../../Text'
import { SystemComponent } from '../../../types'
import { SidebarSecretProps } from '../utils'

export interface _SidebarSectionProps
  extends SystemComponent,
    SidebarSecretProps {
  title: string
  children: FunctionComponentElement<SidebarSubItemProps>[]
}

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
      {children.map((child, index) => (
        <CompositeItem {...state} key={index} ref={ref}>
          {(itemProps) =>
            cloneElement(child as ReactElement, {
              state,
              parentId,
              ...itemProps,
            })
          }
        </CompositeItem>
      ))}
    </Set>
  )
})
