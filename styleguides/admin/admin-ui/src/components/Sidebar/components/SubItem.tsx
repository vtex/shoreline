import React, { forwardRef, ReactNode, Ref } from 'react'
import { HTMLAttributesWithRef } from 'reakit-utils/ts'
import { StyleObject } from '@vtex/admin-styles'
import { ButtonProps, Button } from '../../Button'
import { useSidebarContext } from '../context'
import { ArrowKeys, SidebarSecretProps } from '../utils'

export const SidebarSubItem = forwardRef(function SidebarSubItem(
  props: SidebarSubItemProps,
  ref: Ref<HTMLButtonElement>
) {
  const { onClick, selected, parentId, ...itemProps } = props
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

  const styleOverrides: StyleObject = {
    width: '100%',
    backgroundColor: selected ? 'blue.secondary' : 'unset',
    '> div': {
      justifyContent: 'start',
      fontSize: '14px',
      color: selected ? 'blue' : 'dark.secondary',
    },
    '&:hover, &:focus': {
      backgroundColor: selected ? 'blue.secondary' : 'sidebar.hover',
      '> div': {
        color: selected ? 'blue.primary' : 'dark.secondary',
      },
    },
  }

  return (
    <Button
      ref={ref}
      variant="tertiary"
      size="small"
      styleOverrides={styleOverrides}
      {...props}
      disabled={!!collapse}
      onClick={handleOnClick}
      onKeyDown={(event) => handleOnKeyDown(event, itemProps)}
    />
  )
})

export type SidebarSubItemProps = Omit<_SidebarSubItemProps, 'state'>

/**
 * Private interface
 */
export interface _SidebarSubItemProps extends ButtonProps, SidebarSecretProps {
  children: ReactNode
  onClick: (event?: React.MouseEvent<any, MouseEvent>) => void
  selected?: boolean
}
