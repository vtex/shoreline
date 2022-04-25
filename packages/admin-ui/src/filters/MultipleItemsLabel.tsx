import React from 'react'
import { tag } from '@vtex/admin-ui-react'

export const MultipleItemsLabel = (props: { appliedItems: any[] }) => {
  const { appliedItems } = props

  const firstSelectedItemLabel =
    appliedItems.length > 1
      ? `${appliedItems[0]?.label},`
      : `${appliedItems[0]?.label}` // no comma in this case

  const remainingSelectedItemsCount =
    appliedItems.length > 1 && `+${appliedItems.length - 1}`

  const appliedValuesLabel = appliedItems.length ? (
    <>
      <span>:</span>
      <tag.span csx={{ color: '$primary' }}>
        <tag.span
          csx={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            maxWidth: '300px',
            marginX: '$s',
          }}
        >
          {firstSelectedItemLabel}
        </tag.span>
        {remainingSelectedItemsCount}
      </tag.span>
    </>
  ) : null

  return appliedValuesLabel
}
