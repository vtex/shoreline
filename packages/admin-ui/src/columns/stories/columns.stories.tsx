import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { palette } from '@vtex/admin-ui-core'

import { Box } from '../../box'
import { Columns, Column } from '../index'

export default {
  title: 'admin-ui-review/columns',
  component: Columns,
} as Meta

const primaryStyles = {
  padding: '$space-2',
  ...palette('purple'),
}

const invertedStyles = {
  padding: '$space-2',
  ...palette('teal'),
}

export const Playground: Story = (args) => {
  return (
    <Columns {...args}>
      <Column>
        <Box csx={primaryStyles}>6 Units</Box>
      </Column>
      <Column>
        <Box csx={invertedStyles}>6 Units</Box>
      </Column>
    </Columns>
  )
}

export const Auto = () => {
  return (
    <Columns space="$space-2">
      <Column>
        <Box csx={primaryStyles}>4 units</Box>
      </Column>
      <Column>
        <Box csx={invertedStyles}>4 units</Box>
      </Column>
      <Column>
        <Box csx={primaryStyles}>4 units</Box>
      </Column>
    </Columns>
  );
}

export const AutoGapless = () => {
  return (
    <Columns space="$space-0">
      <Column>
        <Box csx={primaryStyles}>6 units</Box>
      </Column>
      <Column>
        <Box csx={invertedStyles}>6 units</Box>
      </Column>
      <Column>
        <Box csx={primaryStyles}>6 units</Box>
      </Column>
    </Columns>
  );
}

export const Offset = () => {
  return (
    <Columns space="$space-0">
      <Column units={3}>
        <Box csx={primaryStyles}>3 units</Box>
      </Column>
      <Column offset="both" units={3}>
        <Box csx={invertedStyles}>3 units</Box>
      </Column>
      <Column units={3}>
        <Box csx={primaryStyles}>3 units</Box>
      </Column>
    </Columns>
  );
}

export const Units = () => {
  return (
    <Columns space="$space-2">
      <Column units={3}>
        <Box csx={primaryStyles}>3 units</Box>
      </Column>
      <Column units={6}>
        <Box csx={invertedStyles}>6 units</Box>
      </Column>
      <Column units={3}>
        <Box csx={primaryStyles}>3 units</Box>
      </Column>
    </Columns>
  );
}

export const ResponsiveUnits = () => {
  return (
    <Columns space={{ mobile: "$space-0", tablet: "$space-2" }}>
      <Column
        units={{ mobile: 12, tablet: 6 }}
        offset={{ mobile: 'none', tablet: 'right' }}
      >
        <Box csx={primaryStyles}>6 units</Box>
      </Column>
      <Column units={{ mobile: 12, tablet: 3 }}>
        <Box csx={invertedStyles}>3 units</Box>
      </Column>
    </Columns>
  );
}
