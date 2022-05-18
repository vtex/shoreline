import React from 'react'
import type { Meta } from '@storybook/react'
import { Box } from '@vtex/admin-ui'
import * as yup from 'yup'

import { yupResolver } from '../index'
import { useFormState, Form } from '../../form'
import { TextInput } from '../../text-input'

export default {
  title: 'admin-ui-form/yup',
} as Meta

const schema = yup.object({
  firstName: yup.string().required(),
  comment: yup.string().required(),
})

export const YupValidation = () => {
  const form = useFormState({
    resolver: yupResolver(schema),
  })

  return (
    <Box>
      <Form onSubmit={(data) => console.log(data)} state={form}>
        <TextInput label="First Name" name="firstName" state={form} />
        <TextInput label="Comment" state={form} name="comment" />
        <input type="submit" value="Submit" />
      </Form>
    </Box>
  )
}
