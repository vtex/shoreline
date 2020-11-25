import React from 'react'
import { Meta } from '@storybook/react'

import { Heading } from './index'

export default {
  title: 'typography/Heading',
} as Meta

export function heading() {
  return (
    <>
      <Heading>Heading 1</Heading>
      <Heading element="h2">Heading 2</Heading>
      <Heading element="h3">Heading 3</Heading>
      <Heading element="h4">Heading 4</Heading>
      <Heading element="h5">Heading 5</Heading>
      <Heading element="h6">Heading 6</Heading>
    </>
  )
}

export function StyleOverrides() {
  return <Heading styleOverrides={{ color: 'primary.base' }}>Heading 1</Heading>
}
