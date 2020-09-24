import React from 'react'
import { Meta } from '@storybook/react'

import { Divider } from './index'
import { Card } from '../Card'
import { Text } from '../Text'
import { Box } from '../Box'

export default {
  title: 'beta/Divider',
  component: Divider,
} as Meta

export const Horizontal = () => {
  return (
    <Card w="2/5">
      <Text variant="headline" mt="0" mb="6">
        Tolerance
      </Text>
      <Text el="p" fs="4" m="0" c="muted.0">
        Allows orders to be placed even if they pass X% of the account`s credit
        limit. Tolerance is set per account.
      </Text>
      <Divider
        orientation="horizontal"
        sx={{
          marginY: '13',
        }}
      />
      <Text variant="headline" mt="0" mb="6">
        Automatic account creation
      </Text>
      <Text el="p" fs="4" m="0" c="muted.0">
        Allows users who have not been previously credited to close a purchase.
      </Text>
    </Card>
  )
}

export const Vertical = () => {
  return (
    <Card display="flex" w="2/5" justify="center">
      <Box w="2/5">
        <Text variant="headline" mt="0" mb="6">
          Cards
        </Text>
        <Text el="p" fs="4" m="0" c="muted.0">
          In Cards, your customer is given autonomy to manage credit cards
          related to his account, and can add, remove or edit credit card data.
        </Text>
      </Box>
      <Divider orientation="vertical" sx={{ marginX: 13 }} />
      <Box w="2/5">
        <Text variant="headline" mt="0" mb="6">
          Personal data
        </Text>
        <Text el="p" fs="4" m="0" c="muted.0">
          In this section, the user can manage their personal data registered on
          the store site.
        </Text>
      </Box>
    </Card>
  )
}
