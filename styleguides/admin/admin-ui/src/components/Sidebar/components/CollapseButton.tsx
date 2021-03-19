import React from 'react'
import { useSidebarContext } from '../context'
import { Button, ButtonProps } from '../../Button'
import { SidebarSecretProps } from '../types'

/**
 * Component that renders the sidebar collapser button.
 */
export function SidebarCollapseButton(props: SidebarCollapseButtonProps) {
  const {
    onClick,
    showCollapseButton,
    setShowCollapseButton,
    ...buttonProps
  } = props
  const { setCollapse, collapse } = useSidebarContext()

  const handleOnClick = (event: React.MouseEvent<any, MouseEvent>) => {
    setCollapse(!collapse)

    if (typeof onClick === 'function') {
      onClick(event)
    }
  }

  return (
    <Button
      csx={{
        themeKey: 'components.sidebar.collapse-button',
        opacity: showCollapseButton ? 1 : 0,
        transitionDuration: '.3s',
      }}
      {...props}
      {...buttonProps}
      onClick={handleOnClick}
      onMouseEnter={() => setShowCollapseButton(true)}
      onMouseLeave={() => setShowCollapseButton(false)}
    />
  )
}

type SidebarCollapseButtonProps = ButtonProps &
  Required<
    Pick<SidebarSecretProps, 'showCollapseButton' | 'setShowCollapseButton'>
  >
