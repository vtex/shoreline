import type { ComponentPropsWithoutRef, ReactNode, Ref } from 'react'
import React, { forwardRef } from 'react'

import type { BulkActionsState } from './bulk-actions.state'
import { Inline } from '../inline'
import { Button } from '../button'
import { Text } from '../text'
import { Bleed } from '../bleed'
import { useMessageFormatter } from '../i18n'
import { messages } from './messages'
import {
  baselineTheme,
  containerTheme,
  innerContainerTheme,
} from './bulk-actions.style'
import { cx } from '@vtex/admin-ui-core'

interface BulkActionsOptions extends ComponentPropsWithoutRef<'div'> {
  state: BulkActionsState<any>
  children?: ReactNode
}

export const BulkActions = forwardRef(
  (props: BulkActionsOptions, ref: Ref<HTMLDivElement>) => {
    const { children, state, className = '', ...restProps } = props
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

    return (
      <div className={cx(baselineTheme, className)} ref={ref} {...restProps}>
        {isVisible ? (
          <Inline hSpace="$space-7" spaceInside className={containerTheme}>
            <Inline
              hSpace="$space-2"
              spaceInside
              align="center"
              className={innerContainerTheme}
            >
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
              <Inline
                hSpace="$space-2"
                spaceInside
                className={innerContainerTheme}
              >
                {children}
              </Inline>
            </Bleed>
          </Inline>
        ) : null}
      </div>
    )
  }
)
