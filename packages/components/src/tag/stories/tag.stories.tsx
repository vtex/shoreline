import React from 'react'

import { Tag } from '../index'
import { Stack } from '../../stack'

export default {
  title: 'shoreline-components/tag',
}

export function Default() {
  return <Tag>Short text</Tag>
}

export function Sizes() {
  return (
    <Stack>
      <Tag color="gray" variant="primary" size="normal">
        Normal badge
      </Tag>
      <Tag color="gray" variant="primary" size="large">
        Large badge
      </Tag>
    </Stack>
  )
}

export function Variants() {
  return (
    <Stack>
      Primary
      <Stack direction="row">
        <Tag color="red">Red</Tag>
        <Tag color="yellow">Yellow</Tag>
        <Tag color="orange">Orange</Tag>
        <Tag color="pink">Pink</Tag>
        <Tag color="purple">Purple</Tag>
        <Tag color="blue">Blue</Tag>
        <Tag color="cyan">Cyan</Tag>
        <Tag color="teal">Teal</Tag>
        <Tag color="green">Green</Tag>
        <Tag color="gray">Gray</Tag>
      </Stack>
      Secondary
      <Stack direction="row">
        <Tag color="red" variant="secondary">
          Red
        </Tag>
        <Tag color="yellow" variant="secondary">
          Yellow
        </Tag>
        <Tag color="orange" variant="secondary">
          Orange
        </Tag>
        <Tag color="pink" variant="secondary">
          Pink
        </Tag>
        <Tag color="purple" variant="secondary">
          Purple
        </Tag>
        <Tag color="blue" variant="secondary">
          Blue
        </Tag>
        <Tag color="cyan" variant="secondary">
          Cyan
        </Tag>
        <Tag color="teal" variant="secondary">
          Teal
        </Tag>
        <Tag color="green" variant="secondary">
          Green
        </Tag>
        <Tag color="gray" variant="secondary">
          Gray
        </Tag>
      </Stack>
    </Stack>
  )
}
