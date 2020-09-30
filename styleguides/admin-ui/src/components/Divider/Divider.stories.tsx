import React from 'react'
import { Meta, Story } from '@storybook/react'

import { Divider, DividerProps } from './index'
import { Card } from '../Card'
import { Text } from '../Text'
import { Box } from '../Box'

export default {
  title: 'beta/Divider',
  component: Divider,
} as Meta

export const Horizontal: Story<DividerProps> = () => {
  return (
    <Card w="5/12">
      <Text variant="headline" mt="0" mb="2">
        Tolerance
      </Text>
      <Text el="p" fs="4" m="0" c="muted.0">
        Allows orders to be placed even if they pass X% of the account`s credit
        limit. Tolerance is set per account.
      </Text>
      <Divider orientation="horizontal" my="6" />
      <Text variant="headline" mt="0" mb="2">
        Automatic account creation
      </Text>
      <Text el="p" fs="4" m="0" c="muted.0">
        Allows users who have not been previously credited to close a purchase.
      </Text>
    </Card>
  )
}

export const Vertical: Story<DividerProps> = () => {
  return (
    <Card display="flex" w="5/12" justify="center">
      <Box w="5/12">
        <Text variant="headline" mt="0" mb="2">
          Cards
        </Text>
        <Text el="p" fs="4" m="0" c="muted.0">
          In Cards, your customer is given autonomy to manage credit cards
          related to his account, and can add, remove or edit credit card data.
        </Text>
      </Box>
      <Divider orientation="vertical" mx="6" />
      <Box w="5/12">
        <Text variant="headline" mt="0" mb="2">
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
