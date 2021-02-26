import React, { ReactNode } from 'react'
import { ButtonProps, Button } from '../../Button'
import { useSidebarContext } from '../context'
import { CornerScope } from '../utils'

export interface SidebarItemProps extends ButtonProps {
  collapsed?: boolean
  icon: ReactNode
  onClick: (event: React.MouseEvent<any, MouseEvent>) => void
}

export function SidebarItem(props: SidebarItemProps) {
  const { icon, onClick } = props
  // @ts-ignore
  const index = props['index'] as number
  // @ts-ignore
  const scope = props['scope'] as CornerScope
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
