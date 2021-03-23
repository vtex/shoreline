import React from 'react'
import { Meta } from '@storybook/react'

import { Toolbar } from './index'
import { useToolbarState } from './components'
import { Button } from '../Button'

export default {
  title: 'admin-ui/Toolbar',
  component: Toolbar,
} as Meta

const labels = ['Item 1', 'Item 2', 'Item 3', 'Item 4']

export const Basic = () => {
  const state = useToolbarState()

  return (
    <>
      <Toolbar state={state}>
        {labels.map((label) => (
          <Button>{label}</Button>
        ))}
      </Toolbar>
    </>
  )
}
