import React, { ReactNode } from 'react'
import { useCompositeItem } from '../Aria'
import { ButtonProps, Button } from '../../../Button'
import { useSidebarContext } from '../../context'
import { useItemContext, ArrowKeys } from './shared'

export function SidebarSectionItem(props: SidebarSectionItem) {
  const { children, selected = false, ...buttonProps } = props
  const rootState = useSidebarContext()
  const { state, id, selected: parentSelected } = useItemContext()

  const compositeProps = useCompositeItem(state)
  const isSelected = parentSelected && selected

  const handleOnKeyDown = (event: React.KeyboardEvent<any>) => {
    if (typeof compositeProps.onKeyDown === 'function') {
      compositeProps.onKeyDown(event)

      if (event.key === ArrowKeys.Left) {
        // Move focus to parent component, which is
        // at the sidebar's first level and under the
        // root state scope.
        rootState.composite.move(id!)
      }
    }
  }

  return (
    <Button
      variant="tertiary"
      size="small"
      csx={{
        width: '100%',
        minHeight: 20,
        paddingY: '0.25rem',
        height: 'auto',
        marginY: 1,
        textAlign: 'left',
        backgroundColor: isSelected ? 'sidebar.hover' : 'unset',
        '> div': {
          justifyContent: 'start',
          fontSize: '14px',
          fontSettings: isSelected ? 'medium' : 'regular',
          color: isSelected ? 'blue' : 'dark.secondary',
        },
        '&:hover': {
          backgroundColor: 'sidebar.hover',
          '> div': {
            color: isSelected ? 'blue' : 'dark.secondary',
          },
        },
      }}
      {...compositeProps}
      {...buttonProps}
      onKeyDown={handleOnKeyDown}
    >
      {children}
    </Button>
  )
}

type IntrisicProps = Omit<ButtonProps, 'children' | 'ref'>

export interface SidebarSectionItem extends IntrisicProps {
  children: ReactNode
  selected?: boolean
}
