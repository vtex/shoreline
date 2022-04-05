import React from 'react'
import type { Meta } from '@storybook/react'
import { Set } from '@vtex/admin-ui'

import { Form, useFormState } from '../form'
import { Textfield } from './textfield'

export default {
  title: 'admin-ui-forms/textfield',
} as Meta

export const Basic = () => {
  const form = useFormState()

  return (
    <Form onSubmit={(data) => console.log(data)} state={form}>
      <Set
        orientation="vertical"
        spacing={2}
        csx={{
          maxWidth: '22rem',
        }}
      >
        <Textfield
          label="First Name"
          placeholder="Ex. Matheus"
          name="firstName"
          helperMessage="Your first name"
          state={form}
        />
        <Textfield
          label="Age"
          placeholder="Ex. 28"
          type="number"
          name="age"
          helperMessage="Years of age"
          state={form}
        />
        <Textfield
          label="Fav Food"
          placeholder="Ex. Meat"
          name="favFood"
          helperMessage="What you like to eat"
          state={form}
        />
        <input type="submit" value="Submit" />
      </Set>
    </Form>
  )
}
