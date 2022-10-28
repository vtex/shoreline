import React from 'react'
import type { Meta } from '@storybook/react'

import {
  IconTrash,
  IconPlus,
  IconPencil,
  IconArrowLineDown,
} from '@vtex/phosphor-icons'

import { Stack } from '../stack'
import { Box } from '../box'
import { MenuButton, Menu, MenuItem, MenuDivider, useMenuState } from './index'
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useModalState,
} from '../components/Modal'
import { Text } from '../components/Text'
import { Button } from '../button'
import { Flex } from '../flex'
import { Heading } from '../components/Heading'

export default {
  title: 'admin-ui-review/menu',
  component: Menu,
} as Meta

export const Playground = () => {
  const menuState = useMenuState()
  const largeMenuState = useMenuState()

  return (
    <Stack direction="row">
      <>
        <MenuButton state={menuState} />
        <Menu state={menuState}>
          <MenuItem label="Create" icon={<IconPlus />} disabled />
          <MenuItem label="Edit" icon={<IconPencil />} />
          <MenuItem label="Download" icon={<IconArrowLineDown />} />
          <MenuDivider />
          <MenuItem label="Delete" icon={<IconTrash />} critical />
        </Menu>
      </>
      <>
        <MenuButton state={largeMenuState} size="large" />
        <Menu state={largeMenuState}>
          <MenuItem label="Create" icon={<IconPlus />} disabled />
          <MenuItem label="Edit" icon={<IconPencil />} />
          <MenuItem label="Download" icon={<IconArrowLineDown />} />
          <MenuDivider />
          <MenuItem label="Delete" icon={<IconTrash />} critical />
        </Menu>
      </>
    </Stack>
  )
}

export const CustomMenu = () => {
  const state = useMenuState()

  return (
    <Stack>
      <MenuButton state={state} label="Custom menu" />
      <Menu state={state}>
        <MenuItem label="Option 1" />
        <MenuItem label="Option 2" />
        <MenuItem label="Option 3" />
      </Menu>
    </Stack>
  )
}

export const IconOnly = () => {
  const menuState = useMenuState()
  const largeMenuState = useMenuState()

  return (
    <Stack direction="row">
      <>
        <MenuButton state={menuState} labelHidden />
        <Menu state={menuState}>
          <MenuItem label="Create" icon={<IconPlus />} disabled />
          <MenuItem label="Edit" icon={<IconPencil />} />
          <MenuItem label="Download" icon={<IconArrowLineDown />} />
          <MenuDivider />
          <MenuItem label="Delete" icon={<IconTrash />} critical />
        </Menu>
      </>
      <>
        <MenuButton state={largeMenuState} size="large" labelHidden />
        <Menu state={largeMenuState}>
          <MenuItem label="Create" icon={<IconPlus />} disabled />
          <MenuItem label="Edit" icon={<IconPencil />} />
          <MenuItem label="Download" icon={<IconArrowLineDown />} />
          <MenuDivider />
          <MenuItem label="Delete" icon={<IconTrash />} critical />
        </Menu>
      </>
    </Stack>
  )
}

export const Variants = () => {
  const variants: any[] = [
    'primary',
    'secondary',
    'tertiary',
    'neutralTertiary',
  ]

  return (
    <>
      {variants.map((variant) => {
        const actionMenuState = useMenuState()
        const customMenuState = useMenuState()

        return (
          <Stack direction="row">
            <Stack>
              <MenuButton state={actionMenuState} variant={variant} />
              <Menu state={actionMenuState}>
                <MenuItem label="Create" icon={<IconPlus />} disabled />
                <MenuItem label="Edit" icon={<IconPencil />} />
                <MenuItem label="Download" icon={<IconArrowLineDown />} />
                <MenuDivider />
                <MenuItem label="Delete" icon={<IconTrash />} critical />
              </Menu>

              <MenuButton state={useMenuState()} variant={variant} disabled>
                Action Menu
              </MenuButton>
            </Stack>

            <Stack>
              <MenuButton
                state={customMenuState}
                variant={variant}
                label="Custom menu"
              />
              <Menu state={customMenuState}>
                <MenuItem label="Create" icon={<IconPlus />} disabled />
                <MenuItem label="Edit" icon={<IconPencil />} />
                <MenuItem label="Download" icon={<IconArrowLineDown />} />
                <MenuDivider />
                <MenuItem label="Delete" icon={<IconTrash />} critical />
              </Menu>

              <MenuButton
                state={useMenuState()}
                variant={variant}
                label="Custom menu"
                disabled
              />
            </Stack>
          </Stack>
        )
      })}
    </>
  )
}

export const HandleOnClickItem = () => {
  const menuState = useMenuState()
  const modalState = useModalState()

  return (
    <>
      <Stack>
        <MenuButton state={menuState} label="Modal options" />
        <Menu state={menuState}>
          <MenuItem
            label="Open custom dialog"
            onClick={() => modalState.show()}
          />
          <MenuItem
            label="Open native dialog"
            onClick={() => alert('Native dialog')}
          />
        </Menu>
      </Stack>
      <Box>
        <Modal aria-label="Publish modal" state={modalState} size="small">
          <ModalHeader title="Publish content" />
          <ModalContent>
            <Text>
              Are you sure you want to publish this content? These action cannot
              be undone.
            </Text>
          </ModalContent>
          <ModalFooter>
            <Button>Confirm</Button>
          </ModalFooter>
        </Modal>
      </Box>
    </>
  )
}

export const Bleed = () => {
  const bleedMenuState = useMenuState()
  const menuState = useMenuState()

  return <>
    <Box
      csx={{
        padding: '$space-3 $space-4',
        bg: '$secondary',
      }}
    >
      <Box
        csx={{
          bg: '$primary',
        }}
      >
        <Flex align="center" justify="space-between">
          <Heading>With bleed</Heading>
          <MenuButton state={bleedMenuState} bleedY bleedX />
          <Menu state={bleedMenuState}>
            <MenuItem label="Create" icon={<IconPlus />} disabled />
            <MenuItem label="Edit" icon={<IconPencil />} />
            <MenuItem label="Download" icon={<IconArrowLineDown />} />
            <MenuDivider />
            <MenuItem label="Delete" icon={<IconTrash />} critical />
          </Menu>
        </Flex>
      </Box>
    </Box>
    <Box
      csx={{
        padding: '$space-3 $space-4',
        bg: '$secondary',
      }}
    >
      <Box
        csx={{
          bg: '$primary',
        }}
      >
        <Flex align="center" justify="space-between">
          <Heading>Without bleed</Heading>
          <MenuButton state={menuState} />
          <Menu state={menuState}>
            <MenuItem label="Create" icon={<IconPlus />} disabled />
            <MenuItem label="Edit" icon={<IconPencil />} />
            <MenuItem label="Download" icon={<IconArrowLineDown />} />
            <MenuDivider />
            <MenuItem label="Delete" icon={<IconTrash />} critical />
          </Menu>
        </Flex>
      </Box>
    </Box>
  </>;
}
