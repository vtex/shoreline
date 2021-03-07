import React, { useMemo, useState } from 'react'
import { StyleObject } from '@vtex/admin-styles'
import { Button, ButtonProps } from '../../Button'
import { useSidebarContext } from '../context'
import { motion } from 'framer-motion'
import { useSystem } from '@vtex/admin-core'
import { CollapseButtonVariants } from '../utils'

interface SidebarCollapseButtonProps extends ButtonProps {
  isCollapsed: boolean
}

export function SidebarCollapseButton(props: SidebarCollapseButtonProps) {
  const { onClick, isCollapsed, ...buttonProps } = props
  const { setCollapse, collapse } = useSidebarContext()
  const [show, setShow] = useState(false)
  const { cn } = useSystem()

  const handleOnClick = (event: React.MouseEvent<any, MouseEvent>) => {
    setCollapse(!collapse)

    if (typeof onClick === 'function') {
      onClick(event)
    }
  }

  const styleOverrides: StyleObject = {
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
  }

  const className = cn({
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 1,
    height: 80,
    width: 40,
    marginLeft: 'auto',
    top: '14px',
  })

  const variants = useMemo(
    () =>
      CollapseButtonVariants({
        left: isCollapsed ? -5 : 20,
      }),
    [isCollapsed]
  )

  return (
    <motion.div
      className={className}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      initial={isCollapsed ? 'collapsed' : 'expanded'}
      animate={isCollapsed ? 'collapsed' : 'expanded'}
      variants={variants}
    >
      <Button
        styleOverrides={styleOverrides}
        onClick={handleOnClick}
        {...props}
        {...buttonProps}
      />
    </motion.div>
  )
}
