import React from 'react'

import type { Meta } from '@storybook/react'

import { Inline } from '../inline'
import { Bleed } from './bleed'

import { Tag } from '../components/Tag'
import { Box } from '../components/Box'
import { Paragraph } from '../components/Paragraph'

export default {
  title: 'admin-ui/Bleed',
} as Meta

export const Basic = () => {
  return (
    <Box
      csx={{
        padding: '1rem',
        border: '$neutral',
        width: 350,
      }}
    >
      <Bleed top="1rem" left="1rem">
        <img
          src="https://vtex.com/wp-content/uploads/2020/04/VTEX-Brand.svg"
          alt="vtex-brand"
        />
      </Bleed>
      <Paragraph>
        VTEX is the Enterprise Digital Commerce Platform for brands and
        retailers looking to build a future-proof digital commerce strategy.
        Powered by a modern platform and a team of digital commerce experts, we
        enable enterprises to achieve faster time-to-market, reach their
        customers across any channel and uncover new areas of growth.
      </Paragraph>
    </Box>
  )
}

export const WithInline = () => {
  return (
    <Bleed top="$xl" left="$xl">
      <Inline vSpace="$xl" hSpace="$xl">
        <Tag label="Brazil" />
        <Tag label="Argentina" />
        <Tag label="Chile" />
        <Tag label="Uruguai" />
      </Inline>
    </Bleed>
  )
}
