import React from 'react'
import { Meta, Story } from '@storybook/react'

import { CollapsibleGroup, CollapsibleGroupProps } from './index'
import { useCollapsible } from '../Collapsible'
import { Text } from '../Text'
import { Set } from '../Set'

export default {
  title: 'beta/CollapsibleGroup',
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
          <Set orientation="vertical">
            <Text variant="action">APP BRINDE - 59458 - MOBFIQ R$99</Text>
            <Text variant="action">APP FRETE 99 - MOBFIQ</Text>
            <br />
            <Text variant="action">TMP OFERTA - 899 OIS : CAE SEMANA</Text>
            <Text variant="action">ALEMANA</Text>
            <br />
            <Text variant="action">FLETE GRATIS - CUP : PLAN SOS 28092020</Text>
          </Set>
        </CollapsibleGroup.Item.Content>
      </CollapsibleGroup.Item>
      <CollapsibleGroup.Item state={marketing}>
        <CollapsibleGroup.Item.Header label="Marketing" />
        <CollapsibleGroup.Item.Content>
          <Set orientation="vertical">
            <Text variant="small" styleOverrides={{ color: 'muted.2' }}>
              Partner
            </Text>
            <Text variant="small">app_ios</Text>
            <br />
            <Text variant="small" styleOverrides={{ color: 'muted.2' }}>
              Campaign
            </Text>
            <Text variant="small">Campaign name</Text>
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
      <>
        <Text variant="action">APP BRINDE - 59458 - MOBFIQ R$99</Text>
        <Text variant="action">APP FRETE 99 - MOBFIQ</Text>
        <br />
        <Text variant="action">TMP OFERTA - 899 OIS : CAE SEMANA</Text>
        <Text variant="action">ALEMANA</Text>
        <br />
        <Text variant="action">FLETE GRATIS - CUP : PLAN SOS 28092020</Text>
      </>
    )
  }

  function PartnershipsContent() {
    return (
      <>
        <Text variant="small" styleOverrides={{ color: 'muted.2' }}>
          Partner
        </Text>
        <Text variant="small">app_ios</Text>
        <br />
        <Text variant="small" styleOverrides={{ color: 'muted.2' }}>
          Campaign
        </Text>
        <Text variant="small">Campaign name</Text>
      </>
    )
  }

  function PackagesContent() {
    return (
      <>
        <Text variant="small" styleOverrides={{ color: 'muted.2' }}>
          Bill
        </Text>
        <Text variant="small" styleOverrides={{ color: 'primary.base' }}>
          N 00025755809
        </Text>
        <br />
        <Text variant="small" styleOverrides={{ color: 'muted.2' }}>
          Total cost of items
        </Text>
        <Text styleOverrides={{ color: 'muted.2' }}>39,00 BRL</Text>
        <br />
        <Text variant="small" styleOverrides={{ color: 'muted.2' }}>
          Type
        </Text>
        <Text>Total Express</Text>
        <br />
        <Text variant="small" styleOverrides={{ color: 'muted.2' }}>
          Tracking
        </Text>
        <Text styleOverrides={{ color: 'muted.2' }}>XSDFE231675</Text>{' '}
      </>
    )
  }

  return (
    <CollapsibleGroup styleOverrides={{ width: 400 }}>
      <CollapsibleGroup.Item state={promosAndPartner}>
        <CollapsibleGroup.Item.Header label="Promos and Partnerships" />
        <CollapsibleGroup.Item.Content>
          <CollapsibleGroup>
            <CollapsibleGroup.Item state={promos}>
              <CollapsibleGroup.Item.Header label="Promos" />
              <CollapsibleGroup.Item.Content>
                <Set orientation="vertical">
                  <PromosContent />
                </Set>
              </CollapsibleGroup.Item.Content>
            </CollapsibleGroup.Item>
            <CollapsibleGroup.Item state={marketing}>
              <CollapsibleGroup.Item.Header label="Marketing" />
              <CollapsibleGroup.Item.Content>
                <Set orientation="vertical">
                  <PartnershipsContent />
                </Set>
              </CollapsibleGroup.Item.Content>
            </CollapsibleGroup.Item>
          </CollapsibleGroup>
        </CollapsibleGroup.Item.Content>
      </CollapsibleGroup.Item>
      <CollapsibleGroup.Item state={shipping}>
        <CollapsibleGroup.Item.Header label="Shipping" />
        <CollapsibleGroup.Item.Content>
          <CollapsibleGroup>
            {packages.map((value, index) => {
              return (
                <CollapsibleGroup.Item
                  state={index ? packageOne : packageTwo}
                  key={index}
                >
                  <CollapsibleGroup.Item.Header label={value} />
                  <CollapsibleGroup.Item.Content>
                    <Set orientation="vertical">
                      <PackagesContent />
                    </Set>
                  </CollapsibleGroup.Item.Content>
                </CollapsibleGroup.Item>
              )
            })}
          </CollapsibleGroup>
        </CollapsibleGroup.Item.Content>
      </CollapsibleGroup.Item>
    </CollapsibleGroup>
  )
}
