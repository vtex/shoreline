import React, { useState, ChangeEvent } from 'react'
import { Story, Meta } from '@storybook/react'
import { Checkbox, useCheckboxState } from '../Checkbox'
import { Box } from 'theme-ui'

import { Select, SelectProps } from '.'

export default {
  title: 'beta/Select',
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['regular', 'large'],
      },
    },
    disabled: { control: { type: 'boolean' } },
    readOnly: { control: { type: 'boolean' } },
    error: { control: { type: 'boolean' } },
  },
} as Meta

const Template: Story<SelectProps> = (props: SelectProps) => {
  const [value, setValue] = useState('')

  const onChangeSelect = (e: ChangeEvent<HTMLSelectElement>) =>
    setValue(e.target.value)

  return (
    <Box sx={{ bg: 'white', width: '100%', p: 5 }}>
      <Select {...props} id="options" onChange={onChangeSelect} value={value}>
        <Select.Option disabled value="" />
        <Select.Option value="carrefour">Carrefour</Select.Option>
        <Select.Option value="coca-cola">Coca Cola</Select.Option>
        <Select.Option value="motorolla">Motorolla</Select.Option>
      </Select>
    </Box>
  )
}

export const Playground = Template.bind({})
Playground.args = {
  label: 'Company name',
  helpMessage: 'Select your company',
}

export const States = () => {
  const [value, setValue] = useState('')
  const checkbox = useCheckboxState({ state: false })

  const onChangeSelect = (e: ChangeEvent<HTMLSelectElement>) =>
    setValue(e.target.value)

  return (
    <Box sx={{ bg: 'white', p: 5 }}>
      <Checkbox {...checkbox} label="Dark mode" />

      <Box
        sx={{
          backgroundColor: checkbox.state ? 'secondary.base' : 'white',
          flexDirection: ['column', 'column', 'column', 'row'],
          marginTop: 3,
          padding: 5,
        }}
      >
        <Select
          id="default"
          value={value}
          onChange={onChangeSelect}
          label="Default"
          helpMessage="This is a default select."
          darkMode={checkbox.state as boolean}
        >
          <Select.Option disabled value="" />
          <Select.Option value="carrefour">Carrefour</Select.Option>
          <Select.Option value="coca-cola">Coca Cola</Select.Option>
          <Select.Option value="motorolla">Motorolla</Select.Option>
        </Select>
        <Select
          id="error"
          value={value}
          onChange={onChangeSelect}
          label="Error"
          helpMessage="This is a select with error."
          sx={{ marginTop: 5 }}
          darkMode={checkbox.state as boolean}
          error
        >
          <Select.Option disabled value="" />
          <Select.Option value="carrefour">Carrefour</Select.Option>
          <Select.Option value="coca-cola">Coca Cola</Select.Option>
          <Select.Option value="motorolla">Motorolla</Select.Option>
        </Select>
        <Select
          id="filled"
          value={value !== '' ? value : 'carrefour'}
          onChange={onChangeSelect}
          label="Filled"
          helpMessage="This is a filled select."
          darkMode={checkbox.state as boolean}
          sx={{ marginTop: 5 }}
        >
          <Select.Option disabled value="" />
          <Select.Option value="carrefour">Carrefour</Select.Option>
          <Select.Option value="coca-cola">Coca Cola</Select.Option>
          <Select.Option value="motorolla">Motorolla</Select.Option>
        </Select>
        <Select
          id="readonly"
          value="carrefour"
          label="Readonly"
          helpMessage="This is a readonly select."
          darkMode={checkbox.state as boolean}
          sx={{ marginTop: 5 }}
          readOnly
        >
          <Select.Option disabled value="" />
          <Select.Option value="carrefour">Carrefour</Select.Option>
          <Select.Option value="coca-cola">Coca Cola</Select.Option>
          <Select.Option value="motorolla">Motorolla</Select.Option>
        </Select>
        <Select
          id="disabled"
          value=""
          label="Disabled"
          helpMessage="This is a disabled select."
          darkMode={checkbox.state as boolean}
          sx={{ marginTop: 5 }}
          disabled
        >
          <Select.Option disabled value="" />
          <Select.Option value="carrefour">Carrefour</Select.Option>
          <Select.Option value="coca-cola">Coca Cola</Select.Option>
          <Select.Option value="motorolla">Motorolla</Select.Option>
        </Select>
      </Box>
    </Box>
  )
}

export const Sizes = () => {
  const [value, setValue] = useState<string | number>(1)

  const onChangeSelect = (e: ChangeEvent<HTMLSelectElement>) =>
    setValue(e.target.value)

  return (
    <Box sx={{ bg: 'white', p: 5 }}>
      <Select
        id="regular"
        value={value}
        onChange={onChangeSelect}
        label="Regular"
        size="regular"
        helpMessage="This is a regular select."
        sx={{ marginTop: 5 }}
      >
        <Select.Option disabled value="" />
        <Select.Option value={1}>1</Select.Option>
        <Select.Option value={2}>2</Select.Option>
        <Select.Option value={3}>3</Select.Option>
      </Select>
      <Select
        id="regular"
        value={value}
        onChange={onChangeSelect}
        label="Large"
        size="large"
        helpMessage="This is a large select."
        sx={{ marginTop: 5 }}
      >
        <Select.Option disabled value="" />
        <Select.Option value={1}>1</Select.Option>
        <Select.Option value={2}>2</Select.Option>
        <Select.Option value={3}>3</Select.Option>
      </Select>
    </Box>
  )
}
