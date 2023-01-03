import React from 'react'
import type { Meta } from '@storybook/react'
import { Box, Button, Inline, Stack } from '@vtex/admin-ui'

import { useFormState, Form } from '../../form'
import { NumberInput } from '../index'

export default {
  title: 'admin-ui-form/number-input',
} as Meta

export const Basic = () => {
  const form = useFormState()

  return (
    <Box>
      <Form onSubmit={(data) => console.log(data)} state={form}>
        <Stack space="$space-2">
          <Inline>
            <NumberInput label="Age" name="age" state={form} />
            <NumberInput
              label="Weight"
              name="weight"
              suffix="kg"
              state={form}
              validation={{
                min: 0,
              }}
            />
          </Inline>
          <Button csx={{ marginLeft: '$space-1' }} type="submit">
            Submit
          </Button>
        </Stack>
      </Form>
    </Box>
  )
}

export const Validation = () => {
  const form = useFormState({
    defaultValues: {
      age: 18,
      weight: 0,
    },
  })

  return (
    <Box>
      <Form onSubmit={(data) => console.log(data)} state={form}>
        <Stack space="$space-2">
          <Inline>
            <NumberInput
              label="Age"
              name="age"
              state={form}
              validation={{
                min: { value: 18, message: 'The min is 18' },
              }}
            />
            <NumberInput
              label="Weight"
              name="weight"
              suffix="kg"
              state={form}
              validation={{
                min: { value: 0, message: 'The min is 0' },
              }}
            />
          </Inline>
          <Button csx={{ marginLeft: '$space-1' }} type="submit">
            Submit
          </Button>
        </Stack>
      </Form>
    </Box>
  )
}
