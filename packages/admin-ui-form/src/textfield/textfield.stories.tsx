import React from 'react'
import type { Meta } from '@storybook/react'
import { Box } from '@vtex/admin-ui'

import { Form, useFormState } from '../form'
import { Textfield } from './textfield'

export default {
  title: 'admin-ui-forms/textfield',
} as Meta

export const Basic = () => {
  const form = useFormState()

  return (
    <Box>
      <Form onSubmit={(data) => console.log(data)} state={form}>
        <Textfield
          placeholder="First Name"
          type="text"
          name="firstName"
          state={form}
        />
        <Textfield placeholder="Age" type="number" name="age" state={form} />
        <Textfield
          placeholder="Favorite Food"
          type="text"
          name="favFood"
          state={form}
        />
        <input type="submit" value="Submit" />
      </Form>
    </Box>
  )
}
