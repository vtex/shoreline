import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'

import { Stack } from '../../stack'
import { cx } from '@vtex/admin-ui-core'
import { headerTheme, stackContainerTheme } from './data-view.style'

/**
 * Organizes the DataView header
 * @example
 * const view = useDataViewState()
 *
 * <DataView state={view}>
 *    <DataViewHeader>
 *      {content}
 *    </DataViewHeader>
 * </DataView>
 */
export const DataViewHeader = forwardRef(function DataViewHeader(
  props: DataViewHeaderProps,
  ref: Ref<HTMLDivElement>
) {
  const { children, className = '', ...htmlProps } = props

  return (
    <div ref={ref} className={cx(headerTheme, className)} {...htmlProps}>
      <Stack space="$space-4" className={stackContainerTheme}>
        {children}
      </Stack>
    </div>
  )
})

export type DataViewHeaderProps = ComponentPropsWithoutRef<'div'>
