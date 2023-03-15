import React, { useLayoutEffect, useRef, useState } from 'react'
import type { Meta } from '@storybook/react'

import { Stack } from '../../stack'
import { TextArea } from '../text-area'
import { Box } from '../..'
import { csx } from '@vtex/admin-ui-core'

export default {
  title: 'admin-ui-review/text-area',
} as Meta

export const Uncontrolled = () => {
  return (
    <Box csx={{ padding: '$space-2 $space-3', width: '300px' }}>
      <TextArea label="Uncontrolled" />
    </Box>
  )
}

export const Controlled = () => {
  const [value, setValue] = useState<string>('')

  return (
    <Stack space="$space-2" className={csx({ padding: '$space-2 $space-3' })}>
      <TextArea
        label="Controlled"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        helpText="help"
        errorText="Error text"
        error
      />
    </Stack>
  )
}

export const States = () => {
  return (
    <Stack space="$space-2" className={csx({ padding: '$space-2 $space-3' })}>
      <TextArea label="Plain" />
      <TextArea
        label="With Error and help"
        id="error-input"
        errorText="Error text"
        helpText="help text"
        error
      />
      <TextArea
        label="With Help text and counter"
        id="help-input"
        helpText="help text"
        maxLength={120}
      />
      <TextArea
        label="With Error, help and counter"
        id="error-counter-input"
        errorText="Error text"
        helpText="help text"
        maxLength={120}
        error
      />
      <TextArea label="disabled" disabled />
    </Stack>
  )
}

export const ForwardRef = () => {
  const ref = useRef<HTMLTextAreaElement>(null)

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.value = 'Text'
      ref.current.focus()
    }
  }, [])

  return (
    <Stack space="$space-2" className={csx({ padding: '$space-2 $space-3' })}>
      <TextArea ref={ref} />
    </Stack>
  )
}
