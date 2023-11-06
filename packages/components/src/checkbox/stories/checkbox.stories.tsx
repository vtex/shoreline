import '../../../dist/styles.min.css'
import '../checkbox.css'
import React, { useState } from 'react'

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
      <CheckboxField label="Default">Default</CheckboxField>
      <CheckboxField error label="With error" />
      <CheckboxField disabled label="Disabled" />
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
        label="Controlled"
      />
    </Stack>
  )
}

export function Indeterminate() {
  return (
    <Stack>
      <CheckboxField indeterminate label="Indeterminate" />
      <CheckboxField indeterminate error label="WithError" />
      <CheckboxField indeterminate disabled label="Disabled" />
    </Stack>
  )
}

export function WithMessage() {
  return (
    <Stack space="$space-10">
      <CheckboxField
        label="Checked by default"
        message="Something wrong"
        error
      />
      <CheckboxField label="Disabled" defaultChecked disabled />
    </Stack>
  )
}

export function HiddenLabel() {
  return <CheckboxField label={<VisuallyHidden>With Error</VisuallyHidden>} />
}

export function Group() {
  return (
    <Stack space="5rem">
      <CheckboxGroup label="Options">
        <CheckboxField indeterminate label="Everything" />
        <CheckboxField label="Everywhere" />
        <CheckboxField label="All at once" />
        <CheckboxField disabled label="None" />
      </CheckboxGroup>
      <CheckboxGroup label="Options (optional)" helpText="Choose one of these">
        <CheckboxField indeterminate label="Everything" />
        <CheckboxField label="Everywhere" />
        <CheckboxField label="All at once" />
        <CheckboxField disabled label="None" />
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
        <CheckboxField error indeterminate label="Everything" />
        <CheckboxField error label="Everywhere" />
        <CheckboxField error label="All at once" />
        <CheckboxField error disabled label="None" />
      </CheckboxGroup>
      <CheckboxGroup
        error
        direction="row"
        label="Options"
        errorText="Bad choice"
      >
        <CheckboxField error indeterminate label="Everything" />
        <CheckboxField error label="Everywhere" />
        <CheckboxField error label="All at once" />
        <CheckboxField error disabled label="None" />
      </CheckboxGroup>
    </Stack>
  )
}
