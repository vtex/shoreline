import React, { forwardRef, ReactNode, Ref } from 'react'
import { HTMLAttributesWithRef } from 'reakit-utils/ts'
import { ButtonProps, Button } from '../../Button'
import { useSidebarContext } from '../context'
import { ArrowKeys, SidebarSecretProps } from '../utils'

export interface SidebarSubItemProps extends ButtonProps, SidebarSecretProps {
  children: ReactNode
  onClick: (event?: React.MouseEvent<any, MouseEvent>) => void
  selected?: boolean
}

export const SidebarSubItem = forwardRef(function SidebarSubItem(
  props: Omit<SidebarSubItemProps, 'secret'>,
  ref: Ref<HTMLButtonElement>
) {
  const { onClick, selected, ...itemProps } = props
  const { collapse, rootState } = useSidebarContext()

  const {
    secret: { parentId },
    // @ts-ignore
    // This line is ignored because there is no typing for
    // this prop available, as it's supposed to be 'hidden'
    // from the client. Another approach to pass this state
    // down would be to use the Context API, but since every
    // change in any of the context attributes would make the
    // context consuming elements re-render, we end up avoiding
    // unecessery re-renders everytime the user navigates
    // through the keyboard.
  } = props as SidebarSecretProps

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
        // at the sidebar's first level
        rootState.move(parentId!)
      }
    }
  }

  return (
    <Button
      ref={ref}
      variant="tertiary"
      size="small"
      styleOverrides={{
        width: '100%',
        backgroundColor: selected ? '#EAF0FD' : 'unset',
        '> div': {
          justifyContent: 'start',
          fontSize: '14px',
          color: selected ? '#2A53B2' : '#707685',
        },
        '&:hover, &:focus': {
          backgroundColor: selected ? '#EAF0FD' : 'unset',
          '> div': {
            color: '#2A53B2',
          },
        },
      }}
      {...props}
      disabled={!!collapse}
      onClick={handleOnClick}
      onKeyDown={(event) => handleOnKeyDown(event, itemProps)}
    />
  )
})
