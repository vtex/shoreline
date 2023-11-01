import React from 'react'

import '../../../dist/styles.min.css'
import '../popover.css'
import './styles.css'

import { Content } from '../../content'
import { Button } from '../../button'
import {
  Popover,
  PopoverProvider,
  PopoverTrigger,
  PopoverDismiss,
} from '../index'

export default {
  title: 'shoreline-components/popover',
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
        <Content narrow>
          <div className="content" />
        </Content>
      </Popover>
    </PopoverProvider>
  )
}
