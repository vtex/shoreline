import React from 'react'
import './styles.css'
import {
  Popover,
  PopoverProvider,
  PopoverTrigger,
  PopoverDismiss,
} from '../index'
import { Stack } from '../../stack'

export default {
  title: 'components/popover',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function Show() {
  return (
    <Stack>
      <PopoverProvider>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <Popover>Content</Popover>
      </PopoverProvider>
      <PopoverProvider>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <Popover>
          Content
          <PopoverDismiss>Dismiss</PopoverDismiss>
        </Popover>
      </PopoverProvider>
    </Stack>
  )
}
