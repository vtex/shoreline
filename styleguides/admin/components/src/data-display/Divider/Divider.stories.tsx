import React from 'react'
import { Meta } from '@storybook/react'
import { onda } from '@vtex/admin-core'

import { Divider } from './index'
import { Card } from '../Card'
import { Heading, Paragraph } from '../../typography'

export default {
  title: 'data-display/Divider',
  component: Divider,
} as Meta

export function Horizontal() {
  return (
    <Card csx={{ width: 500 }}>
      <Heading csx={{ marginBottom: 2 }}>Tolerance</Heading>
      <Paragraph>
        Allows orders to be placed even if they pass X% of the account`s credit
        limit. Tolerance is set per account.
      </Paragraph>
      <Divider orientation="horizontal" csx={{ marginY: 6 }} />
      <Heading csx={{ marginBottom: 2 }}>Automatic account creation</Heading>
      <Paragraph>
        Allows users who have not been previously credited to close a purchase.
      </Paragraph>
    </Card>
  )
}

export function Vertical() {
  return (
    <Card
      csx={{
        display: 'flex',
        width: 500,
        justifyContent: 'center',
      }}
    >
      <onda.div csx={{ width: '1/2' }}>
        <Heading csx={{ marginY: 2 }}>Cards</Heading>
        <Paragraph>
          In Cards, your customer is given autonomy to manage credit cards
          related to his account, and can add, remove or edit credit card data.
        </Paragraph>
      </onda.div>
      <Divider orientation="vertical" csx={{ marginX: 6 }} />
      <onda.div csx={{ width: '1/2' }}>
        <Heading csx={{ marginY: 2 }}>Personal data</Heading>
        <Paragraph>
          In this section, the user can manage their personal data registered on
          the store site.
        </Paragraph>
      </onda.div>
    </Card>
  )
}
