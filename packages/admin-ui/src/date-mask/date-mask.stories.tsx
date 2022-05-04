import React from 'react'
import type { Meta } from '@storybook/react'

import { Input } from '../components/Input'

import { useDateMask } from './use-input-mask'
import { Box } from '../components/Box'

export default {
  title: 'admin-ui/InputMask',
} as Meta

export function Test() {
  const { getInputProps, getDateObject } = useDateMask()

  const dateObject = getDateObject()

  return (
    <Box
      csx={{
        width: 256,
      }}
    >
      <Input id="date" label="Date" {...getInputProps()} />
      <div>
        day: {dateObject.day}, month: {dateObject.month}, year:{' '}
        {dateObject.year}
      </div>
    </Box>
  )
}
