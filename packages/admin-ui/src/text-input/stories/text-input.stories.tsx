import React, { useLayoutEffect, useRef, useState } from 'react'
import type { Meta } from '@storybook/react'

import { Stack } from '../../stack'
import { TextInput } from '../text-input'
import { IconCalendarBlank } from '@vtex/phosphor-icons'
import { Button } from '../../button'

export default {
  title: 'admin-ui-review/text-input',
} as Meta

export const Uncontrolled = () => {
  return (
    <Stack space="$l" csx={{ padding: '$s' }} fluid>
      <TextInput />
    </Stack>
  )
}

export const Controlled = () => {
  const [value, setValue] = useState<string>('')

  return (
    <Stack space="$l" csx={{ padding: '$s' }} fluid>
      <TextInput value={value} onChange={(e) => setValue(e.target.value)} />
      state: {value}
    </Stack>
  )
}

export const Terms = () => {
  return (
    <Stack space="$l" csx={{ padding: '$s' }} fluid>
      <TextInput prefix="https://" />
      <TextInput suffix=".com.br" />
      <TextInput prefix="https://" suffix=".com.br" />
      <TextInput prefix={<IconCalendarBlank />} />
      <TextInput
        suffix={
          <Button variant="tertiary" bleedY bleedX>
            Action
          </Button>
        }
      />
    </Stack>
  )
}

export const UIStates = () => {
  return (
    <Stack space="$l" csx={{ padding: '$s' }} fluid>
      <TextInput />
      <TextInput error />
      <TextInput disabled />
    </Stack>
  )
}

export const ForwardRef = () => {
  const ref = useRef<HTMLInputElement>(null)

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.value = 'Text'
      ref.current.focus()
    }
  }, [])

  return (
    <Stack space="$l" csx={{ padding: '$s' }} fluid>
      <TextInput ref={ref} />
    </Stack>
  )
}
