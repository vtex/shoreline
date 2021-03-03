import React from 'react'
import { Button, ButtonProps } from '../../Button'
import { useSidebarContext } from '../context'

interface SidebarCollapseButtonProps extends ButtonProps {
  isCollapsed: boolean
}

export function SidebarCollapseButton(props: SidebarCollapseButtonProps) {
  const { isCollapsed, onClick } = props
  const { setCollapse, collapse } = useSidebarContext()

  const handleOnClick = (event: React.MouseEvent<any, MouseEvent>) => {
    setCollapse(!collapse)

    if (typeof onClick === 'function') {
      onClick(event)
    }
  }

  return (
    <Button
      styleOverrides={{
        border: '1px solid',
        height: 20,
        width: 20,
        borderRadius: '100%',
        position: 'absolute',
        left: isCollapsed ? '3.825rem' : '15.3rem',
        zIndex: 1,
        top: 24,
      }}
      {...props}
      onClick={handleOnClick}
    />
  )
}
