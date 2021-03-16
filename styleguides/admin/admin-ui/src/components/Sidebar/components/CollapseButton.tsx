import React, { useState } from 'react'
import { Button, ButtonProps } from '../../Button'
import { useSidebarContext } from '../context'
import { Box } from '@vtex/admin-primitives'

/**
 * Component that renders the sidebar collapser button.
 */
export function SidebarCollapseButton(props: SidebarCollapseButtonProps) {
  const { onClick, ...buttonProps } = props
  const { setCollapse, collapse } = useSidebarContext()
  const [show, setShow] = useState(false)

  const handleOnClick = (event: React.MouseEvent<any, MouseEvent>) => {
    setCollapse(!collapse)

    if (typeof onClick === 'function') {
      onClick(event)
    }
  }

  return (
    <Box
      csx={{
        themeKey: 'components.sidebar.collapse-button-container',
      }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Button
        csx={{
          themeKey: 'components.sidebar.collapse-button',
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

type SidebarCollapseButtonProps = ButtonProps
