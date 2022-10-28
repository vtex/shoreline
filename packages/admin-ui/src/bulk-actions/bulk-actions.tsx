import type { ReactNode } from 'react'
import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import type { BulkActionsState } from './bulk-actions.state'
import { Inline } from '../inline'
import { Button } from '../button'
import { Text } from '../components/Text'
import { Bleed } from '../bleed'
import { useMessageFormatter } from '../i18n'
import { messages } from './bulk-actions.i18n'
import * as style from './bulk-actions.style'

interface BulkActionsOptions {
  state: BulkActionsState<any>
  children?: ReactNode
}

export const BulkActions = createComponent<'div', BulkActionsOptions>(
  (props) => {
    const { children, state, ...restProps } = props
    const formatMessage = useMessageFormatter(messages)

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
        <Inline hSpace="$space-7" spaceInside csx={style.container}>
          <Inline hSpace="$space-2" spaceInside csx={style.innerContainer}>
            <Text tone="secondary">
              {formatMessage('selected', {
                current: allSelected ? totalItems : getSelectedIds().length,
                total: totalItems,
              })}
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
              {allSelected
                ? formatMessage('deselectAll')
                : formatMessage('selectAll')}
            </Button>
          </Inline>
          <Bleed right="$space-3">
            <Inline hSpace="$space-2" spaceInside csx={style.innerContainer}>
              {children}
            </Inline>
          </Bleed>
        </Inline>
      ) : null,
    });
  }
)
