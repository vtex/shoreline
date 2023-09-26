import { csx, Button, Stack } from '@vtex/admin-ui'
import React from 'react'
import type { Meta } from '@storybook/react'

import { useFormState, Form } from '../../form'
import { Switch } from '../index'

export default {
  title: 'admin-ui-form/switch',
} as Meta

export const Basic = () => {
  const form = useFormState()

  return (
    <div>
      <Form onSubmit={(data) => console.log(data)} state={form}>
        <Stack space="$space-2">
          <Switch
            state={form}
            name="terms-of-service"
            label="I agree to the Terms of Service"
            helpText="You must select this option to use our services"
          />
          <Button className={csx({ marginLeft: '$space-1' })} type="submit">
            Submit
          </Button>
        </Stack>
      </Form>
    </div>
  )
}

export const DefaultValue = () => {
  const form = useFormState({
    defaultValues: {
      enabled: true,
    },
  })

  return (
    <div>
      <Form onSubmit={(data) => console.log(data)} state={form}>
        <Stack space="$space-2">
          <Switch
            state={form as any}
            name="enabled"
            label="Search enabled"
            helpText="Enables the search feature on the system"
          />
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
          <Switch
            state={form as any}
            name="terms-of-service"
            label="I agree to the Terms of Service"
            helpText="You must select this option to use our services"
            validation={{
              required: 'This is required',
            }}
          />
          <Button className={csx({ marginLeft: '$space-1' })} type="submit">
            Submit
          </Button>
        </Stack>
      </Form>
    </div>
  )
}
