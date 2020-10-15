/* eslint-disable no-console */
import React from 'react'
import { Meta } from '@storybook/react'

import { Tag } from './index'
import { IconFavorite } from '../../icons'
import { Box } from '../Box'

export default {
  title: 'beta/Tag',
  component: Tag,
} as Meta

export function Palettes() {
  return (
    <>
      <Box display="flex" items="center">
        <Tag label="Rio de Janeiro" palette="blue" />
        <Tag label="Rio de Janeiro" palette="red" />
        <Tag label="Rio de Janeiro" palette="yellow" />
        <Tag label="Rio de Janeiro" palette="green" />
        <Tag label="Rio de Janeiro" palette="black" />
        <Tag label="Rio de Janeiro" palette="purple" />
      </Box>
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
      <Box display="flex" items="center">
        <Tag label="Rio de Janeiro" m="1" />
        <Tag size="small" label="Rio de Janeiro" />
      </Box>
      <br />
      <Box display="flex" items="center">
        <Tag label="Rio de Janeiro" icon={<IconFavorite />} m="1" />
        <Tag size="small" label="Rio de Janeiro" icon={<IconFavorite />} />
      </Box>
      <br />
      <Box display="flex" items="center">
        <Tag
          handleDelete={() => console.log('deleted')}
          label="Rio de Janeiro"
          m="1"
        />
        <Tag
          size="small"
          handleDelete={() => console.log('deleted')}
          label="Rio de Janeiro"
        />
      </Box>
      <br />
      <Box display="flex" items="center">
        <Tag
          handleDelete={() => console.log('deleted')}
          label="Rio de Janeiro"
          icon={<IconFavorite />}
          m="1"
        />
        <Tag
          size="small"
          handleDelete={() => console.log('deleted')}
          label="Rio de Janeiro"
          icon={<IconFavorite />}
        />
      </Box>
    </>
  )
}
