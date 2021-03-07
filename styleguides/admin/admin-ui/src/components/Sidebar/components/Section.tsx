import React, {
  cloneElement,
  forwardRef,
  FunctionComponentElement,
  Ref,
} from 'react'
import { SidebarSubItemProps, CompositeItem } from './index'
import { Set } from '../../Set'
import { Text } from '../../Text'
import { SystemComponent } from '../../../types'
import { SidebarSecretProps } from '../utils'

export interface SidebarSectionProps
  extends SystemComponent,
    SidebarSecretProps {
  title: string
  children: FunctionComponentElement<SidebarSubItemProps>[]
}

export const SidebarSection = forwardRef(function SidebarSection(
  props: SidebarSectionProps,
  ref: Ref<HTMLButtonElement>
) {
  const { title, children, state, parentId } = props

  return (
    <Set
      spacing={0.5}
      orientation="vertical"
      styleOverrides={{
        width: 'calc(200px - 1.75rem)',
        paddingBottom: 8,
      }}
    >
      <Text
        variant="action"
        styleOverrides={{
          color: 'gray',
          fontSize: '11px',
          paddingBottom: '12px',
        }}
      >
        {title}
      </Text>
      {children.map((child, index) => (
        <CompositeItem {...state} key={index} ref={ref}>
          {(itemProps) =>
            // @ts-ignore
            cloneElement(child, {
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
