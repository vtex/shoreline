import type { ReactNode, Ref } from 'react'
import React, { forwardRef } from 'react'
import { merge } from '@vtex/admin-ui-util'
import { useCompositeItem } from 'reakit/Composite'

import type { ButtonProps } from '../../Button'
import { Button } from '../../Button'
import { useSidebarContext, useItemContext } from './SidebarContext'
import { ArrowKeys } from '../consts'

/**
 * The last node of the sidebar tree.
 * This is where clients will interact most to perform actions
 */
export const SidebarSectionItem = forwardRef(function SidebarSectionItem(
  props: SidebarSectionItem,
  ref: Ref<HTMLButtonElement>
) {
  const {
    children,
    selected: currentSelected = false,
    onClick,
    ...buttonProps
  } = props

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

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    rootState.setSelectedItemFallback(rootState.selectedItem)

    onClick?.(event)
  }

  return (
    <Button
      ref={ref}
      variant="adaptative-dark"
      size="small"
      csx={merge(
        {
          width: '100%',
          minHeight: 20,
          padding: '$s',
          height: 'auto',
          textAlign: 'left',
          zIndex: 'sidebarOverlay',
          bg: 'transparent',
          '> div': {
            justifyContent: 'start',
            color: selected ? '$action.main.tertiarySelected' : '$secondary',
          },
          '> div > div': {
            text: '$action2',
          },
          ':hover': {
            '> div': {
              color: selected
                ? '$action.main.tertiaryHover'
                : '$action.neutral.tertiaryHover',
            },
          },
          ':active': {
            '> div': {
              color: selected
                ? '$action.main.tertiaryPressed'
                : '$action.neutral.tertiaryPressed',
            },
            bg: '$action.neutral.tertiaryHover',
          },
        },
        buttonProps.csx
      )}
      {...compositeProps}
      {...buttonProps}
      onClick={handleOnClick}
      onKeyDown={handleOnKeyDown}
    >
      {children}
    </Button>
  )
})

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
