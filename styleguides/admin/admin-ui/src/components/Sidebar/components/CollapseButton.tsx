import React, { useState } from 'react'
import { Box } from '../../Box'
import { Button, ButtonProps } from '../../Button'
import { useSidebarContext } from '../context'

interface SidebarCollapseButtonProps extends ButtonProps {
  isCollapsed: boolean
}

export function SidebarCollapseButton(props: SidebarCollapseButtonProps) {
  const { isCollapsed, onClick } = props
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
      styles={{
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        left: isCollapsed ? '3.125rem' : '14.675rem',
        paddingTop: '18px',
        zIndex: 1,
        top: 0,
        height: 80,
        width: 40,
      }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Button
        styleOverrides={{
          border: '1px solid',
          borderRadius: '100%',
          height: 20,
          width: 20,
          opacity: show ? 1 : 0,
          transition: '.3s',
          backgroundColor: 'white',
          borderColor: '#E1E2E7',
          '> div > svg': {
            color: 'grey',
          },
          '&:hover': {
            backgroundColor: 'blue.hover',
            borderColor: 'blue.hover',
            '> div > svg': {
              color: 'white',
            },
          },
        }}
        {...props}
        onClick={handleOnClick}
      />
    </Box>
  )
}
