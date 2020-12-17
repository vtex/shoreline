/* eslint-disable no-console */
import React from 'react'
import { Meta, Story } from '@storybook/react'
import { IconFavorite } from '@vtex/admin-ui-icons'

import { Tag, TagProps } from './index'
import { Set } from '../Set'

export default {
  title: 'components/Tag',
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
        <Tag label="Rio de Janeiro" palette="blue" />
        <Tag label="Rio de Janeiro" palette="red" />
        <Tag label="Rio de Janeiro" palette="yellow" />
        <Tag label="Rio de Janeiro" palette="green" />
        <Tag label="Rio de Janeiro" palette="black" />
        <Tag label="Rio de Janeiro" palette="purple" />
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
          palette="black"
          icon={<IconFavorite />}
        />
      </Set>
    </>
  )
}
