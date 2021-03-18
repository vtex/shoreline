import React, { ReactNode } from 'react'
import { useCompositeItem } from './Aria'
import { useSidebarContext } from '../context'
import { ArrowKeys, SidebarSecretProps } from '../types'
import { ButtonProps, Button } from '../../Button'

export function SidebarSectionItem(props: SidebarSectionItem) {
  const { selected, children, parentId, state, ...buttonProps } = props
  const { collapse, rootState } = useSidebarContext()

  const compositeProps = useCompositeItem(state)

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

  return (
    <Button
      variant="tertiary"
      size="small"
      csx={{
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
      }}
      disabled={!!collapse}
      {...compositeProps}
      {...buttonProps}
      onKeyDown={handleOnKeyDown}
    >
      {children}
    </Button>
  )
}

type IntrisicProps = Omit<ButtonProps, 'children' | 'ref'> &
  Omit<SidebarSecretProps, 'children' | 'ref'>

export interface SidebarSectionItem extends IntrisicProps {
  children: ReactNode
  selected?: boolean
}
