import { Content } from '../content'
import type { ComponentPropsWithoutRef } from 'react'

export function DrawerHeader(props: DrawerHeaderProps) {
  return (
    <Content narrow asChild>
      <header data-sl-drawer-header {...props} />
    </Content>
  )
}

export type DrawerHeaderProps = ComponentPropsWithoutRef<'header'>
