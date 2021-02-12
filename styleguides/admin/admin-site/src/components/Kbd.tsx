import React, { ReactNode } from 'react'
import { useSystem } from '@vtex/admin-ui'

export default function Kbd(props: Props) {
  const { children } = props
  const { cn } = useSystem()

  return (
    <kbd
      className={cn({
        themeKey: 'components.kbd',
        text: 'small',
      })}
    >
      {children}
    </kbd>
  )
}

interface Props {
  children?: ReactNode
}
