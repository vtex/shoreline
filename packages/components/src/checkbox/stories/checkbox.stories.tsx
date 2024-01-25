import React, { useState } from 'react'

import { Checkbox, CheckboxGroup } from '../index'
import { VisuallyHidden } from '@ariakit/react'
import { Stack } from '../../stack'
import { Button } from '../../button'
import { Text } from '../../text'

import { IconInfoFill } from '@vtex/shoreline-icons'
import { Field, FieldDescription, FieldError } from '../../field'

export default {
  title: 'components/checkbox',
}

export function Default() {
  return (
    <Stack>
      <Checkbox>Label</Checkbox>
      <Checkbox disabled>Label</Checkbox>
    </Stack>
  )
}

export function Controlled() {
  const [checked, setChecked] = useState(true)

  return (
    <Stack>
      <Text variant="body">{checked ? 'Checked' : 'Unchecked'}</Text>
      <Button onClick={() => setChecked((c) => !c)}>Toggle</Button>
      <Checkbox
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      >
        Controlled
      </Checkbox>
    </Stack>
  )
}

export function Indeterminate() {
  return (
    <Stack>
      <Checkbox indeterminate>Indeterminate</Checkbox>
      <Checkbox indeterminate disabled>
        Disabled
      </Checkbox>
    </Stack>
  )
}

export function AsField() {
  return (
    <Stack space="$space-10">
      <Field error>
        <Checkbox>Terms and conditions</Checkbox>
        <FieldError>Something wrong</FieldError>
      </Field>
      <Field>
        <Checkbox>Terms and conditions</Checkbox>
        <FieldDescription>
          By clicking you agree with terms and conditions
        </FieldDescription>
      </Field>
      <Field error>
        <Checkbox>Terms and conditions</Checkbox>
        <FieldDescription>
          By clicking you agree with terms and conditions
        </FieldDescription>
        <FieldError>Something wrong</FieldError>
      </Field>
      <Field>
        <Checkbox defaultChecked disabled>
          Disabled
        </Checkbox>
        <FieldDescription>
          By clicking you agree with terms and conditions
        </FieldDescription>
      </Field>
    </Stack>
  )
}

export function HiddenLabel() {
  return <Checkbox>{<VisuallyHidden>With Error</VisuallyHidden>}</Checkbox>
}

export function Group() {
  return (
    <Stack space="5rem">
      <CheckboxGroup label="Options">
        <Checkbox indeterminate>Everything</Checkbox>
        <Checkbox>Everywhere</Checkbox>
        <Checkbox>All at once</Checkbox>
        <Checkbox disabled>None</Checkbox>
      </CheckboxGroup>
      <CheckboxGroup
        label="Options with help (optional)"
        description="Choose one of these"
      >
        <Checkbox indeterminate>Everything</Checkbox>
        <Checkbox>Everywhere</Checkbox>
        <Checkbox>All at once</Checkbox>
        <Checkbox disabled>None</Checkbox>
      </CheckboxGroup>
      <CheckboxGroup error label="Options" errorText="Bad choice">
        <Checkbox>Everything</Checkbox>
        <Checkbox>Everywhere</Checkbox>
        <Checkbox>All at once</Checkbox>
        <Checkbox disabled>None</Checkbox>
      </CheckboxGroup>
      <CheckboxGroup
        error
        label={
          <>
            Options
            <IconInfoFill />
          </>
        }
        description="Choose one of these"
        errorText="Bad choice"
      >
        <Checkbox>Everything</Checkbox>
        <Checkbox>Everywhere</Checkbox>
        <Checkbox>All at once</Checkbox>
        <Checkbox disabled>None</Checkbox>
      </CheckboxGroup>
      <CheckboxGroup
        error
        horizontal
        label="Options with error"
        errorText="Bad choice"
      >
        <Checkbox>Everything</Checkbox>
        <Checkbox>Everywhere</Checkbox>
        <Checkbox>All at once</Checkbox>
        <Checkbox disabled>None</Checkbox>
      </CheckboxGroup>
    </Stack>
  )
}
