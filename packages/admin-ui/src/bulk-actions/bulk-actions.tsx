import type { ReactNode } from 'react'
import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import type { BulkActionsState } from './bulk-actions.state'
import { Inline } from '../inline'
import { Button } from '../button'
import { Text } from '../components/Text'

import * as style from './bulk-actions.style'

interface BulkActionsOptions {
  state: BulkActionsState<any>
  children?: ReactNode
}

export const BulkActions = createComponent<'div', BulkActionsOptions>(
  (props) => {
    const { children, state, ...restProps } = props

    const { allSelected, totalItems, selectedItems, selectAll } = state

    return useElement('div', {
      ...restProps,
      baseStyle: style.baseline,
      children: (
        <Inline hSpace="$2xl" spaceInside csx={style.container}>
          <Inline hSpace="$m" spaceInside csx={style.innerContainer}>
            <Text tone="secondary">
              {allSelected ? totalItems : selectedItems.length} of {totalItems}{' '}
              selected
            </Text>

            <Button
              variant="neutralTertiary"
              onClick={selectAll}
              disabled={allSelected}
            >
              Select All
            </Button>
          </Inline>
          <Inline hSpace="$m" spaceInside csx={style.innerContainer}>
            {children}
          </Inline>
        </Inline>
      ),
    })
  }
)
