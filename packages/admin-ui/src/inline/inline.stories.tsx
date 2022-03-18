import React from 'react'

import type { Meta } from '@storybook/react'

import { Inline } from './inline'

import { Tag } from '../components/Tag'
import { Box } from '../components/Box'

export default {
  title: 'admin-ui/Inline',
} as Meta

export const Basic = () => {
  return (
    <Inline>
      <Tag label="Brazil" />
      <Tag label="Argentina" />
      <Tag label="Chile" />
      <Tag label="Uruguai" />
    </Inline>
  )
}

export const Wrap = () => {
  return (
    <Box csx={{ width: '18rem' }}>
      <Inline>
        <Tag label="Brasil" />
        <Tag label="Argentina" />
        <Tag label="Chile" />
        <Tag label="Uruguai" />
        <Tag label="Colombia" />
        <Tag label="Equador" />
        <Tag label="Venezuela" />
      </Inline>
    </Box>
  )
}
