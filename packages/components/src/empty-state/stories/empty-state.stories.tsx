import '../empty-state.css'
import './styles.css'
import React from 'react'

import { EmptyState } from '../index'
import { Button } from '../../button'
import { Heading } from '../../heading'
import { Slot } from '../../slot'
import { Text } from '../../text'
import { IconMagnifyingGlass, IconWarningCircle } from '../../../../icons/src'
import {
  Filter,
  FilterPopover,
  FilterProvider,
  FilterTrigger,
} from '../../filter'
import { Popover } from '../../popover'

export default {
  title: 'shoreline-components/empty-state',
  argTypes: {
    size: {
      description: 'Size',
      default: 'medium',
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
    },
  },
}

export function Default(props) {
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

export function Simple(props) {
  const { size } = props

  return (
    <div className="screen-container">
      <EmptyState size={size}>
        <Heading>Title goes here</Heading>
        <Slot name="actions">
          <Button variant="primary">label</Button>
        </Slot>
      </EmptyState>
    </div>
  )
}

export function FilterError() {
  return (
    <FilterProvider>
      <FilterTrigger>Status</FilterTrigger>
      <Popover data-sl-filter-popover>
        <EmptyState size="small" style={{ height: '18.25rem' }}>
          <Slot name="illustration">
            <IconWarningCircle color="red" />
          </Slot>
          <Heading>Something went wrong</Heading>
          <Slot name="actions">
            <Button>Try again</Button>
          </Slot>
        </EmptyState>
      </Popover>
    </FilterProvider>
  )
}

export function FilterNotFound() {
  return (
    <Filter label="Country" defaultValue={[]} setSearchValue={(value) => {}}>
      <EmptyState size="small" style={{ height: '15rem' }}>
        <Slot name="illustration">
          <IconMagnifyingGlass />
        </Slot>
        <Heading>No results found</Heading>
        <Text>Try using different terms.</Text>
      </EmptyState>
    </Filter>
  )
}
