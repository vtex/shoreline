import { cx } from '@vtex/admin-ui-core'
import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { headerActionsTheme } from './data-view.style'

/**
 * Organizes the DataView actions
 * @example
 * const view = useDataViewState()
 *
 * <DataView state={view}>
 *    <DataViewHeader>
 *      <DataViewActions>
 *        <Button>...</Button>
 *        <Pagination />
 *      </DataViewActions>
 *    </DataViewHeader>
 * </DataView>
 */
export const DataViewActions = forwardRef(function DataViewActions(
  props: DataViewActionsProps,
  ref: Ref<HTMLDivElement>
) {
  const { className = '', ...htmlProps } = props

  return (
    <div
      ref={ref}
      className={cx(headerActionsTheme, className)}
      {...htmlProps}
    />
  )
})

export type DataViewActionsProps = ComponentPropsWithoutRef<'div'>
