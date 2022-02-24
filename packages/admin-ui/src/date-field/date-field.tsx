import type { ReactNode } from 'react'
import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import { Label } from '../components/Label'
import { Flex } from '../components/Flex'
import type { SegmentStateReturn } from './date-field-state'
import * as style from './date-field.style'
import { SegmentList } from './segment-list'
import { Segment } from './segment'

export const DateField = createComponent<'div', DateFieldOptions>((props) => {
  const { state, label, disclosure, ...htmlProps } = props

  return useElement('div', {
    ...htmlProps,
    baseStyle: style.dateField,
    children: (
      <>
        <Flex direction="column">
          <Label csx={style.label}>{label}</Label>
          <SegmentList state={state}>
            {state.segments.map((segment, i) => (
              <Segment key={i} segment={segment} state={state} />
            ))}
          </SegmentList>
        </Flex>
        {disclosure}
      </>
    ),
  })
})

export interface DateFieldOptions {
  state: SegmentStateReturn
  label: string
  disclosure?: ReactNode
}
