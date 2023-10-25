import React from 'react'

import '../../../dist/styles.min.css'
import './styles.css'

import { Content } from '../../content'
import { Button } from '../../button'
import { Popover, PopoverProvider, PopoverTrigger } from '../index'

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
