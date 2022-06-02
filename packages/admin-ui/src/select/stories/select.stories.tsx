import React, { useState, useRef, useLayoutEffect } from 'react'
import type { Meta, Story } from '@storybook/react'

import { Select } from '../index'
import type { SelectProps } from '../select'
import { Box } from '../../box'
import { Stack } from '../../stack'
import type { Locales } from '../../i18n'
import { I18nProvider, locales } from '../../i18n'
import { Button } from '../../button'

export default {
  title: 'admin-ui-review/select',
  component: Select,
  argTypes: {
    locale: {
      options: locales,
      control: { type: 'select' },
    },
  },
} as Meta

interface PlaygroundProps extends SelectProps {
  locale: Locales
}

export const Playground: Story<PlaygroundProps> = (args) => {
  const [value, setValue] = useState('')

  return (
    <I18nProvider locale={args.locale}>
      <Box csx={{ width: '288px' }}>
        <Select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          {...args}
        >
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </Select>
      </Box>
    </I18nProvider>
  )
}

Playground.args = {
  label: 'Label',
  optional: false,
  helpText: 'Help text',
  error: false,
  errorText: 'Error text',
  csx: {
    margin: '$l',
  },
  disabled: false,
  locale: 'en-US',
}

export const UIStates: Story<SelectProps> = () => {
  const [value, setValue] = useState('')

  return (
    <Stack space="$3xl" csx={{ width: '288px', margin: '$m' }} fluid>
      <Select
        value={value}
        helpText="Help text"
        errorText="Error Text"
        onChange={(e) => setValue(e.target.value)}
      >
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </Select>
      <Select
        value={value}
        helpText="Help text"
        errorText="Error Text"
        error
        onChange={(e) => setValue(e.target.value)}
      >
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </Select>
      <Select
        value={value}
        helpText="Help text"
        errorText="Error Text"
        disabled
        error
        onChange={(e) => setValue(e.target.value)}
      >
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </Select>
    </Stack>
  )
}

export const ForwardRef: Story<SelectProps> = () => {
  const ref = useRef<HTMLSelectElement>(null)

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.focus()
    }
  }, [])

  return (
    <Stack space="$3xl" csx={{ width: '288px', margin: '$m' }} fluid>
      <Select ref={ref}>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </Select>
      <Button
        onClick={() => {
          if (ref.current) {
            ref.current.value = 'Option 2'
          }
        }}
      >
        Change value to Option 2
      </Button>
    </Stack>
  )
}
