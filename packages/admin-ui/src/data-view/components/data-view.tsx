import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'

import type { DataViewState } from '../data-view.state'
import { DataViewStatus } from './data-view-status'
import { Stack } from '../../stack'
import { cx } from '@vtex/admin-ui-core'
import { dataViewTheme, stackContainerTheme } from './data-view.css'

/**
 * Layout to organize Tables and its controllers
 * @example
 * const view = useDataViewState()
 *
 * <DataView state={view} />
 */
export const DataView = forwardRef(function DataView(
  props: DataViewProps,
  ref: Ref<HTMLDivElement>
) {
  const { children, className = '', state, ...htmlProps } = props

  const isEmpty = state.status === 'empty'

  return (
    <div ref={ref} className={cx(dataViewTheme, className)} {...htmlProps}>
      <Stack space="$space-6" className={stackContainerTheme}>
        {isEmpty ? null : children}
        <DataViewStatus state={state} />
      </Stack>
    </div>
  )
})

export type DataViewProps = ComponentPropsWithoutRef<'div'> & {
  state: DataViewState
}
