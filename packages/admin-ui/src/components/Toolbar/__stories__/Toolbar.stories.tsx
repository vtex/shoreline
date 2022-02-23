import React from 'react'
import type { Meta } from '@storybook/react'
import {
  IconDotsThreeVertical,
  IconTrash,
  IconHeart,
  IconArrowLineDown,
  IconLink,
} from '@vtex/phosphor-icons'

import { Toolbar, ToolbarItem, useToolbarState } from '../index'
import { Button } from '../../../button'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuSeparator,
  MenuItem,
  useMenuState,
} from '../../Menu'
import {
  ModalDisclosure,
  Modal,
  ModalHeader,
  ModalContent,
  useModalState,
} from '../../Modal'
import { Text } from '../../Text'
import { ToolbarButton } from '../components/ToolbarButton'

export default {
  title: 'admin-ui/Toolbar',
  component: Toolbar,
} as Meta

const labels = ['Item 1', 'Item 2']

export const Basic = () => {
  const state = useToolbarState({ loop: true })

  return (
    <Toolbar state={state} aria-label="basic-toolbar">
      {labels.map((label) => (
        <ToolbarButton key={label} onClick={() => console.log('clicked')}>
          {label}
        </ToolbarButton>
      ))}
    </Toolbar>
  )
}

export const WithMenu = () => {
  const state = useToolbarState({ loop: true })
  const menuState = useMenuState()

  return (
    <>
      <Toolbar state={state} aria-label="Toolbar with menu">
        <ToolbarItem>
          {(itemProps) => (
            <Menu state={menuState}>
              <MenuButton icon={<IconDotsThreeVertical />} {...itemProps}>
                More
              </MenuButton>
              <MenuList aria-label="actions">
                <MenuItem icon={<IconArrowLineDown />}>Download</MenuItem>
                <MenuItem icon={<IconLink />}>Link to</MenuItem>
                <MenuItem icon={<IconHeart />}>Favorite</MenuItem>
                <MenuSeparator />
                <MenuItem icon={<IconTrash />}>Delete</MenuItem>
              </MenuList>
            </Menu>
          )}
        </ToolbarItem>
      </Toolbar>
    </>
  )
}

export const WithModal = () => {
  const state = useToolbarState({ loop: true })
  const menuState = useMenuState()
  const modalState = useModalState()

  return (
    <>
      <Toolbar state={state} aria-label="Toolbar with modal">
        <ToolbarItem>
          {(itemProps) => (
            <Menu state={menuState}>
              <MenuButton icon={<IconDotsThreeVertical />} {...itemProps}>
                More
              </MenuButton>
              <MenuList aria-label="actions">
                <MenuItem icon={<IconArrowLineDown />}>Download</MenuItem>
                <MenuItem icon={<IconLink />}>Link to</MenuItem>
                <MenuItem icon={<IconHeart />}>Favorite</MenuItem>
                <MenuSeparator />
                <MenuItem icon={<IconTrash />}>Delete</MenuItem>
              </MenuList>
            </Menu>
          )}
        </ToolbarItem>
        <ToolbarItem>
          {(itemProps) => (
            <ModalDisclosure state={modalState}>
              <Button {...itemProps}>Open modal</Button>
            </ModalDisclosure>
          )}
        </ToolbarItem>
      </Toolbar>

      <Modal aria-label="Seneca's modal" state={modalState} size="small">
        <ModalHeader title="Item 6" />
        <ModalContent>
          <Text>
            True happiness is to enjoy the present, without anxious dependence
            upon the future, not to amuse ourselves with either hopes or fears
            but to rest satisfied with what we have, which is sufficient, for he
            that is so wants nothing. The greatest blessings of mankind are
            within us and within our reach. A wise man is content with his lot,
            whatever it may be, without wishing for what he has not.
          </Text>
        </ModalContent>
      </Modal>
    </>
  )
}
