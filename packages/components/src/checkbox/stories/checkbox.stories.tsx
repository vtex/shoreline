import '../../../dist/styles.min.css'
import '../checkbox.css'
import React, { useState } from 'react'

import { Checkbox } from '../index'
import { VisuallyHidden } from '@ariakit/react'
import { Stack } from '../../stack'
import { Button } from '../../button'
import { Text } from '../../text'

export default {
  title: 'shoreline-components/checkbox',
}

export function Default() {
  return (
    <Stack>
      <Checkbox>Default</Checkbox>
      <Checkbox error>With error</Checkbox>
      <Checkbox disabled>Disabled</Checkbox>
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
        With Error
      </Checkbox>
      <Checkbox indeterminate disabled>
        Disabled
      </Checkbox>
    </Stack>
  )
}

export function DefaultChecked() {
  return (
    <Stack>
      <Checkbox defaultChecked>Checked by default</Checkbox>
      <Checkbox defaultChecked disabled>
        Disabled
      </Checkbox>
    </Stack>
  )
}

export function HiddenLabel() {
  return (
    <Checkbox>
      <VisuallyHidden>With Error</VisuallyHidden>
    </Checkbox>
  )
}
