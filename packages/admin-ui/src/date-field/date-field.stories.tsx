import React from 'react'

import type { Meta } from '@storybook/react'

import type { SegmentInitialState } from './index'
import { DateField, DateFieldSegment, useDateFieldState } from './index'

export default {
  title: 'admin-ui/DateField',
} as Meta

const SegmentedInput: React.FC<SegmentInitialState> = (props) => {
  const state = useDateFieldState(props)

  return (
    <div>
      <DateField state={state}>
        {state.segments.map((segment, i) => (
          <DateFieldSegment key={i} segment={segment} state={state} />
        ))}
      </DateField>
    </div>
  )
}

export const Basic = () => {
  return <SegmentedInput />
}
