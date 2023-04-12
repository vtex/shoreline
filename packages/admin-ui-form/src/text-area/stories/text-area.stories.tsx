import { csx } from '@vtex/admin-ui-core'
import React from 'react'
import type { Meta } from '@storybook/react'
import { Button, Inline, Stack } from '@vtex/admin-ui'

import { useFormState, Form } from '../../form'
import { TextArea } from '../index'

export default {
  title: 'admin-ui-form/text-area',
} as Meta

export const Basic = () => {
  const form = useFormState()

  return (
    <div>
      <Form onSubmit={(data) => console.log(data)} state={form}>
        <Stack space="$space-2">
          <TextArea label="Address" name="address" state={form} />
          <TextArea label="About yourself" name="about" state={form} />
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
          <Inline>
            <TextArea
              label="First Name"
              name="firstName"
              state={form}
              validation={{
                required: 'This field is required',
                maxLength: { value: 20, message: 'The max length is 20' },
              }}
            />
            <TextArea
              label="Address"
              name="address"
              state={form}
              validation={{
                required: 'This field is required',
                maxLength: { value: 20, message: 'The max length is 20' },
              }}
            />
          </Inline>

          <TextArea
            label="About yourself"
            state={form}
            name="about"
            maxLength={80}
            validation={{
              required: 'This field is required',
              maxLength: {
                value: 80,
                message: 'Make it short please',
              },
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
