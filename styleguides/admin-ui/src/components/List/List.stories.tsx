import React, { useState } from 'react'
import { Meta, Story } from '@storybook/react'
import styled from '@emotion/styled'

import { ListDensity, List, ListProps } from './index'
import { Text } from '../Text'
import { Toggle } from '../Toggle'
import { Card } from '../Card'
import {
  IconCarousel,
  IconShelf,
  IconInfoCard,
  IconRichText,
  IconVitrine,
} from '../../../assets/ComponentIcons'
import { Ballon } from '../../../assets/Ballon'
import { WrappingBox } from '../../../assets/WrappingBox'
import { Stairs } from '../../../assets/Stairs'
import { Menu } from '../Menu'
import { IconSettings } from '../../icons'
import { Button } from '../Button'

export default {
  title: 'beta/List',
  component: List,
} as Meta

export const Compact: Story<ListProps> = () => (
  <Card w={512}>
    <List
      sx={{ div: { justifyContent: 'space-between' } }}
      density="compact"
      label="General"
    >
      <List.Item>
        <Text>Default markup for external integration</Text>
        <Text c="muted.1">100%</Text>
      </List.Item>
      <List.Item>
        <Text>Use price variation limit</Text>
        <Toggle state />
      </List.Item>
      <List.Item>
        <Text>Inherit prices from parent account</Text>
        <Toggle state />
      </List.Item>
      <List.Item>
        <Text>Overwrite seller prices</Text>
        <Toggle state />
      </List.Item>
    </List>
  </Card>
)

export const Regular: Story<ListProps> = () => {
  const list = [
    { id: '1', icon: IconCarousel, title: 'Carousel' },
    { id: '2', icon: IconShelf, title: 'Shelf' },
    { id: '3', icon: IconInfoCard, title: 'Infocard' },
    { id: '4', icon: IconRichText, title: 'Rich text' },
    { id: '5', icon: IconVitrine, title: 'Vitrine by Corebiz™' },
  ]

  return (
    <Card w={512}>
      <List>
        {list.map(({ id, icon: Icon, title }) => (
          <List.Item key={id}>
            <Icon />
            <List.TextGroup
              ml="4"
              title={title}
              subtitle="Short description about the block"
            />
          </List.Item>
        ))}
      </List>
    </Card>
  )
}

export const Comfortable: Story<ListProps> = () => {
  const list = [
    {
      id: '1',
      icon: IconCarousel,
      title: 'Received SKUs: Bulk approval',
      subtitle: 'July 4, 2020',
      description: `Marketplaces manage their sellers products from the Received
    SKUs dashboard, where you can review and approve products sent
    by sellers. On the dashboard, you can bulk select SKUs,
    approving, or rejecting items all at once.`,
    },
    {
      id: '2',
      icon: IconShelf,
      title: `Shelf Block`,
      subtitle: 'July 4, 2020',
      description: `A critical part of a B2B operation is the segmentation of prices
      and rates according to the buying company profile. The rules
      change from store to store, but factors such as the buyers
      location, type of order and payment method.`,
    },
    {
      id: '3',
      icon: IconInfoCard,
      title: `Samsung Pay: more flexible payments thanks to the new digital
      wallet`,
      subtitle: 'July 4, 2020',
      description: `Marketplaces manage their sellers products from the Received
      SKUs dashboard, where you can review and approve products sent
      by sellers. On the dashboard, you can bulk select SKUs,
      approving, or rejecting items all at once.`,
    },
  ]

  return (
    <Card w={800}>
      <List density="comfortable">
        {list.map(({ id, icon: Icon, ...info }) => (
          <List.Item key={id}>
            <Icon />
            <List.TextGroup ml="4" {...info} descLineCount={1} />
          </List.Item>
        ))}
      </List>
    </Card>
  )
}

export const Adaptative: Story<ListProps> = () => {
  const [density, setDensity] = useState<ListDensity>('comfortable')
  const list = [
    {
      id: '1',
      icon: IconCarousel,
      title: 'Carousel',
      subtitle: 'Short description about the block',
    },
    {
      id: '2',
      icon: IconShelf,
      title: `Shelf`,
      subtitle: 'Short description about the block',
    },
    {
      id: '3',
      icon: IconInfoCard,
      title: `Infocard`,
      subtitle: 'Short description about the block',
    },
  ]

  return (
    <Card w={800} display="flex" direction="col">
      <Menu
        aria-label="density menu"
        placement="bottom-end"
        disclosure={
          <Button sx={{ alignSelf: 'flex-end' }} icon={<IconSettings />} />
        }
      >
        <Menu.Item onClick={() => setDensity('compact')}>Compact</Menu.Item>
        <Menu.Item onClick={() => setDensity('regular')}>Regular</Menu.Item>
        <Menu.Item onClick={() => setDensity('comfortable')}>
          Comfortable
        </Menu.Item>
      </Menu>
      <List density={density}>
        {list.map(({ id, icon: Icon, title, subtitle }) => (
          <List.Item key={id}>
            <Icon />
            <List.TextGroup
              ml="4"
              title={title}
              subtitle={subtitle}
              descLineCount={3}
            />
          </List.Item>
        ))}
      </List>
    </Card>
  )
}

export const Styled: Story<ListProps> = () => {
  const list = [
    {
      id: '1',
      image: Ballon,
      title: 'Received SKUs: Bulk approval',
      subtitle: 'July 4, 2020',
      description: `Marketplaces manage their sellers products from the Received
    SKUs dashboard, where you can review and approve products sent
    by sellers. On the dashboard, you can bulk select SKUs,
    approving, or rejecting items all at once.`,
    },
    {
      id: '2',
      image: WrappingBox,
      title: `B2B: Segment prices directly in the purchase flow using our new
      Order Configuration app`,
      subtitle: 'July 4, 2020',
      description: `A critical part of a B2B operation is the segmentation of prices
      and rates according to the buying company profile. The rules
      change from store to store, but factors such as the buyers
      location, type of order and payment method.`,
    },
    {
      id: '3',
      image: Stairs,
      title: `Samsung Pay: more flexible payments thanks to the new digital
      wallet`,
      subtitle: 'July 4, 2020',
      description: `Marketplaces manage their sellers products from the Received
      SKUs dashboard, where you can review and approve products sent
      by sellers. On the dashboard, you can bulk select SKUs,
      approving, or rejecting items all at once.`,
    },
  ]

  const Announcement = styled(List.Item)`
    height: 208px;
    svg,
    img {
      min-width: 240px;
      max-width: 240px;
      min-height: 160px;
      max-height: 160px;
    }
  `

  return (
    <Card w={800}>
      <List label="Annoncements List">
        {list.map(({ id, image: Image, ...info }) => (
          <Announcement key={id}>
            <Image />
            <List.TextGroup ml="4" {...info} descLineCount={3} />
          </Announcement>
        ))}
      </List>
    </Card>
  )
}
