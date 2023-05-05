import type { ComponentPropsWithoutRef, ReactNode, Ref } from 'react'
import React, { forwardRef } from 'react'

import { Label } from '../label'
import { Flex } from '../flex'
import { SegmentList, Segment } from '../segment'
import type { SegmentStateReturn } from '../segment'
import { dateFieldLabelTheme, dateFieldTheme } from './date-field.css'
import { cx } from '@vtex/admin-ui-core'

export const DateField = forwardRef(function DateField(
  props: DateFieldProps,
  ref: Ref<HTMLDivElement>
) {
  const {
    state,
    label,
    disclosure,
    tone = 'neutral',
    disabled = false,
    className = '',
    ...htmlProps
  } = props

  return (
    <div
      ref={ref}
      data-tone={tone}
      data-disabled={disabled}
      className={cx(dateFieldTheme, className)}
      {...htmlProps}
    >
      <Flex direction="column">
        <Label className={dateFieldLabelTheme}>{label}</Label>
        <SegmentList state={state}>
          {state.segments.map((segment, index) => (
            <Segment
              isDisabled={disabled}
              key={`segment-element-${index}`}
              segment={segment}
              state={state}
            />
          ))}
        </SegmentList>
      </Flex>
      {disclosure}
    </div>
  )
})

export interface DateFieldProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  state: SegmentStateReturn
  label: string
  disclosure?: ReactNode
  tone?: 'neutral' | 'critical'
  disabled?: boolean
}
