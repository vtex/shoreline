import React from 'react'
import { Meta, Story } from '@storybook/react'

import { CollapsibleGroup, CollapsibleGroupProps } from './index'
import { useCollapsible } from '../Collapsible'
import { Text } from '../Text'

export default {
  title: 'beta/CollapsibleGroup',
  component: CollapsibleGroup,
} as Meta

export const Basic: Story<CollapsibleGroupProps> = () => {
  const promos = useCollapsible()
  const marketing = useCollapsible()

  return (
    <CollapsibleGroup w={400}>
      <CollapsibleGroup.Item state={promos}>
        <CollapsibleGroup.Item.Header label="Promos" />
        <CollapsibleGroup.Item.Content display="flex" direction="col">
          <Text text="action">APP BRINDE - 59458 - MOBFIQ R$99</Text>
          <Text text="action">APP FRETE 99 - MOBFIQ</Text>
          <br />
          <Text text="action">TMP OFERTA - 899 OIS : CAE SEMANA</Text>
          <Text text="action">ALEMANA</Text>
          <br />
          <Text text="action">FLETE GRATIS - CUP : PLAN SOS 28092020</Text>
        </CollapsibleGroup.Item.Content>
      </CollapsibleGroup.Item>
      <CollapsibleGroup.Item state={marketing}>
        <CollapsibleGroup.Item.Header label="Marketing" />
        <CollapsibleGroup.Item.Content display="flex" direction="col">
          <Text text="small" styleOverrides={{ color: 'muted.2' }}>
            Partner
          </Text>
          <Text text="small">app_ios</Text>
          <br />
          <Text text="small" styleOverrides={{ color: 'muted.2' }}>
            Campaign
          </Text>
          <Text text="small">Campaign name</Text>
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
        <Text text="action">APP BRINDE - 59458 - MOBFIQ R$99</Text>
        <Text text="action">APP FRETE 99 - MOBFIQ</Text>
        <br />
        <Text text="action">TMP OFERTA - 899 OIS : CAE SEMANA</Text>
        <Text text="action">ALEMANA</Text>
        <br />
        <Text text="action">FLETE GRATIS - CUP : PLAN SOS 28092020</Text>
      </>
    )
  }

  function PartnershipsContent() {
    return (
      <>
        <Text text="small" styleOverrides={{ color: 'muted.2' }}>
          Partner
        </Text>
        <Text text="small">app_ios</Text>
        <br />
        <Text text="small" styleOverrides={{ color: 'muted.2' }}>
          Campaign
        </Text>
        <Text text="small">Campaign name</Text>
      </>
    )
  }

  function PackagesContent() {
    return (
      <>
        <Text text="small" styleOverrides={{ color: 'muted.2' }}>
          Bill
        </Text>
        <Text text="small" styleOverrides={{ color: 'primary.base' }}>
          N 00025755809
        </Text>
        <br />
        <Text text="small" styleOverrides={{ color: 'muted.2' }}>
          Total cost of items
        </Text>
        <Text styleOverrides={{ color: 'muted.2' }}>39,00 BRL</Text>
        <br />
        <Text text="small" styleOverrides={{ color: 'muted.2' }}>
          Type
        </Text>
        <Text>Total Express</Text>
        <br />
        <Text text="small" styleOverrides={{ color: 'muted.2' }}>
          Tracking
        </Text>
        <Text styleOverrides={{ color: 'muted.2' }}>XSDFE231675</Text>{' '}
      </>
    )
  }

  return (
    <CollapsibleGroup w={400}>
      <CollapsibleGroup.Item state={promosAndPartner}>
        <CollapsibleGroup.Item.Header label="Promos and Partnerships" />
        <CollapsibleGroup.Item.Content>
          <CollapsibleGroup>
            <CollapsibleGroup.Item state={promos}>
              <CollapsibleGroup.Item.Header label="Promos" />
              <CollapsibleGroup.Item.Content display="flex" direction="col">
                <PromosContent />
              </CollapsibleGroup.Item.Content>
            </CollapsibleGroup.Item>
            <CollapsibleGroup.Item state={marketing}>
              <CollapsibleGroup.Item.Header label="Marketing" />
              <CollapsibleGroup.Item.Content display="flex" direction="col">
                <PartnershipsContent />
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
                  <CollapsibleGroup.Item.Content display="flex" direction="col">
                    <PackagesContent />
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
