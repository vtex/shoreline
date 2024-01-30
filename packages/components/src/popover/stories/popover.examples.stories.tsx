import React from 'react'
import './styles.css'
import { Button } from '../../button'
import { Popover, PopoverProvider, PopoverTrigger } from '../index'

export default {
  title: 'components/popover/examples',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}
export function Composition() {
  return (
    <PopoverProvider>
      <PopoverTrigger asChild>
        <Button>Open</Button>
      </PopoverTrigger>
      <Popover asChild>
        <div className="content" />
      </Popover>
    </PopoverProvider>
  )
}
