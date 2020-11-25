import React from 'react'
import { Meta, Story } from '@storybook/react'

import { CollapsibleGroup, CollapsibleGroupProps } from './index'
import { useCollapsible } from '../Collapsible'
import { Text } from '../Text'
import { Set } from '../Set'

export default {
  title: 'components/CollapsibleGroup',
  component: CollapsibleGroup,
} as Meta

export const Basic: Story<CollapsibleGroupProps> = () => {
  const promos = useCollapsible()
  const marketing = useCollapsible()

  return (
    <CollapsibleGroup styleOverrides={{ width: 400 }}>
      <CollapsibleGroup.Item state={promos}>
        <CollapsibleGroup.Item.Header label="Promos" />
        <CollapsibleGroup.Item.Content>
          <Text variant="action">
            APP BRINDE 458 - MOBFIQ R$ 99 TMP OFERTA - 899 OIS : CAE SEMANA -
            ALEMANA
          </Text>
        </CollapsibleGroup.Item.Content>
      </CollapsibleGroup.Item>
      <CollapsibleGroup.Item state={marketing}>
        <CollapsibleGroup.Item.Header label="Marketing" />
        <CollapsibleGroup.Item.Content>
          <Set orientation="vertical">
            <Text variant="small" styleOverrides={{ color: 'text.secondary' }}>
              Partner - app_ios
            </Text>
            <Text variant="small" styleOverrides={{ color: 'text.secondary' }}>
              Campaign - Campaing Name
            </Text>
          </Set>
        </CollapsibleGroup.Item.Content>
      </CollapsibleGroup.Item>
    </CollapsibleGroup>
  )
}

export const Nested: Story<CollapsibleGroupProps> = () => {
  const promosAndPartner = useCollapsible()
  const shipping = useCollapsible()
  const promos = useCollapsible()
  const marketing = useCollapsible()
  const packageOne = useCollapsible()
  const packageTwo = useCollapsible()

  const packages = ['Package #1', 'Package #2']

  function PromosContent() {
    return (
      <Text variant="action">
        APP BRINDE 458 - MOBFIQ R$ 99 TMP OFERTA - 899 OIS : CAE SEMANA -
        ALEMANA
      </Text>
    )
  }

  function PartnershipsContent() {
    return (
      <Set orientation="vertical">
        <Text variant="small" styleOverrides={{ color: 'text.secondary' }}>
          Partner - app_ios
        </Text>
        <Text variant="small" styleOverrides={{ color: 'text.secondary' }}>
          Campaign - Campaing Name
        </Text>
      </Set>
    )
  }

  function PackagesContent() {
    return (
      <Set orientation="vertical" spacing={2}>
        <Text variant="small" styleOverrides={{ color: 'primary.base' }}>
          N 00025755809
        </Text>
        <Text variant="small" styleOverrides={{ color: 'muted.0' }}>
          Total cost of items - 39,00 BRL
        </Text>
        <Text variant="small" styleOverrides={{ color: 'muted.0' }}>
          Type - Total Express
        </Text>
        <Text styleOverrides={{ color: 'primary.base' }}>
          Tracking - XSDFE231675
        </Text>
      </Set>
    )
  }

  function PromosGroup() {
    return (
      <CollapsibleGroup>
        <CollapsibleGroup.Item state={promos}>
          <CollapsibleGroup.Item.Header label="Promos" />
          <CollapsibleGroup.Item.Content>
            <PromosContent />
          </CollapsibleGroup.Item.Content>
        </CollapsibleGroup.Item>
        <CollapsibleGroup.Item state={marketing}>
          <CollapsibleGroup.Item.Header label="Marketing" />
          <CollapsibleGroup.Item.Content>
            <PartnershipsContent />
          </CollapsibleGroup.Item.Content>
        </CollapsibleGroup.Item>
      </CollapsibleGroup>
    )
  }

  function PackagesGroup() {
    return (
      <CollapsibleGroup>
        {packages.map((value, index) => {
          return (
            <CollapsibleGroup.Item
              state={index ? packageOne : packageTwo}
              key={index}
            >
              <CollapsibleGroup.Item.Header label={value} />
              <CollapsibleGroup.Item.Content>
                <PackagesContent />
              </CollapsibleGroup.Item.Content>
            </CollapsibleGroup.Item>
          )
        })}
      </CollapsibleGroup>
    )
  }

  return (
    <CollapsibleGroup styleOverrides={{ width: 400 }}>
      <CollapsibleGroup.Item state={promosAndPartner}>
        <CollapsibleGroup.Item.Header label="Promos and Partnerships" />
        <CollapsibleGroup.Item.Content>
          <PromosGroup />
        </CollapsibleGroup.Item.Content>
      </CollapsibleGroup.Item>
      <CollapsibleGroup.Item state={shipping}>
        <CollapsibleGroup.Item.Header label="Shipping" />
        <CollapsibleGroup.Item.Content>
          <PackagesGroup />
        </CollapsibleGroup.Item.Content>
      </CollapsibleGroup.Item>
    </CollapsibleGroup>
  )
}
