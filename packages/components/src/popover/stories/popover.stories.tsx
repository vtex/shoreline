import React from 'react'
import './styles.css'
import { Button } from '../../button'
import {
  Popover,
  PopoverProvider,
  PopoverTrigger,
  PopoverDismiss,
} from '../index'

export default {
  title: 'components/popover',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function Default() {
  return (
    <PopoverProvider>
      <PopoverTrigger>Trigger</PopoverTrigger>
      <Popover>Content</Popover>
    </PopoverProvider>
  )
}

export function Dismiss() {
  return (
    <PopoverProvider>
      <PopoverTrigger>Trigger</PopoverTrigger>
      <Popover>
        Content
        <PopoverDismiss>Dismiss</PopoverDismiss>
      </Popover>
    </PopoverProvider>
  )
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
