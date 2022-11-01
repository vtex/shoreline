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
  CardImage,
} from '..'
import { Button } from '../../button'
import { Menu, MenuItem, MenuButton, useMenuState } from '../../menu'
import { Tag } from '../../tag'

export default {
  title: 'admin-ui-review/card/usage',
  component: Card,
} as Meta

export const Single = () => {
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
          <MenuButton
            bleedY
            variant="neutralTertiary"
            labelHidden
            state={menu}
          />
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
    <Card csx={{ width: '1/2', margin: '$space-4' }}>
      <CardHeader>
        <CardInfo>
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
      <CardContent>
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
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
      </CardContent>
    </Card>
  )
}

export const WithImage = () => {
  const menu = useMenuState()

  return (
    <Card csx={{ width: '1/2', margin: '$space-4' }}>
      <CardHeader>
        <CardInfo>
          <CardImage
            src="https://vtex.com/wp-content/uploads/2020/04/VTEX-Brand.svg"
            alt="Image description"
          />
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
      <CardContent csx={{ width: '100%', height: 250, bg: '$secondary' }} />
    </Card>
  )
}
