import React from 'react'
import { Meta } from '@storybook/react'

import { Select } from './index'

export default {
  title: 'unstable/select',
  component: Select,
} as Meta

export const Basic = () => {
  return (
    <Select
      label="Label"
      items={['Geraldo Thomaz', 'Steve Jobs', 'Jeff Bezos', 'Bill Gates']}
    />
  )
}

export const WithoutLabel = () => {
  return (
    <Select
      items={['Geraldo Thomaz', 'Steve Jobs', 'Jeff Bezos', 'Bill Gates']}
    />
  )
}

export const Variant = () => {
  return (
    <Select
      items={['Geraldo Thomaz', 'Steve Jobs', 'Jeff Bezos', 'Bill Gates']}
      variant="tertiary"
    />
  )
}
