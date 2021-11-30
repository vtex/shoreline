/* eslint-disable no-console */
import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { IconHeart } from '@vtex/phosphor-icons'

import type { TagProps } from './index'
import { Tag } from './index'
import { Set } from '../Set'

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
    <>
      <Set>
        <Tag label="Rio de Janeiro" />
        <Tag label="Rio de Janeiro" palette="cyan" />
        <Tag label="Rio de Janeiro" palette="purple" />
        <Tag label="Rio de Janeiro" palette="green" />
        <Tag label="Rio de Janeiro" palette="red" />
        <Tag label="Rio de Janeiro" palette="orange" />
        <Tag label="Rio de Janeiro" palette="teal" />
      </Set>
    </>
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
    <>
      <Set>
        <Tag label="Rio de Janeiro" />
        <Tag size="small" label="Rio de Janeiro" />
      </Set>
      <br />
      <Set>
        <Tag label="Rio de Janeiro" icon={<IconHeart />} />
        <Tag size="small" label="Rio de Janeiro" icon={<IconHeart />} />
      </Set>
      <br />
      <Set>
        <Tag
          handleDelete={() => console.log('deleted')}
          label="Rio de Janeiro"
        />
        <Tag
          size="small"
          handleDelete={() => console.log('deleted')}
          label="Rio de Janeiro"
        />
      </Set>
      <br />
      <Set>
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
      </Set>
    </>
  )
}
