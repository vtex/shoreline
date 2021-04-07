import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'
import { Flex, Box } from 'theme-ui'

import { IconMock } from '../Button/IconMock' // TODO Move to a utils?
import { Checkbox, useCheckboxState } from '../Checkbox'
import Input, { InputProps } from './index'

export default {
  title: 'beta/Input',
  component: Input,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['regular', 'large'],
      },
    },
  },
} as Meta

const Template: Story<InputProps> = (args: InputProps) => {
  const { prefix, suffix, ...restArgs } = args
  const [value, setValue] = useState('')

  return (
    <Box sx={{ maxWidth: '25rem' }}>
      <Input
        value={value}
        onChange={(e: any) => setValue(e.target.value)}
        {...restArgs}
        prefix={prefix && <IconMock />}
        suffix={suffix && <IconMock />}
      />
    </Box>
  )
}

export const Playground = Template.bind({})
Playground.args = {
  label: 'Company name',
  helpMessage: 'I could go on and on and I will.',
  charLimit: 32,
  id: 'company-name',
  error: false,
  readOnly: false,
  disabled: false,
  prefix: false,
  suffix: false,
  darkMode: false,
}

export const States = () => {
  const checkbox = useCheckboxState({ state: false })
  const [valueDefault, setValueDefault] = useState('')
  const [valueFilled, setValueFilled] = useState("I'm on the run with you")
  const props = {
    prefix: <IconMock />,
    suffix: <IconMock />,
    darkMode: checkbox.state as boolean,
  }

  return (
    <Box>
      <Checkbox {...checkbox} label="Dark mode" />
      <Flex
        sx={{
          backgroundColor: checkbox.state ? 'secondary.base' : 'background',
          flexDirection: ['column', 'column', 'column', 'row'],
          marginTop: 3,
          padding: 3,
          width: 'fit-content',
        }}
      >
        <Flex sx={{ flexDirection: 'column', maxWidth: '25rem', pr: 5 }}>
          <Input
            {...props}
            id="default-empty"
            label="Idle"
            helpMessage="Default and empty input."
            value={valueDefault}
            onChange={(e: any) => setValueDefault(e.target.value)}
          />
          <Input
            {...props}
            id="disabled-empty"
            label="Disabled"
            disabled
            helpMessage="Disabled and empty input."
          />
          <Input
            {...props}
            id="readonly-empty"
            label="Readonly"
            readOnly
            helpMessage="Readonly and empty input."
          />
          <Input
            {...props}
            id="error-empty"
            label="Error"
            error
            helpMessage="Error and empty input."
            value={valueDefault}
            onChange={(e: any) => setValueDefault(e.target.value)}
          />
        </Flex>
        <Flex sx={{ flexDirection: 'column', maxWidth: '25rem' }}>
          <Input
            {...props}
            id="default-filled"
            label="Filled"
            helpMessage="Idle and filled input."
            value={valueFilled}
            onChange={(e: any) => setValueFilled(e.target.value)}
          />
          <Input
            {...props}
            id="disabled-filled"
            label="Disabled"
            disabled
            value="Take me to the lakes"
            helpMessage="Disabled and filled input."
          />
          <Input
            {...props}
            id="readonly-filled"
            label="Readonly"
            readOnly
            value="Can't change your mood"
            helpMessage="Readonly and filled input."
          />
          <Input
            {...props}
            id="error-filled"
            label="Error"
            error
            helpMessage="Error and filled input."
            value={valueFilled}
            onChange={(e: any) => setValueFilled(e.target.value)}
          />
        </Flex>
      </Flex>
    </Box>
  )
}

export const Sizes = () => {
  const [value, setValue] = useState('')

  return (
    <Box sx={{ maxWidth: '25rem' }}>
      <Input
        value={value}
        onChange={(e: any) => setValue(e.target.value)}
        id="regular"
        size="regular"
        label="Regular"
        helpMessage="This is a regular input."
      />
      <Input
        id="large"
        size="large"
        label="Large"
        helpMessage="This is a large input."
      />
    </Box>
  )
}

export const Contents = () => {
  const [value, setValue] = useState('')

  return (
    <Box sx={{ maxWidth: '25rem' }}>
      <Input
        value={value}
        onChange={(e: any) => setValue(e.target.value)}
        id="text-only"
        label="Text only"
        helpMessage="This is a basic input."
      />
      <Input
        value={value}
        onChange={(e: any) => setValue(e.target.value)}
        id="text-suffix"
        label="Suffix"
        helpMessage="This input has a suffix."
        suffix={<IconMock />}
      />
      <Input
        value={value}
        onChange={(e: any) => setValue(e.target.value)}
        id="text-prefix"
        label="Prefix"
        helpMessage="This input has a prefix."
        prefix={<IconMock />}
      />
      <Input
        value={value}
        onChange={(e: any) => setValue(e.target.value)}
        id="text-prefix-suffix"
        label="Prefix + Suffix"
        helpMessage="This input has a prefix and a suffix."
        prefix={<IconMock />}
        suffix={<IconMock />}
      />
    </Box>
  )
}
