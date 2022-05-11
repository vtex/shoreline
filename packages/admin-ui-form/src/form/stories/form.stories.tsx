import React from 'react'
import type { Meta } from '@storybook/react'
import { Box } from '@vtex/admin-ui'

import { Form, useFormState } from '../index'

export default {
  title: 'admin-ui-form/form',
} as Meta

export const RegisterFields = () => {
  const form = useFormState()

  return (
    <Box>
      <Form onSubmit={(data) => console.log(data)} state={form}>
        <input placeholder="First Name" {...form.register('firstName')} />
        <input placeholder="Age" type="number" {...form.register('age')} />
        <input placeholder="Favorite Food" {...form.register('favFood')} />
        <input type="submit" value="Submit" />
      </Form>
    </Box>
  )
}

export const validation = () => {
  const form = useFormState()

  return (
    <Box>
      <Form onSubmit={(data) => console.log(data)} state={form}>
        <Box>
          <input
            placeholder="First Name"
            {...form.register('firstName', { required: true, maxLength: 20 })}
          />
          <Box>
            {form.formState.errors.firstName?.type === 'required' &&
              'First name is required'}
            {form.formState.errors.firstName?.type === 'maxLength' &&
              'The max length is 20'}
          </Box>
        </Box>

        <Box>
          <input
            placeholder="Age"
            type="number"
            {...form.register('age', { min: 18, max: 99 })}
          />
          <Box>
            {form.formState.errors.age?.type === 'min' && 'The min age is 18'}
            {form.formState.errors.age?.type === 'max' && 'The max age is 99'}
          </Box>
        </Box>

        <Box>
          <input
            placeholder="Favorite Food"
            {...form.register('favFood', { pattern: /^[A-Za-z]+$/i })}
          />
          <Box>
            {form.formState.errors.favFood?.type === 'pattern' &&
              'Only strings are accepted'}
          </Box>
        </Box>

        <input type="submit" value="Submit" />
      </Form>
    </Box>
  )
}
