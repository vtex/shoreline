import React from 'react'
import { tag } from '@vtex/admin-ui-react'
import type { UseFilterMultipleReturn } from '.'
import type { AnyObject } from '..'

import * as style from './filter.style'

export const MultipleItemsLabel = (props: {
  appliedItems: AnyObject[]
  state: UseFilterMultipleReturn<any>
}) => {
  const {
    appliedItems,
    state: { getOptionLabel },
  } = props

  const separator = appliedItems.length > 1 ? ',' : ''
  const firstOptionLabel = getOptionLabel(appliedItems[0] || {}) || ''

  const firstSelectedItemLabel = `${firstOptionLabel}${separator}`

  const remainingSelectedItemsCount =
    appliedItems.length > 1 ? `+${appliedItems.length - 1}` : ''

  const appliedValuesLabel = appliedItems.length ? (
    <>
      <span>:</span>
      <tag.span csx={{ color: '$primary' }}>
        <tag.span csx={style.disclosureStatusLabel}>
          {firstSelectedItemLabel}
        </tag.span>
        {remainingSelectedItemsCount}
      </tag.span>
    </>
  ) : null

  return appliedValuesLabel
}
