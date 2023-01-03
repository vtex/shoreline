import React from 'react'
import type { AnyObject } from '@vtex/admin-ui-util'

import { Box } from '../box'
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
      <Box as="span" csx={{ color: '$primary' }}>
        <Box
          as="span"
          csx={{ ...style.disclosureStatusLabel, marginX: '$space-1' }}
        >
          {firstSelectedItemLabel}
        </Box>
        {remainingSelectedItemsCount}
      </Box>
    </>
  ) : null

  return appliedValuesLabel
}
