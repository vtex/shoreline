import React from 'react'
import type { Meta } from '@storybook/react'
import { Box, Button, Inline, Stack } from '@vtex/admin-ui'

import { useFormState, Form } from '../../form'
import { Checkbox, CheckboxGroup } from '../index'

export default {
  title: 'admin-ui-form/checkbox',
} as Meta

export const Standalone = () => {
  const form = useFormState()

  return (
    <Box>
      <Form onSubmit={(data) => console.log(data)} state={form}>
        <Stack space="$space-2">
          <Inline>
            <Checkbox
              state={form}
              name="terms-of-service"
              label="I agree to the Terms of Service"
              helpText="You must select this option to use our services"
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

export const Group = () => {
  const form = useFormState()

  return (
    <Box>
      <Form onSubmit={(data) => console.log(data)} state={form}>
        <Stack space="$space-2">
          <CheckboxGroup name="features" state={form} label="Features">
            <Checkbox value="dark-mode" label="Dark Mode" />
            <Checkbox value="a11y-theme" label="Accessible Theme" />
            <Checkbox
              value="component-composition"
              label="Component Composition"
            />
          </CheckboxGroup>
          <Button csx={{ marginLeft: '$space-1' }} type="submit">
            Submit
          </Button>
        </Stack>
      </Form>
    </Box>
  )
}

export const StandaloneValidation = () => {
  const form = useFormState()

  return (
    <Box>
      <Form onSubmit={(data) => console.log(data)} state={form}>
        <Stack space="$space-2">
          <Inline>
            <Checkbox
              state={form}
              name="terms-of-service"
              label="I agree to the Terms of Service"
              helpText="You must select this option to use our services"
              validation={{
                required: 'This is required',
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

export const GroupValidation = () => {
  const form = useFormState()

  return (
    <Box>
      <Form onSubmit={(data) => console.log(data)} state={form}>
        <Stack space="$space-2">
          <CheckboxGroup
            name="features"
            state={form}
            label="Features"
            validation={{
              required: 'Choose at least one option',
            }}
          >
            <Checkbox value="dark-mode" label="Dark Mode" />
            <Checkbox value="a11y-theme" label="Accessible Theme" />
            <Checkbox
              value="component-composition"
              label="Component Composition"
            />
          </CheckboxGroup>
          <Button csx={{ marginLeft: '$space-1' }} type="submit">
            Submit
          </Button>
        </Stack>
      </Form>
    </Box>
  )
}
