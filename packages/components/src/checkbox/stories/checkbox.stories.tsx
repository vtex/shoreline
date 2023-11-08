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
      <Checkbox>Label</Checkbox>
      <Checkbox error>Label</Checkbox>
      <Checkbox disabled>Label</Checkbox>
    </Stack>
  )
}

export function Controlled() {
  const [checked, setChecked] = useState(true)

  return (
    <Stack>
      <Text>{checked ? 'Checked' : 'Unchecked'}</Text>
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
      <Checkbox indeterminate error>
        With error
      </Checkbox>
      <Checkbox indeterminate disabled>
        Disabled
      </Checkbox>
    </Stack>
  )
}

export function AsField() {
  return (
    <Stack space="$space-10">
      <CheckboxField errorText="Something wrong" error>
        Terms and conditions
      </CheckboxField>
      <CheckboxField helpText="By clicking you agree with terms and conditions">
        Terms and conditions
      </CheckboxField>
      <CheckboxField defaultChecked disabled>
        Disabled
      </CheckboxField>
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
        helpText="Choose one of these"
      >
        <Checkbox indeterminate>Everything</Checkbox>
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
        errorText="Bad choice"
      >
        <Checkbox error>Everything</Checkbox>
        <Checkbox error>Everywhere</Checkbox>
        <Checkbox error>All at once</Checkbox>
        <Checkbox error disabled>
          None
        </Checkbox>
      </CheckboxGroup>
      <CheckboxGroup
        error
        direction="row"
        label="Options with error"
        errorText="Bad choice"
      >
        <Checkbox error>Everything</Checkbox>
        <Checkbox error>Everywhere</Checkbox>
        <Checkbox error>All at once</Checkbox>
        <Checkbox error disabled>
          None
        </Checkbox>
      </CheckboxGroup>
    </Stack>
  )
}
