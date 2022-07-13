import React from 'react'
import { tag } from '@vtex/admin-ui-react'
import type { AnyObject } from '@vtex/admin-ui-util'

import * as style from './filter.style'

export const AppliedItemsLabel = (props: { appliedItems: AnyObject[] }) => {
  const { appliedItems } = props

  const separator = appliedItems.length > 1 ? ',' : ''
  const firstOptionLabel = appliedItems[0]?.label || ''

  const firstSelectedItemLabel = `${firstOptionLabel}${separator}`

  const remainingSelectedItemsCount =
    appliedItems.length > 1 ? `+${appliedItems.length - 1}` : ''

  const appliedValuesLabel = appliedItems.length ? (
    <>
      <span>:</span>
      <tag.span csx={{ color: '$primary' }}>
        <tag.span csx={{ ...style.disclosureStatusLabel, marginX: '$s' }}>
          {firstSelectedItemLabel}
        </tag.span>
        {remainingSelectedItemsCount}
      </tag.span>
    </>
  ) : null

  return appliedValuesLabel
}
