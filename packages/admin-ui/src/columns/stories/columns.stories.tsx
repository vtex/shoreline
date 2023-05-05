import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { csx, palette } from '@vtex/admin-ui-core'

import { Columns, Column } from '../index'

export default {
  title: 'admin-ui-review/columns',
  component: Columns,
} as Meta

const primaryStyles = csx({
  padding: '$space-2',
  ...palette('purple'),
})

const invertedStyles = csx({
  padding: '$space-2',
  ...palette('teal'),
})

export const Playground: Story = (args) => {
  return (
    <Columns {...args}>
      <Column>
        <div className={primaryStyles}>6 Units</div>
      </Column>
      <Column>
        <div className={invertedStyles}>6 Units</div>
      </Column>
    </Columns>
  )
}

export const Auto = () => {
  return (
    <Columns space="$space-2">
      <Column>
        <div className={primaryStyles}>4 units</div>
      </Column>
      <Column>
        <div className={invertedStyles}>4 units</div>
      </Column>
      <Column>
        <div className={primaryStyles}>4 units</div>
      </Column>
    </Columns>
  )
}

export const AutoGapless = () => {
  return (
    <Columns space="$space-0">
      <Column>
        <div className={primaryStyles}>6 units</div>
      </Column>
      <Column>
        <div className={invertedStyles}>6 units</div>
      </Column>
      <Column>
        <div className={primaryStyles}>6 units</div>
      </Column>
    </Columns>
  )
}

export const Offset = () => {
  return (
    <Columns space="$space-0">
      <Column units={3}>
        <div className={primaryStyles}>3 units</div>
      </Column>
      <Column offset="both" units={3}>
        <div className={invertedStyles}>3 units</div>
      </Column>
      <Column units={3}>
        <div className={primaryStyles}>3 units</div>
      </Column>
    </Columns>
  )
}

export const Units = () => {
  return (
    <Columns space="$space-2">
      <Column units={3}>
        <div className={primaryStyles}>3 units</div>
      </Column>
      <Column units={6}>
        <div className={invertedStyles}>6 units</div>
      </Column>
      <Column units={3}>
        <div className={primaryStyles}>3 units</div>
      </Column>
    </Columns>
  )
}

export const ResponsiveUnits = () => {
  return (
    <Columns space={{ mobile: '$space-0', tablet: '$space-2' }}>
      <Column
        units={{ mobile: 12, tablet: 6 }}
        offset={{ mobile: 'none', tablet: 'right' }}
      >
        <div className={primaryStyles}>6 units</div>
      </Column>
      <Column units={{ mobile: 12, tablet: 3 }}>
        <div className={invertedStyles}>3 units</div>
      </Column>
    </Columns>
  )
}
