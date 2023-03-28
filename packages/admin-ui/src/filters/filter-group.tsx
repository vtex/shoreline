import type { ComponentPropsWithoutRef, ReactNode, Ref } from 'react'
import React, { forwardRef } from 'react'
import { csx, cx } from '@vtex/admin-ui-core'

import { Button } from '../button'
import { useMessageFormatter } from '../i18n'
import { messages } from './filter.i18n'
import { filterGroupTheme } from './filter.css'

export const FilterGroup = forwardRef(function FIlterGroup(
  props: FilterGroupProps,
  ref: Ref<HTMLDivElement>
) {
  const { children, state, className = '', ...htmlProps } = props

  const formatMessage = useMessageFormatter(messages.actions)

  return (
    <div
      ref={ref}
      role="group"
      className={cx(filterGroupTheme, className)}
      {...htmlProps}
    >
      {children}
      <Button
        onClick={state.onClear}
        variant="neutralTertiary"
        className={csx({ marginLeft: '$space-2' })}
        hidden={!state.hasFilterApplied}
      >
        {formatMessage('clearAll')}
      </Button>
    </div>
  )
})

export interface FilterGroupProps extends ComponentPropsWithoutRef<'div'> {
  children?: ReactNode
  state: { onClear: () => void; hasFilterApplied: boolean }
}
