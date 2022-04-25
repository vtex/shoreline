import React from 'react'
import { tag } from '@vtex/admin-ui-react'

export const SingleItemLabel = (props: { appliedItem: any }) => {
  return props.appliedItem ? (
    <>
      <span>:</span>
      <tag.span
        csx={{
          color: '$primary',
          marginLeft: '$s',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          maxWidth: '300px',
        }}
      >
        {props.appliedItem.label}
      </tag.span>
    </>
  ) : null
}
