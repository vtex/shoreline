/* eslint-disable no-console */
import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { IconFavorite } from '@vtex/admin-ui-icons'

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
  icon: <IconFavorite />,
}

export function Palettes() {
  return (
    <>
      <Set>
        <Tag label="Rio de Janeiro" />
        <Tag label="Rio de Janeiro" palette="cyan" />
        <Tag label="Rio de Janeiro" palette="purple" />
        <Tag label="Rio de Janeiro" palette="green" />
        <Tag label="Rio de Janeiro" palette="grey" />
        <Tag label="Rio de Janeiro" palette="purple" />
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
  return <Tag label="Rio de Janeiro" icon={<IconFavorite />} />
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
        <Tag label="Rio de Janeiro" icon={<IconFavorite />} />
        <Tag size="small" label="Rio de Janeiro" icon={<IconFavorite />} />
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
          icon={<IconFavorite />}
        />
        <Tag
          size="small"
          handleDelete={() => console.log('deleted')}
          label="Rio de Janeiro"
          palette="grey"
          icon={<IconFavorite />}
        />
      </Set>
    </>
  )
}
