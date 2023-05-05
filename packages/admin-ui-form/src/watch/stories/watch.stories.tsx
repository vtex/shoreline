import React from 'react'
import type { Meta } from '@storybook/react'

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
    <div>
      <Form onSubmit={(data) => console.log(data)} state={form}>
        <input placeholder="First Name" {...form.register('firstName')} />
        <input placeholder="Age" type="number" {...form.register('age')} />
        <input placeholder="Favorite Food" {...form.register('favFood')} />
        <input type="submit" value="Submit" />
      </Form>
      <div>
        <p>firstName: {firstName}</p>
        <p>age: {age}</p>
        <p>favFood: {favFood}</p>
      </div>
    </div>
  )
}

export const WatchComponent = () => {
  const form = useFormState()

  return (
    <div>
      <Form onSubmit={(data) => console.log(data)} state={form}>
        <input placeholder="First Name" {...form.register('firstName')} />
        <input placeholder="Age" type="number" {...form.register('age')} />
        <input placeholder="Favorite Food" {...form.register('favFood')} />
        <input type="submit" value="Submit" />
      </Form>
      <div>
        <p>
          firstName:
          <Watch name="firstName" form={form} />
        </p>
        <p>
          age:
          <Watch name="age" form={form} />
        </p>
        <p>
          favFood:
          <Watch name="favFood" form={form}>
            {(value) => <>{value}</>}
          </Watch>
        </p>
      </div>
    </div>
  )
}
