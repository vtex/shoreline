import React from 'react'
import type { Meta } from '@storybook/react'
import { IconPencil, IconCopy, IconImageSquare } from '@vtex/phosphor-icons'

import {
  Card,
  CardContent,
  CardActions,
  CardTitle,
  CardInfo,
  CardHeader,
} from '..'
import { Menu, MenuItem, MenuButton, useMenuState } from '../../menu'

import { Button } from '../../button'
import { Center } from '../../center'
import { Tag } from '../../tag'

export default {
  title: 'admin-ui-review/card/complexity',
  component: Card,
} as Meta

export const Zero = () => {
  return (
    <Card csx={{ width: '1/2', margin: '$space-4' }}>
      <Center csx={{ width: '100%', height: 250, bg: '$secondary' }}>
        Content
      </Center>
    </Card>
  )
}

export const LevelOne = () => {
  return (
    <Card csx={{ width: '1/2', margin: '$space-4' }}>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent csx={{ width: '100%', bg: '$secondary' }}>
        <Center csx={{ height: 250 }}>Content</Center>
      </CardContent>
    </Card>
  )
}

export const LevelTwo = () => {
  return (
    <Card csx={{ width: '1/2', margin: '$space-4' }}>
      <CardHeader>
        <CardTitle>Title</CardTitle>
        <CardActions>
          <Button variant="tertiary">Label</Button>
          <Button variant="secondary">Label</Button>
        </CardActions>
      </CardHeader>
      <CardContent csx={{ width: '100%', bg: '$secondary' }}>
        <Center csx={{ height: 250 }}>Content</Center>
      </CardContent>
    </Card>
  )
}

export const Full = () => {
  const menu = useMenuState()

  return (
    <Card csx={{ width: '1/2', margin: '$space-4' }}>
      <CardHeader>
        <CardInfo>
          <IconImageSquare />
          <CardTitle>Title</CardTitle>
          <Tag label="Short text" />
        </CardInfo>
        <CardActions>
          <Button variant="tertiary">Label</Button>
          <Button variant="secondary">Label</Button>
          <MenuButton variant="neutralTertiary" labelHidden state={menu} />
          <Menu state={menu}>
            <MenuItem label="Edit" icon={<IconPencil />} />
            <MenuItem label="Duplicate" icon={<IconCopy />} disabled />
          </Menu>
        </CardActions>
      </CardHeader>
      <CardContent csx={{ width: '100%', bg: '$secondary' }}>
        <Center csx={{ height: 250 }}>Content</Center>
      </CardContent>
    </Card>
  )
}
