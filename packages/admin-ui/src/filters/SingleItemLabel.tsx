import React from 'react'
import { tag } from '@vtex/admin-ui-react'
import type { UseFilterStateReturn } from '.'
import type { AnyObject } from '..'
import * as style from './filter.style'

export const SingleItemLabel = (props: {
  appliedItem: AnyObject
  state: UseFilterStateReturn<any>
}) => {
  const { state, appliedItem } = props

  return props.appliedItem ? (
    <>
      <span>:</span>
      <tag.span csx={style.disclosureStatusLabel}>
        {state.getOptionLabel(appliedItem)}
      </tag.span>
    </>
  ) : null
}
