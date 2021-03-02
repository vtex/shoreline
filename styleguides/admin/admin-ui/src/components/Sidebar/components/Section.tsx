import React, { cloneElement, FunctionComponentElement } from 'react'
import { ReakitMenuItem } from './AriaSidebar'
import { SidebarSubItemProps } from './SubItem'
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

export function SidebarSection(props: Omit<SidebarSectionProps, 'secret'>) {
  const { title, children } = props

  const {
    secret: { state },
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
        <ReakitMenuItem state={state} key={index}>
          {(itemProps) =>
            cloneElement(child, {
              ...itemProps,
            })
          }
        </ReakitMenuItem>
      ))}
    </Set>
  )
}
