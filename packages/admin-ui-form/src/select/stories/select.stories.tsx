import React from 'react'
import type { Meta } from '@storybook/react'
import { Box, Button, Stack } from '@vtex/admin-ui'

import { useFormState, Form } from '../../form'
import { Select } from '../index'

export default {
  title: 'admin-ui-form/select',
} as Meta

export const Basic = () => {
  const form = useFormState({
    defaultValues: {
      country: 'brazil',
    },
  })

  return (
    <Box>
      <Form onSubmit={(data) => console.log(data)} state={form}>
        <Stack space="$l">
          <Select label="Role" name="role" state={form}>
            <option value="member">Member</option>
            <option value="owner">Owner</option>
          </Select>
          <Select label="Country" name="country" state={form}>
            <option value="brazil">Brazil</option>
            <option value="usa">USA</option>
          </Select>
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
          <Select
            label="Role"
            name="role"
            state={form}
            validation={{
              required: 'This is required',
            }}
          >
            <option value="member">Member</option>
            <option value="owner">Owner</option>
          </Select>
          <Button csx={{ marginLeft: '$s' }} type="submit">
            Submit
          </Button>
        </Stack>
      </Form>
    </Box>
  )
}
