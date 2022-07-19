import React from 'react'
import type { Meta } from '@storybook/react'
import { IconPencil, IconCopy } from '@vtex/phosphor-icons'

import { Card, CardContent, CardActions, CardTitle, CardHeader } from '..'
import { Button } from '../../button'
import { Menu, MenuItem, MenuButton, useMenuState } from '../../menu'
import { Tag } from '../../tag'

export default {
  title: 'admin-ui-review/card',
  component: Card,
} as Meta

export const Example = () => {
  const menu = useMenuState()

  return (
    <Card csx={{ width: '1/2', margin: 4 }}>
      <CardHeader>
        <CardTitle label="Title">
          <Tag label="Short text" />
        </CardTitle>
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
      <CardContent csx={{ width: '100%', height: 250, bg: '$secondary' }} />
    </Card>
  )
}

export const Nested = () => {
  const menu = useMenuState()

  return (
    <Card csx={{ width: '1/2', margin: 4 }}>
      <CardHeader>
        <CardTitle label="Title">
          <Tag label="Short text" />
        </CardTitle>
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
      <CardContent>
        <Card>
          <CardHeader>
            <CardTitle label="Title" />
          </CardHeader>
          <CardContent csx={{ width: '100%', height: 250, bg: '$secondary' }} />
        </Card>
      </CardContent>
    </Card>
  )
}
