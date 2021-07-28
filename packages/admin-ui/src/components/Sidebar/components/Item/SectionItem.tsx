import type { ReactNode } from 'react'
import React from 'react'
import { merge } from '@vtex/admin-core'

import { useCompositeItem } from '../Aria'
import type { ButtonProps } from '../../../Button'
import { Button } from '../../../Button'
import { useSidebarContext } from '../../context'
import { useItemContext, ArrowKeys } from './shared'

export function SidebarSectionItem(props: SidebarSectionItem) {
  const { children, selected: currentSelected = false, ...buttonProps } = props
  const rootState = useSidebarContext()
  const { state, id, selected: parentSelected } = useItemContext()

  const compositeProps = useCompositeItem({
    ...state,
    baseId: 'section-item--',
  })

  const selected = parentSelected && currentSelected

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
      csx={merge(
        {
          width: '100%',
          minHeight: 20,
          paddingY: '0.25rem',
          height: 'auto',
          marginY: 1,
          textAlign: 'left',
          backgroundColor: selected ? 'sidebar.hover' : 'unset',
          '> div': {
            justifyContent: 'start',
            fontSize: '14px',
            fontSettings: selected ? 'medium' : 'regular',
            color: selected ? 'blue' : 'dark.secondary',
          },
          '&:hover': {
            backgroundColor: 'sidebar.hover',
            '> div': {
              color: selected ? 'blue' : 'dark.secondary',
            },
          },
        },
        buttonProps.csx
      )}
      {...compositeProps}
      {...buttonProps}
      onKeyDown={handleOnKeyDown}
    >
      {children}
    </Button>
  )
}

type IntrinsicProps = Omit<ButtonProps, 'ref'>

export interface SidebarSectionItem extends IntrinsicProps {
  /** Sidebar section item content */
  children: ReactNode
  /**
   * Whether this item is selected or not
   * @default false
   * */
  selected?: boolean
}
