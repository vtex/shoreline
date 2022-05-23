import React from 'react'
import type { Meta } from '@storybook/react'
import { Box } from '@vtex/admin-ui'
import * as yup from 'yup'

import { yupResolver } from '../index'
import { useFormState, Form } from '../../form'
import { TextInput } from '../../text-input'
import { TextArea } from '../../text-area'

export default {
  title: 'admin-ui-form/yup',
} as Meta

const schema = yup.object({
  firstName: yup.string().required(),
  comment: yup.string().required().min(10, 'Make a longer comment'),
})

export const YupValidation = () => {
  const form = useFormState({
    resolver: yupResolver(schema),
  })

  return (
    <Box>
      <Form onSubmit={(data) => console.log(data)} state={form}>
        <TextInput label="First Name" name="firstName" state={form} />
        <TextArea label="Comment" state={form} name="comment" />
        <input type="submit" value="Submit" />
      </Form>
    </Box>
  )
}
