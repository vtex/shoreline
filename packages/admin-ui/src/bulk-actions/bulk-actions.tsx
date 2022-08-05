import type { ReactNode } from 'react'
import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import type { BulkActionsState } from './bulk-actions.state'
import { Inline } from '../inline'
import { Button } from '../button'
import { Text } from '../components/Text'
import { Bleed } from '../bleed'
import * as style from './bulk-actions.style'

interface BulkActionsOptions {
  state: BulkActionsState<any>
  children?: ReactNode
}

export const BulkActions = createComponent<'div', BulkActionsOptions>(
  (props) => {
    const { children, state, ...restProps } = props

    const {
      allSelected,
      totalItems,
      getSelectedIds,
      setAllSelected,
      setSelectedItemsIds,
      setRoot,
      isVisible,
    } = state

    if (!isVisible) {
      return null
    }

    return useElement('div', {
      ...restProps,
      baseStyle: style.baseline,
      children: isVisible ? (
        <Inline hSpace="$2xl" spaceInside csx={style.container}>
          <Inline hSpace="$m" spaceInside csx={style.innerContainer}>
            <Text tone="secondary">
              {allSelected ? totalItems : getSelectedIds().length} of{' '}
              {totalItems} selected
            </Text>

            <Button
              variant="neutralTertiary"
              onClick={() => {
                if (allSelected) {
                  setRoot(false)
                  setSelectedItemsIds([])
                }

                setAllSelected((prev) => !prev)
              }}
            >
              {allSelected ? 'Deselect All' : 'Select All'}
            </Button>
          </Inline>
          <Bleed right="$l">
            <Inline hSpace="$m" spaceInside csx={style.innerContainer}>
              {children}
            </Inline>
          </Bleed>
        </Inline>
      ) : null,
    })
  }
)
