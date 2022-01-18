import React from 'react'
import type { Meta, Story } from '@storybook/react'

import type { SelectorInitialState } from '../index'
import {
  Selector,
  SelectorDialog,
  SelectorDisclosure,
  useSelectorState,
} from '../index'

export default {
  title: 'admin-ui/Selector',
} as Meta

const BasicSelector = (props: SelectorInitialState) => {
  const state = useSelectorState(props)

  return (
    <>
      <Selector state={state}>
        <SelectorDisclosure state={state}>open</SelectorDisclosure>
      </Selector>
      <SelectorDialog state={state}>
        <button>Tabbable</button> Content
      </SelectorDialog>
    </>
  )
}

export const Basic: Story = (args) => <BasicSelector {...args} />

export const InitiallyVisible = Basic.bind({})
InitiallyVisible.args = {
  visible: true,
}
