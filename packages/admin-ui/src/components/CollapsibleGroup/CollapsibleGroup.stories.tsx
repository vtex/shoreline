import React from 'react'
import type { Meta, Story } from '@storybook/react'

import type { CollapsibleGroupProps } from './index'
import { CollapsibleGroup } from './index'
import {
  Collapsible,
  CollapsibleHeader,
  CollapsibleContent,
  useCollapsibleState,
} from '../Collapsible'
import { Text } from '../Text'
import { Stack } from '../../stack'

export default {
  title: 'admin-ui/CollapsibleGroup',
  component: CollapsibleGroup,
} as Meta

export const Basic: Story<CollapsibleGroupProps> = () => {
  const promos = useCollapsibleState()
  const marketing = useCollapsibleState()

  return (
    <CollapsibleGroup csx={{ width: 400 }}>
      <Collapsible state={promos}>
        <CollapsibleHeader label="Promos" />
        <CollapsibleContent>
          <Text variant="action1">
            APP BRINDE 458 - MOBFIQ R$ 99 TMP OFERTA - 899 OIS : CAE SEMANA -
            ALEMANA
          </Text>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible state={marketing}>
        <CollapsibleHeader label="Marketing" />
        <CollapsibleContent>
          <Stack>
            <Text variant="detail" tone="secondary">
              Partner - app_ios
            </Text>
            <Text variant="detail" tone="secondary">
              Campaign - Campaing Name
            </Text>
          </Stack>
        </CollapsibleContent>
      </Collapsible>
    </CollapsibleGroup>
  )
}

export const Nested: Story<CollapsibleGroupProps> = () => {
  const promosAndPartner = useCollapsibleState()
  const shipping = useCollapsibleState()
  const promos = useCollapsibleState()
  const marketing = useCollapsibleState()
  const packageOne = useCollapsibleState()
  const packageTwo = useCollapsibleState()

  const packages = ['Package #1', 'Package #2']

  const PromosGroup = (
    <CollapsibleGroup>
      <Collapsible state={promos}>
        <CollapsibleHeader label="Promos" />
        <CollapsibleContent>
          <Text variant="action1">
            APP BRINDE 458 - MOBFIQ R$ 99 TMP OFERTA - 899 OIS : CAE SEMANA -
            ALEMANA
          </Text>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible state={marketing}>
        <CollapsibleHeader label="Marketing" />
        <CollapsibleContent>
          <Stack>
            <Text variant="detail" tone="secondary">
              Partner - app_ios
            </Text>
            <Text variant="detail" tone="secondary">
              Campaign - Campaing Name
            </Text>
          </Stack>
        </CollapsibleContent>
      </Collapsible>
    </CollapsibleGroup>
  )

  const PackagesGroup = (
    <CollapsibleGroup>
      {packages.map((value, index) => {
        return (
          <Collapsible state={index ? packageOne : packageTwo} key={index}>
            <CollapsibleHeader label={value} />
            <CollapsibleContent>
              <Stack>
                <Text variant="detail" tone="info">
                  N 00025755809
                </Text>
                <Text variant="detail" tone="secondary">
                  Total cost of items - 39,00 BRL
                </Text>
                <Text variant="detail" tone="secondary">
                  Type - Total Express
                </Text>
                <Text tone="info">Tracking - XSDFE231675</Text>
              </Stack>
            </CollapsibleContent>
          </Collapsible>
        )
      })}
    </CollapsibleGroup>
  )

  return (
    <CollapsibleGroup csx={{ width: 400 }}>
      <Collapsible state={promosAndPartner}>
        <CollapsibleHeader label="Promos and Partnerships" />
        <CollapsibleContent>{PromosGroup}</CollapsibleContent>
      </Collapsible>
      <Collapsible state={shipping}>
        <CollapsibleHeader label="Shipping" />
        <CollapsibleContent>{PackagesGroup}</CollapsibleContent>
      </Collapsible>
    </CollapsibleGroup>
  )
}
