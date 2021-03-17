import React, { ReactNode } from 'react'
import { StyleObject } from '@vtex/admin-styles'
import { ButtonProps, Button } from '../../Button'
import { useSidebarContext } from '../context'
import { ArrowKeys, SidebarSecretProps } from '../types'
import { useCompositeItem } from './Aria'

export function SidebarSubItem(props: _SidebarSubItemProps) {
  const { onClick, selected, children, parentId, state } = props
  const { collapse, rootState } = useSidebarContext()

  const compositeProps = useCompositeItem(state)

  const handleOnClick = (event?: React.MouseEvent<any, MouseEvent>) => {
    onClick(event)
  }

  const handleOnKeyDown = (event: React.KeyboardEvent<any>) => {
    if (typeof compositeProps.onKeyDown === 'function') {
      compositeProps.onKeyDown(event)

      if (event.key === ArrowKeys.Left) {
        // Move focus to parent component, which is
        // at the sidebar's first level and under the
        // root state scope.
        rootState.move(parentId!)
      }
    }
  }

  const csx: StyleObject = {
    width: '100%',
    height: 28,
    marginY: 1,
    textAlign: 'left',
    backgroundColor: selected ? 'sidebar.hover' : 'unset',
    '> div': {
      justifyContent: 'start',
      fontSize: '14px',
      fontSettings: selected ? 'medium' : 'regular',
      color: selected ? 'blue' : 'dark.secondary',
    },
    '&:hover, &:focus': {
      backgroundColor: 'sidebar.hover',
      '> div': {
        color: selected ? 'blue' : 'dark.secondary',
      },
    },
  }

  return (
    <Button
      variant="tertiary"
      size="small"
      csx={csx}
      {...props}
      {...compositeProps}
      disabled={!!collapse}
      onClick={handleOnClick}
      onKeyDown={handleOnKeyDown}
    >
      {children}
    </Button>
  )
}

export type SidebarSubItemProps = Omit<_SidebarSubItemProps, 'state'>

/**
 * Private interface
 */
export interface _SidebarSubItemProps
  extends Omit<ButtonProps, 'children' | 'ref'>,
    Omit<SidebarSecretProps, 'children' | 'ref'> {
  onClick: (event?: React.MouseEvent<any, MouseEvent>) => void
  children: ReactNode
  selected?: boolean
}
