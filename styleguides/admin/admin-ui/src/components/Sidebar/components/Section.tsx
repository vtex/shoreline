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
  props: Omit<SidebarSectionProps, 'secret'>,
  ref: Ref<HTMLButtonElement>
) {
  const { title, children } = props

  const {
    secret: { state, parentId },
    // @ts-ignore
  } = props as SidebarSecretProps

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
            // This line is ignored because there is no typing for
            // this prop available, as it's supposed to be 'hidden'
            // from the client. Another approach to pass this state
            // down would be to use the Context API, but since every
            // change in any of the context attributes would make the
            // context consuming elements re-render, we end up avoiding
            // unecessery re-renders everytime the user navigates
            // through the keyboard.
            cloneElement(child, {
              secret: { state, parentId },
              ...itemProps,
            })
          }
        </CompositeItem>
      ))}
    </Set>
  )
})
