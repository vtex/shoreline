import React, { useRef, useState } from 'react'
import type { Meta } from '@storybook/react'

import { Stack } from '../../stack'
import { TextArea } from '../text-area'

export default {
  title: 'admin-ui-review/text-area',
} as Meta

export const Uncontrolled = () => {
  const ref = useRef<HTMLTextAreaElement>(null)

  return (
    <Stack space="$l" csx={{ padding: '$s' }} fluid>
      <TextArea label="Uncontrolled" charLimit={120} ref={ref} />
      <TextArea label="Error text" errorText="Error text" error />
    </Stack>
  )
}

export const Controlled = () => {
  const [value, setValue] = useState<string>('')

  return (
    <Stack space="$l" csx={{ padding: '$s' }} fluid>
      <TextArea
        label="Controlled"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        helpText="help"
        errorText="Error text"
        error
        charLimit={120}
      />
    </Stack>
  )
}
