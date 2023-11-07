import React, { useState } from 'react'
import '../../../dist/styles.min.css'
import '../checkbox.css'

import { Checkbox, CheckboxField, CheckboxGroup } from '../index'
import { VisuallyHidden } from '@ariakit/react'
import { Stack } from '../../stack'
import { Button } from '../../button'
import { Text } from '../../text'

import { IconInfoFill } from '@vtex/shoreline-icons'

export default {
  title: 'shoreline-components/checkbox',
}

export function Default() {
  return (
    <Stack>
      <CheckboxField>Default</CheckboxField>
      <CheckboxField error>With error</CheckboxField>
      <CheckboxField disabled>Disabled</CheckboxField>
    </Stack>
  )
}

export function Standalone() {
  return (
    <Stack>
      <Checkbox />
      <Checkbox error />
      <Checkbox disabled />
    </Stack>
  )
}

export function Controlled() {
  const [checked, setChecked] = useState(true)

  return (
    <Stack>
      <Text>{checked ? 'Checked' : 'Unchecked'}</Text>
      <Button onClick={() => setChecked((c) => !c)}>Toggle</Button>
      <CheckboxField
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      >
        Controlled
      </CheckboxField>
    </Stack>
  )
}

export function Indeterminate() {
  return (
    <Stack>
      <CheckboxField indeterminate>Indeterminate</CheckboxField>
      <CheckboxField indeterminate error>
        With error
      </CheckboxField>
      <CheckboxField indeterminate disabled>
        Disabled
      </CheckboxField>
    </Stack>
  )
}

export function WithMessage() {
  return (
    <Stack space="$space-10">
      <CheckboxField message="Something wrong" error>
        Cheched by default
      </CheckboxField>
      <CheckboxField defaultChecked disabled>
        Disabled
      </CheckboxField>
    </Stack>
  )
}

export function HiddenLabel() {
  return (
    <CheckboxField>{<VisuallyHidden>With Error</VisuallyHidden>}</CheckboxField>
  )
}

export function Group() {
  return (
    <Stack space="5rem">
      <CheckboxGroup label="Options">
        <CheckboxField indeterminate>Everything</CheckboxField>
        <CheckboxField>Everywhere</CheckboxField>
        <CheckboxField>All at once</CheckboxField>
        <CheckboxField disabled>None</CheckboxField>
      </CheckboxGroup>
      <CheckboxGroup label="Options (optional)" helpText="Choose one of these">
        <CheckboxField indeterminate>Everything</CheckboxField>
        <CheckboxField>Everywhere</CheckboxField>
        <CheckboxField>All at once</CheckboxField>
        <CheckboxField disabled>None</CheckboxField>
      </CheckboxGroup>
      <CheckboxGroup
        error
        label={
          <>
            Options
            <IconInfoFill />
          </>
        }
        errorText="Bad choice"
      >
        <CheckboxField error>Everything</CheckboxField>
        <CheckboxField error>Everywhere</CheckboxField>
        <CheckboxField error>All at once</CheckboxField>
        <CheckboxField error disabled>
          None
        </CheckboxField>
      </CheckboxGroup>
      <CheckboxGroup
        error
        direction="row"
        label="Options"
        errorText="Bad choice"
      >
        <CheckboxField error>Everything</CheckboxField>
        <CheckboxField error>Everywhere</CheckboxField>
        <CheckboxField error>All at once</CheckboxField>
        <CheckboxField error disabled>
          None
        </CheckboxField>
      </CheckboxGroup>
    </Stack>
  )
}
