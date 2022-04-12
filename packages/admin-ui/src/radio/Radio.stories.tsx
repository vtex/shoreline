import React from 'react'
import type { Meta } from '@storybook/react'

import { Radio, useRadioState } from './index'

export default {
  title: 'admin-ui-review/radio',
  component: Radio,
} as Meta

export function Example() {
  const state = useRadioState({})

  return (
    <>
      <Radio value="unchecked" aria-label="label" state={state} />
      <Radio value="checked" state={state} />
    </>
  )
}
