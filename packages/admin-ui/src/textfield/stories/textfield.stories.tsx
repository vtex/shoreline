import React, { useLayoutEffect, useRef, useState } from 'react'
import type { Meta } from '@storybook/react'

import { Stack } from '../../stack'
import { Textfield } from '../textfield'
import { IconCalendarBlank } from '@vtex/phosphor-icons'
import { Button } from '../../button'

export default {
  title: 'admin-ui-review/textfield',
} as Meta

export const Uncontrolled = () => {
  return (
    <Stack space="$l" csx={{ padding: '$s' }} fluid>
      <Textfield />
    </Stack>
  )
}

export const Controlled = () => {
  const [value, setValue] = useState<string>('')

  return (
    <Stack space="$l" csx={{ padding: '$s' }} fluid>
      <Textfield value={value} onChange={(e) => setValue(e.target.value)} />
      state: {value}
    </Stack>
  )
}

export const Terms = () => {
  return (
    <Stack space="$l" csx={{ padding: '$s' }} fluid>
      <Textfield prefix="https://" />
      <Textfield suffix=".com.br" />
      <Textfield prefix="https://" suffix=".com.br" />
      <Textfield prefix={<IconCalendarBlank />} />
      <Textfield
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
      <Textfield />
      <Textfield error />
      <Textfield disabled />
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
      <Textfield ref={ref} />
    </Stack>
  )
}
