import React from 'react'
import { Meta, Story } from '@storybook/react'

import { CollapsibleTree, CollapsibleTreeProps } from './index'
import { useCollapsible } from '../Collapsible'
import { Text } from '../Text'
import { Set } from '../Set'

export default {
  title: 'beta/CollapsibleTree',
  component: CollapsibleTree,
} as Meta

export const Basic: Story<CollapsibleTreeProps> = () => {
  const promos = useCollapsible()
  const marketing = useCollapsible()

  return (
    <CollapsibleTree styleOverrides={{ width: 400 }}>
      <CollapsibleTree.Item state={promos}>
        <CollapsibleTree.Item.Header label="Promos" />
        <CollapsibleTree.Item.Content>
          <Set orientation="vertical">
            <Text variant="action">APP BRINDE - 59458 - MOBFIQ R$99</Text>
            <Text variant="action">APP FRETE 99 - MOBFIQ</Text>
            <br />
            <Text variant="action">TMP OFERTA - 899 OIS : CAE SEMANA</Text>
            <Text variant="action">ALEMANA</Text>
            <br />
            <Text variant="action">FLETE GRATIS - CUP : PLAN SOS 28092020</Text>
          </Set>
        </CollapsibleTree.Item.Content>
      </CollapsibleTree.Item>
      <CollapsibleTree.Item state={marketing}>
        <CollapsibleTree.Item.Header label="Marketing" />
        <CollapsibleTree.Item.Content>
          <Set orientation="vertical">
            <Text variant="small" styleOverrides={{ color: 'muted.1' }}>
              Partner
            </Text>
            <Text variant="small">app_ios</Text>
            <br />
            <Text variant="small" styleOverrides={{ color: 'muted.1' }}>
              Campaign
            </Text>
            <Text variant="small">Campaign name</Text>
          </Set>
        </CollapsibleTree.Item.Content>
      </CollapsibleTree.Item>
    </CollapsibleTree>
  )
}

export const Nested: Story<CollapsibleTreeProps> = () => {
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
        <Text variant="small" styleOverrides={{ color: 'muted.1' }}>
          Partner
        </Text>
        <Text variant="small">app_ios</Text>
        <br />
        <Text variant="small" styleOverrides={{ color: 'muted.1' }}>
          Campaign
        </Text>
        <Text variant="small">Campaign name</Text>
      </>
    )
  }

  function PackagesContent() {
    return (
      <>
        <Text variant="small" styleOverrides={{ color: 'muted.1' }}>
          Bill
        </Text>
        <Text variant="small" styleOverrides={{ color: 'primary.base' }}>
          N 00025755809
        </Text>
        <br />
        <Text variant="small" styleOverrides={{ color: 'muted.1' }}>
          Total cost of items
        </Text>
        <Text styleOverrides={{ color: 'muted.1' }}>39,00 BRL</Text>
        <br />
        <Text variant="small" styleOverrides={{ color: 'muted.1' }}>
          Type
        </Text>
        <Text>Total Express</Text>
        <br />
        <Text variant="small" styleOverrides={{ color: 'muted.1' }}>
          Tracking
        </Text>
        <Text styleOverrides={{ color: 'muted.1' }}>XSDFE231675</Text>{' '}
      </>
    )
  }

  return (
    <CollapsibleTree styleOverrides={{ width: 400 }}>
      <CollapsibleTree.Item state={promosAndPartner}>
        <CollapsibleTree.Item.Header label="Promos and Partnerships" />
        <CollapsibleTree.Item.Content>
          <CollapsibleTree>
            <CollapsibleTree.Item state={promos}>
              <CollapsibleTree.Item.Header label="Promos" />
              <CollapsibleTree.Item.Content>
                <Set orientation="vertical">
                  <PromosContent />
                </Set>
              </CollapsibleTree.Item.Content>
            </CollapsibleTree.Item>
            <CollapsibleTree.Item state={marketing}>
              <CollapsibleTree.Item.Header label="Marketing" />
              <CollapsibleTree.Item.Content>
                <Set orientation="vertical">
                  <PartnershipsContent />
                </Set>
              </CollapsibleTree.Item.Content>
            </CollapsibleTree.Item>
          </CollapsibleTree>
        </CollapsibleTree.Item.Content>
      </CollapsibleTree.Item>
      <CollapsibleTree.Item state={shipping}>
        <CollapsibleTree.Item.Header label="Shipping" />
        <CollapsibleTree.Item.Content>
          <CollapsibleTree>
            {packages.map((value, index) => {
              return (
                <CollapsibleTree.Item
                  state={index ? packageOne : packageTwo}
                  key={index}
                >
                  <CollapsibleTree.Item.Header label={value} />
                  <CollapsibleTree.Item.Content>
                    <Set orientation="vertical">
                      <PackagesContent />
                    </Set>
                  </CollapsibleTree.Item.Content>
                </CollapsibleTree.Item>
              )
            })}
          </CollapsibleTree>
        </CollapsibleTree.Item.Content>
      </CollapsibleTree.Item>
    </CollapsibleTree>
  )
}
