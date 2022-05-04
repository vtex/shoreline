import React from 'react'
import type { Meta, Story } from '@storybook/react'

import type { PickerInitialState } from '../index'
import {
  Picker,
  PickerPopover,
  PickerDisclosure,
  usePickerState,
} from '../index'

export default {
  title: 'admin-ui/Picker',
} as Meta

function BasicPicker(props: PickerInitialState) {
  const state = usePickerState(props)

  return (
    <>
      <Picker state={state}>
        <PickerDisclosure state={state}>open</PickerDisclosure>
      </Picker>
      <PickerPopover state={state}>
        <button>Tabbable</button> Content
      </PickerPopover>
    </>
  )
}

export const Basic: Story = (args) => <BasicPicker {...args} />

export const InitiallyVisible = Basic.bind({})
InitiallyVisible.args = {
  visible: true,
}
