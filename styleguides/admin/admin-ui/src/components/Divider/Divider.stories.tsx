import React from 'react'
import { Meta, Story } from '@storybook/react'

import { Divider, DividerProps } from './index'
import { Card } from '../Card'
import { Box } from '../Box'
import { Heading } from '../Heading'
import { Paragraph } from '../Paragraph'

export default {
  title: 'admin-ui/Divider',
  component: Divider,
} as Meta

export const Horizontal: Story<DividerProps> = () => {
  return (
    <Card styleOverrides={{ width: 500 }}>
      <Heading styleOverrides={{ marginBottom: 2 }}>Tolerance</Heading>
      <Paragraph>
        Allows orders to be placed even if they pass X% of the account`s credit
        limit. Tolerance is set per account.
      </Paragraph>
      <Divider orientation="horizontal" styleOverrides={{ marginY: 6 }} />
      <Heading styleOverrides={{ marginBottom: 2 }}>
        Automatic account creation
      </Heading>
      <Paragraph>
        Allows users who have not been previously credited to close a purchase.
      </Paragraph>
    </Card>
  )
}

export const Vertical: Story<DividerProps> = () => {
  return (
    <Card
      styleOverrides={{
        display: 'flex',
        width: 500,
        justifyContent: 'center',
      }}
    >
      <Box styles={{ width: '1/2' }}>
        <Heading styleOverrides={{ marginY: 2 }}>Cards</Heading>
        <Paragraph>
          In Cards, your customer is given autonomy to manage credit cards
          related to his account, and can add, remove or edit credit card data.
        </Paragraph>
      </Box>
      <Divider orientation="vertical" styleOverrides={{ marginX: 6 }} />
      <Box styles={{ width: '1/2' }}>
        <Heading styleOverrides={{ marginY: 2 }}>Personal data</Heading>
        <Paragraph>
          In this section, the user can manage their personal data registered on
          the store site.
        </Paragraph>
      </Box>
    </Card>
  )
}
