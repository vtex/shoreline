import { csx, Button, Stack, Radio } from '@vtex/admin-ui'
import React from 'react'
import type { Meta } from '@storybook/react'

import { useFormState, Form } from '../../form'
import { RadioGroup } from '../index'

export default {
  title: 'admin-ui-form/radio',
} as Meta

export const Basic = () => {
  const form = useFormState()

  return (
    <div>
      <Form onSubmit={(data) => console.log(data)} state={form}>
        <Stack space="$space-2">
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
          <Button className={csx({ marginLeft: '$space-1' })} type="submit">
            Submit
          </Button>
        </Stack>
      </Form>
    </div>
  )
}

export const DefaultSelected = () => {
  const form = useFormState({
    defaultValues: {
      account: 'optional',
    },
  })

  return (
    <div>
      <Form onSubmit={(data) => console.log(data)} state={form}>
        <Stack space="$space-2">
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
          <Button className={csx({ marginLeft: '$space-1' })} type="submit">
            Submit
          </Button>
        </Stack>
      </Form>
    </div>
  )
}

export const Validation = () => {
  const form = useFormState()

  return (
    <div>
      <Form onSubmit={(data) => console.log(data)} state={form}>
        <Stack space="$space-2">
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
          <Button className={csx({ marginLeft: '$space-1' })} type="submit">
            Submit
          </Button>
        </Stack>
      </Form>
    </div>
  )
}
