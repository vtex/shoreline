import React, { forwardRef, Ref } from 'react'
import { HTMLAttributesWithRef } from 'reakit-utils/ts'
import { StyleObject } from '@vtex/admin-styles'
import { ButtonProps, Button } from '../../Button'
import { useSidebarContext } from '../context'
import { ArrowKeys, SidebarSecretProps } from '../types'

export const SidebarSubItem = forwardRef(function SidebarSubItem(
  props: _SidebarSubItemProps,
  ref: Ref<HTMLButtonElement>
) {
  const { onClick, selected, label, parentId, ...itemProps } = props
  const { collapse, rootState } = useSidebarContext()

  const handleOnClick = (event?: React.MouseEvent<any, MouseEvent>) => {
    onClick(event)
  }

  const handleOnKeyDown = (
    event: React.KeyboardEvent<any>,
    itemProps: HTMLAttributesWithRef
  ) => {
    if (typeof itemProps.onKeyDown === 'function') {
      itemProps.onKeyDown(event)

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
      ref={ref}
      variant="tertiary"
      size="small"
      csx={csx}
      {...props}
      disabled={!!collapse}
      onClick={handleOnClick}
      onKeyDown={(event) => handleOnKeyDown(event, itemProps)}
    >
      {label}
    </Button>
  )
})

export type SidebarSubItemProps = Omit<_SidebarSubItemProps, 'state'>

/**
 * Private interface
 */
export interface _SidebarSubItemProps
  extends Omit<ButtonProps, 'children'>,
    SidebarSecretProps {
  onClick: (event?: React.MouseEvent<any, MouseEvent>) => void
  label: string
  selected?: boolean
}
