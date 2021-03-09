import React, { useState } from 'react'
import { Button, ButtonProps } from '../../Button'
import { useSidebarContext } from '../context'
import { useSystem } from '@vtex/admin-core'
import { Box } from '../../Box'

interface SidebarCollapseButtonProps extends ButtonProps {
  isCollapsed: boolean
}

export function SidebarCollapseButton(props: SidebarCollapseButtonProps) {
  const { onClick, isCollapsed, ...buttonProps } = props
  const { setCollapse, collapse } = useSidebarContext()
  const [show, setShow] = useState(false)
  const { cn, stylesOf } = useSystem()

  const handleOnClick = (event: React.MouseEvent<any, MouseEvent>) => {
    setCollapse(!collapse)

    if (typeof onClick === 'function') {
      onClick(event)
    }
  }

  return (
    <Box
      className={cn({
        themeKey: 'components.sidebar.collapse-button-container',
      })}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Button
        styleOverrides={{
          ...stylesOf('components.sidebar.collapse-button'),
          opacity: show ? 1 : 0,
          transitionDuration: '.3s',
        }}
        onClick={handleOnClick}
        {...props}
        {...buttonProps}
      />
    </Box>
  )
}
