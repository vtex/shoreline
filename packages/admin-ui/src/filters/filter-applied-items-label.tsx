import React from 'react'
import type { AnyObject } from '@vtex/admin-ui-util'
import {
  appliedItemsLabelTheme,
  disclosureStatusLabelTheme,
} from './filter.style'

export const AppliedItemsLabel = (props: AppliedItemsLabelProps) => {
  const { appliedItems } = props

  const separator = appliedItems.length > 1 ? ',' : ''
  const firstOptionLabel = appliedItems[0]?.label || ''

  const firstSelectedItemLabel = `${firstOptionLabel}${separator}`

  const remainingSelectedItemsCount =
    appliedItems.length > 1 ? `+${appliedItems.length - 1}` : ''

  const appliedValuesLabel = appliedItems.length ? (
    <>
      <span>:</span>
      <span className={appliedItemsLabelTheme}>
        <span className={disclosureStatusLabelTheme}>
          {firstSelectedItemLabel}
        </span>
        {remainingSelectedItemsCount}
      </span>
    </>
  ) : null

  return appliedValuesLabel
}

interface AppliedItemsLabelProps {
  appliedItems: AnyObject[]
}
