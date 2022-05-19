import React from 'react'
import type { Meta } from '@storybook/react'
import { Box, Button, Inline, Stack } from '@vtex/admin-ui'

import { useFormState, Form } from '../../form'
import { TextArea } from '../index'

export default {
  title: 'admin-ui-form/text-area',
} as Meta

export const Basic = () => {
  const form = useFormState()

  return (
    <Box>
      <Form onSubmit={(data) => console.log(data)} state={form}>
        <Stack space="$l">
          <TextArea label="Address" name="address" state={form} />
          <TextArea label="About yourself" name="about" state={form} />
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
          <Button csx={{ marginLeft: '$s' }} type="submit">
            Submit
          </Button>
        </Stack>
      </Form>
    </Box>
  )
}
