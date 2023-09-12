import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'

import { Button } from '../button'
import { useMessageFormatter } from '../i18n'
import { messages } from './messages'
import { usePopoverContext } from './filter-popover-context'
import { Stack } from '../stack'
import { filterFooterTheme } from './filter.style'

export const FilterFooter = forwardRef(function FilterFooter(
  props: FilterFooterProps,
  ref: Ref<HTMLDivElement>
) {
  const { className = '', children, ...htmlProps } = props

  const { state } = usePopoverContext()

  const { onChange, onClear } = state

  const formatMessage = useMessageFormatter(messages)
  const { isScrollableLayout } = usePopoverContext()

  return (
    <div
      ref={ref}
      data-scrollable={isScrollableLayout}
      className={cx(filterFooterTheme, className)}
      {...htmlProps}
    >
      {children || (
        <Stack direction="row" space="$space-2">
          <Button variant="tertiary" onClick={onClear}>
            {formatMessage('clear')}
          </Button>
          <Button onClick={onChange}>{formatMessage('apply')}</Button>
        </Stack>
      )}
    </div>
  )
})

export type FilterFooterProps = ComponentPropsWithoutRef<'div'>
