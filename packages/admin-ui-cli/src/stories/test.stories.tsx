import React from 'react'
import type { Meta } from '@storybook/react'

import { Form, useFormState, TextInput, yupResolver } from '@vtex/admin-ui-form'
import type { AnyObject } from '@vtex/admin-ui'
import {
  Page,
  PageHeader,
  PageTitle,
  PageContent,
  PageActions,
  Button,
  Stack,
} from '@vtex/admin-ui'
import * as yup from 'yup'

export default {
  title: 'admin-ui-cli/test',
} as Meta

const style = {
  content: {
    maxWidth: '46.25rem',
    margin: 'auto',
    paddingY: '4rem',
  },
}

const schema = yup.object({
  productName: yup.string().required(),
  price: yup.number().required(),
  category: yup.string().required(),
})

export function FormPage() {
  const form = useFormState({
    resolver: yupResolver(schema),
  })

  const onPopNavigation = () => {
    alert('should go back')
  }

  const onSubmit = (value: AnyObject) => {
    console.log(value)
  }

  return (
    <Form state={form} onSubmit={onSubmit}>
      <Page>
        <PageHeader onPopNavigation={onPopNavigation}>
          <PageTitle>Products</PageTitle>
          <PageActions>
            <Button variant="secondary" type="reset">
              Reset
            </Button>
            <Button type="submit">Submit</Button>
          </PageActions>
        </PageHeader>
        <PageContent csx={style.content}>
          <Stack space="$xl" fluid>
            <TextInput label="Product name" name="productName" state={form} />
            <TextInput label="Price" name="price" state={form} />
            <TextInput label="Category" name="category" state={form} />
          </Stack>
        </PageContent>
      </Page>
    </Form>
  )
}
