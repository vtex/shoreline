import React from 'react'
import type { Meta } from '@storybook/react'
import { Box } from '@vtex/admin-ui'

import { Form, useFormState, useWatch } from './index'

export default {
  title: 'admin-ui-forms/form',
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

export const SubscribeToFieldChanges = () => {
  const form = useFormState()

  const firstName = useWatch({
    form,
    name: 'firstName',
  })

  const age = useWatch({
    form,
    name: 'age',
  })

  const favFood = useWatch({
    form,
    name: 'favFood',
  })

  return (
    <Box>
      <Form onSubmit={(data) => console.log(data)} state={form}>
        <input placeholder="First Name" {...form.register('firstName')} />
        <input placeholder="Age" type="number" {...form.register('age')} />
        <input placeholder="Favorite Food" {...form.register('favFood')} />
        <input type="submit" value="Submit" />
      </Form>
      <Box>
        <Box as="p">firstName: {firstName}</Box>
        <Box as="p">age: {age}</Box>
        <Box as="p">favFood: {favFood}</Box>
      </Box>
    </Box>
  )
}
