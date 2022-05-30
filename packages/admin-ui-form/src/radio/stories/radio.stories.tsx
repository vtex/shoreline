import React from 'react'
import type { Meta } from '@storybook/react'
import { Box, Button, Stack, Radio } from '@vtex/admin-ui'

import { useFormState, Form } from '../../form'
import { RadioGroup } from '../index'

export default {
  title: 'admin-ui-form/radio',
} as Meta

export const Basic = () => {
  const form = useFormState()

  return (
    <Box>
      <Form onSubmit={(data) => console.log(data)} state={form}>
        <Stack space="$l">
          <RadioGroup label="Label" name="account" state={form}>
            <Radio
              label="Accounts are disabled"
              helpText="Customers will only be able to check out as guests"
              value="disabled"
            />
            <Radio
              label="Accounts are optional"
              helpText="Customers will be able to check out with a customer account or as a guest"
              value="optional"
            />
          </RadioGroup>
          <Button csx={{ marginLeft: '$s' }} type="submit">
            Submit
          </Button>
        </Stack>
      </Form>
    </Box>
  )
}

export const DefaultSelected = () => {
  const form = useFormState({
    defaultValues: {
      account: 'optional',
    },
  })

  return (
    <Box>
      <Form onSubmit={(data) => console.log(data)} state={form}>
        <Stack space="$l">
          <RadioGroup label="Label" name="account" state={form}>
            <Radio
              label="Accounts are disabled"
              helpText="Customers will only be able to check out as guests"
              value="disabled"
            />
            <Radio
              label="Accounts are optional"
              helpText="Customers will be able to check out with a customer account or as a guest"
              value="optional"
            />
          </RadioGroup>
          <Button csx={{ marginLeft: '$s' }} type="submit">
            Submit
          </Button>
        </Stack>
      </Form>
    </Box>
  )
}

export const Validation = () => {
  const form = useFormState()

  return (
    <Box>
      <Form onSubmit={(data) => console.log(data)} state={form}>
        <Stack space="$l">
          <RadioGroup
            validation={{
              required: 'This field is required',
            }}
            label="Label"
            name="account"
            state={form}
          >
            <Radio
              label="Accounts are disabled"
              helpText="Customers will only be able to check out as guests"
              value="disabled"
            />
            <Radio
              label="Accounts are optional"
              helpText="Customers will be able to check out with a customer account or as a guest"
              value="optional"
            />
          </RadioGroup>
          <Button csx={{ marginLeft: '$s' }} type="submit">
            Submit
          </Button>
        </Stack>
      </Form>
    </Box>
  )
}
