import type { ReactNode } from 'react'
import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import { Label } from '../components/Label'
import { Flex } from '../components/Flex'
import * as style from './date-field.style'
import { SegmentList, Segment } from '../segment'
import type { SegmentStateReturn } from '../segment'

export const DateField = createComponent<'div', DateFieldOptions>((props) => {
  const {
    state,
    label,
    disclosure,
    invalid = false,
    disabled = false,
    ...htmlProps
  } = props

  return useElement('div', {
    ...htmlProps,
    baseStyle: {
      ...style.dateField,
      ...style.variants({
        invalid,
        disabled,
      }),
    },
    children: (
      <>
        <Flex direction="column">
          <Label csx={style.label}>{label}</Label>
          <SegmentList state={state}>
            {state.segments.map((segment, i) => (
              <Segment
                isDisabled={disabled}
                key={i}
                segment={segment}
                state={state}
              />
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
  invalid?: boolean
  disabled?: boolean
}
