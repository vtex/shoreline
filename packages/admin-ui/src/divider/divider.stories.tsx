import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Box } from '../box'

import { Divider } from './index'
import { Card } from '../card'
import { Heading } from '../heading'
import { Paragraph } from '../components/Paragraph'
import { csx } from '@vtex/admin-ui-core'

export default {
  title: 'admin-ui/Divider',
  component: Divider,
} as Meta

const headingSpacing = csx({
  marginY: '$space-2',
})

export const Horizontal: Story = () => {
  return (
    <Card csx={{ width: 500 }}>
      <Heading className={headingSpacing}>Tolerance</Heading>
      <Paragraph>
        Allows orders to be placed even if they pass X% of the account`s credit
        limit. Tolerance is set per account.
      </Paragraph>
      <Divider
        orientation="horizontal"
        className={csx({ marginY: '$space-6' })}
      />
      <Heading className={headingSpacing}>Automatic account creation</Heading>
      <Paragraph>
        Allows users who have not been previously credited to close a purchase.
      </Paragraph>
    </Card>
  )
}

export const Vertical: Story = () => {
  return (
    <Box
      csx={{
        display: 'flex',
        width: 500,
      }}
    >
      <Box csx={{ width: '1/2' }}>
        <Heading className={headingSpacing}>Cards</Heading>
        <Paragraph>
          In Cards, your customer is given autonomy to manage credit cards
          related to his account, and can add, remove or edit credit card data.
        </Paragraph>
      </Box>
      <Divider
        orientation="vertical"
        className={csx({ marginX: '$space-6' })}
      />
      <Box csx={{ width: '1/2' }}>
        <Heading className={headingSpacing}>Personal data</Heading>
        <Paragraph>
          In this section, the user can manage their personal data registered on
          the store site.
        </Paragraph>
      </Box>
    </Box>
  )
}
