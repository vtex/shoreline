import React from 'react'
import { Meta, Story } from '@storybook/react'

import { CollapsibleGroup, CollapsibleGroupProps } from './index'
import { Collapsible, useCollapsible } from '../Collapsible'
import { Text } from '../Text'

export default {
  title: 'beta/CollapsibleGroup',
  component: CollapsibleGroup,
} as Meta

export const Basic: Story<CollapsibleGroupProps> = () => {
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
        <Text variant="small" c="muted.2" fs="0">
          Partner
        </Text>
        <Text variant="small">app_ios</Text>
        <br />
        <Text variant="small" c="muted.2" fs="0">
          Campaign
        </Text>
        <Text variant="small">Campaign name</Text>
      </>
    )
  }

  return (
    <CollapsibleGroup w={400}>
      <Collapsible state={promosAndPartner}>
        <Collapsible.Header label="Promos and Partnerships" />
        <Collapsible.Content>
          <CollapsibleGroup>
            <Collapsible state={promos}>
              <Collapsible.Header label="Promos" />
              <Collapsible.Content display="flex" direction="col">
                <PromosContent />
              </Collapsible.Content>
            </Collapsible>
            <Collapsible state={marketing}>
              <Collapsible.Header label="Marketing" />
              <Collapsible.Content display="flex" direction="col">
                <PartnershipsContent />
              </Collapsible.Content>
            </Collapsible>
          </CollapsibleGroup>
        </Collapsible.Content>
      </Collapsible>
      <Collapsible state={shipping}>
        <Collapsible.Header label="Shipping" />
        <Collapsible.Content>
          <CollapsibleGroup>
            {packages.map((value, index) => {
              return (
                <Collapsible
                  state={index ? packageOne : packageTwo}
                  key={index}
                >
                  <Collapsible.Header label={value} />
                  <Collapsible.Content display="flex" direction="col">
                    <Text variant="small" c="muted.2" fs="0">
                      Bill
                    </Text>
                    <Text c="primary.base">N 00025755809</Text>
                    <br />
                    <Text variant="small" c="muted.2" fs="0">
                      Total cost of items
                    </Text>
                    <Text c="text">39,00 BRL</Text>
                    <br />
                    <Text variant="small" c="muted.2" fs="0">
                      Type
                    </Text>
                    <Text>Total Express</Text>
                    <br />
                    <Text variant="small" c="muted.2" fs="0">
                      Tracking
                    </Text>
                    <Text c="primary.base">XSDFE231675</Text>
                  </Collapsible.Content>
                </Collapsible>
              )
            })}
          </CollapsibleGroup>
        </Collapsible.Content>
      </Collapsible>
    </CollapsibleGroup>
  )
}
