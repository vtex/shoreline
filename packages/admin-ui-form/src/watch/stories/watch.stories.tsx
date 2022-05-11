import React from 'react'
import type { Meta } from '@storybook/react'
import { Box } from '@vtex/admin-ui'

import { useFormState, Form } from '../../form'
import { useWatch, Watch } from '../index'

export default {
  title: 'admin-ui-form/watch',
} as Meta

export const UseWatch = () => {
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

export const WatchComponent = () => {
  const form = useFormState()

  return (
    <Box>
      <Form onSubmit={(data) => console.log(data)} state={form}>
        <input placeholder="First Name" {...form.register('firstName')} />
        <input placeholder="Age" type="number" {...form.register('age')} />
        <input placeholder="Favorite Food" {...form.register('favFood')} />
        <input type="submit" value="Submit" />
      </Form>
      <Box>
        <Box as="p">
          firstName:
          <Watch name="firstName" form={form} />
        </Box>
        <Box as="p">
          age:
          <Watch name="age" form={form} />
        </Box>
        <Box as="p">
          favFood:
          <Watch name="favFood" form={form}>
            {(value) => <>{value}</>}
          </Watch>
        </Box>
      </Box>
    </Box>
  )
}
