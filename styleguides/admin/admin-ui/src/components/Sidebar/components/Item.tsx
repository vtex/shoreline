import React, { ReactNode } from 'react'
import { ButtonProps, Button } from '../../Button'
import { SidebarCurrentItem, useSidebarContext } from '../context'

export interface SidebarItemProps extends ButtonProps {
  collapsed?: boolean
  icon: ReactNode
  onClick: (event: React.MouseEvent<any, MouseEvent>) => void
  secret: SidebarCurrentItem
}

export function SidebarItem(props: Omit<SidebarItemProps, 'secret'>) {
  const { icon, onClick } = props
  // @ts-ignore
  // Although we ommit the secret prop for clients,
  // it is safe to access it, once the parent component
  // obligatorily passes it down.
  const { index, scope } = props['secret'] as SidebarCurrentItem
  const { currentItem, setCurrentItem } = useSidebarContext()

  const selected = currentItem.scope === scope && currentItem.index === index

  return (
    <Button
      variant="tertiary"
      icon={icon}
      styleOverrides={{
        backgroundColor: selected ? '#EAF0FD' : 'unset',
        'div > svg': {
          color: selected ? 'unset' : 'black',
          opacity: selected ? 1 : 0.6,
        },
      }}
      {...props}
      onClick={(event) => {
        onClick(event)
        setCurrentItem({ index, scope })
      }}
    />
  )
}
