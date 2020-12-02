import React from 'react'
import { Meta, Story } from '@storybook/react'

import { CollapsibleGroup, CollapsibleGroupProps } from './index'
import { Collapsible, useCollapsible } from '../Collapsible'
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
      <Collapsible state={promos}>
        <Collapsible.Header label="Promos" />
        <Collapsible.Content>
          <Text variant="action">
            APP BRINDE 458 - MOBFIQ R$ 99 TMP OFERTA - 899 OIS : CAE SEMANA -
            ALEMANA
          </Text>
        </Collapsible.Content>
      </Collapsible>
      <Collapsible state={marketing}>
        <Collapsible.Header label="Marketing" />
        <Collapsible.Content>
          <Set orientation="vertical">
            <Text variant="small" styleOverrides={{ color: 'text.secondary' }}>
              Partner - app_ios
            </Text>
            <Text variant="small" styleOverrides={{ color: 'text.secondary' }}>
              Campaign - Campaing Name
            </Text>
          </Set>
        </Collapsible.Content>
      </Collapsible>
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

  const PromosGroup = (
    <CollapsibleGroup>
      <Collapsible state={promos}>
        <Collapsible.Header label="Promos" />
        <Collapsible.Content>
          <Text variant="action">
            APP BRINDE 458 - MOBFIQ R$ 99 TMP OFERTA - 899 OIS : CAE SEMANA -
            ALEMANA
          </Text>
        </Collapsible.Content>
      </Collapsible>
      <Collapsible state={marketing}>
        <Collapsible.Header label="Marketing" />
        <Collapsible.Content>
          <Set orientation="vertical">
            <Text variant="small" styleOverrides={{ color: 'text.secondary' }}>
              Partner - app_ios
            </Text>
            <Text variant="small" styleOverrides={{ color: 'text.secondary' }}>
              Campaign - Campaing Name
            </Text>
          </Set>
        </Collapsible.Content>
      </Collapsible>
    </CollapsibleGroup>
  )

  const PackagesGroup = (
    <CollapsibleGroup>
      {packages.map((value, index) => {
        return (
          <Collapsible state={index ? packageOne : packageTwo} key={index}>
            <Collapsible.Header label={value} />
            <Collapsible.Content>
              <Set orientation="vertical" spacing={2}>
                <Text
                  variant="small"
                  styleOverrides={{ color: 'primary.base' }}
                >
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
            </Collapsible.Content>
          </Collapsible>
        )
      })}
    </CollapsibleGroup>
  )

  return (
    <CollapsibleGroup styleOverrides={{ width: 400 }}>
      <Collapsible state={promosAndPartner}>
        <Collapsible.Header label="Promos and Partnerships" />
        <Collapsible.Content>{PromosGroup}</Collapsible.Content>
      </Collapsible>
      <Collapsible state={shipping}>
        <Collapsible.Header label="Shipping" />
        <Collapsible.Content>{PackagesGroup}</Collapsible.Content>
      </Collapsible>
    </CollapsibleGroup>
  )
}
