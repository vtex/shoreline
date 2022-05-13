import React from 'react'
import type { Meta } from '@storybook/react'
import { Box } from '@vtex/admin-ui'

import { useFormState, Form } from '../../form'
import { TextInput } from '../index'

export default {
  title: 'admin-ui-form/text-input',
} as Meta

export const Basic = () => {
  const form = useFormState()

  return (
    <Box>
      <Form onSubmit={(data) => console.log(data)} state={form}>
        <TextInput
          autoComplete="off"
          label="First Name"
          name="firstName"
          state={form}
        />
        <TextInput autoComplete="off" label="Age" name="age" state={form} />
        <TextInput autoComplete="off" label="Food" name="food" state={form} />
        <input type="submit" value="Submit" />
      </Form>
    </Box>
  )
}

export const Validation = () => {
  const form = useFormState()

  return (
    <Box>
      <Form onSubmit={(data) => console.log(data)} state={form}>
        <TextInput
          label="First Name"
          autoComplete="off"
          name="firstName"
          state={form}
          validation={{
            required: 'This field is required',
            maxLength: { value: 20, message: 'The max length is 20' },
          }}
        />
        <TextInput
          label="Comment"
          state={form}
          name="comment"
          validation={{
            required: 'A comment is needed',
            maxLength: {
              value: 20,
              message: 'A comment must be short, like tweet',
            },
            validate: {
              isEmail: (v) =>
                v.matches(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i),
            },
          }}
        />
        {form.formState?.errors?.comment?.type === 'isEmail' &&
          'must be a valid email'}

        <input type="submit" value="Submit" />
      </Form>
    </Box>
  )
}
