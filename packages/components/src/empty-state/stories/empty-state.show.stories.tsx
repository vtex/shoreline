import './styles.css'
import React from 'react'

import { EmptyState } from '../index'
import { Button } from '../../button'
import { Heading } from '../../heading'
import { Slot } from '../../slot'
import { Text } from '../../text'
import { IconWarningCircle } from '@vtex/shoreline-icons'

export default {
  title: 'components/empty-state',
  // This is required because SVGs keep changing between builds
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function Show(props) {
  const { size } = props

  return (
    <div className="screen-container">
      <EmptyState size={size}>
        <Slot name="illustration">
          <IconWarningCircle />
        </Slot>
        <Heading>Title goes here</Heading>
        <Text>
          Before you write the description here please visit the Shoreline
          documentation website to learn more about this componente and its
          usage.
        </Text>
        <Slot name="actions">
          <Button>Label</Button>
          <Button variant="primary">Label</Button>
        </Slot>
      </EmptyState>
    </div>
  )
}
