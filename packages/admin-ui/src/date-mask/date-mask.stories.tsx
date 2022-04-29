import React, { useState } from 'react'
import type { Meta } from '@storybook/react'

import { useDateMask } from './use-input-mask'

export default {
  title: 'admin-ui/InputMask',
} as Meta

export function Test() {
  const [value, setValue] = useState('')
  const { getInputProps, getDateObject } = useDateMask()

  const dateObject = getDateObject()

  return (
    <div>
      <input
        {...getInputProps({
          value,
          onChange: (e) => setValue(e.currentTarget.value),
        })}
      />
      value: {value}
      <div>
        day: {dateObject.day}, month: {dateObject.month}, year:{' '}
        {dateObject.year}
      </div>
    </div>
  )
}
