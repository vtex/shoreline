/* eslint-disable no-console */
import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { IconHeart } from '@vtex/phosphor-icons'

import type { TagProps } from './index'
import { Tag } from './index'
import { Stack } from '../../stack'
import { Inline } from '../../inline'

export default {
  title: 'admin-ui/Tag',
  component: Tag,
} as Meta

export const Playground: Story<TagProps> = (args) => {
  return <Tag {...args} handleDelete={() => {}} />
}

Playground.args = {
  label: 'Rio de Janeiro',
  icon: <IconHeart />,
}

export function Palettes() {
  return (
    <Stack>
      <Inline>
        <Tag label="Rio de Janeiro" />
        <Tag label="Rio de Janeiro" palette="cyan" />
        <Tag label="Rio de Janeiro" palette="purple" />
        <Tag label="Rio de Janeiro" palette="green" />
      </Inline>
      <Inline>
        <Tag label="Rio de Janeiro" palette="red" />
        <Tag label="Rio de Janeiro" palette="orange" />
        <Tag label="Rio de Janeiro" palette="teal" />
        <Tag label="Rio de Janeiro" palette="gray" />
      </Inline>
    </Stack>
  )
}

export function Deletable() {
  return (
    <Tag label="Rio de Janeiro" handleDelete={() => console.log('delete')} />
  )
}

export function WithIcon() {
  return <Tag label="Rio de Janeiro" icon={<IconHeart />} />
}

export const Variants = () => {
  return (
    <Stack>
      <Inline>
        <Tag label="Rio de Janeiro" />
        <Tag size="small" label="Rio de Janeiro" />
      </Inline>
      <Inline>
        <Tag label="Rio de Janeiro" icon={<IconHeart />} />
        <Tag size="small" label="Rio de Janeiro" icon={<IconHeart />} />
      </Inline>
      <Inline>
        <Tag
          handleDelete={() => console.log('deleted')}
          label="Rio de Janeiro"
        />
        <Tag
          size="small"
          handleDelete={() => console.log('deleted')}
          label="Rio de Janeiro"
        />
      </Inline>
      <Inline>
        <Tag
          handleDelete={() => console.log('deleted')}
          label="Rio de Janeiro"
          icon={<IconHeart />}
        />
        <Tag
          size="small"
          handleDelete={() => console.log('deleted')}
          label="Rio de Janeiro"
          icon={<IconHeart />}
        />
      </Inline>
    </Stack>
  )
}
