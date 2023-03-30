import React from 'react'
import type { Meta } from '@storybook/react'
import {
  IconTrash,
  IconHeart,
  IconArrowLineDown,
  IconLink,
} from '@vtex/phosphor-icons'

import { Toolbar, ToolbarItem, useToolbarState } from '../index'
import { Button } from '../../../button'
import {
  MenuButton,
  Menu,
  MenuDivider,
  MenuItem,
  useMenuState,
} from '../../../menu'
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalContent,
  useModalState,
} from '../../../modal'
import { Text } from '../../../text'
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
            <>
              <MenuButton state={menuState} label="More" {...itemProps} />
              <Menu state={menuState} aria-label="actions">
                <MenuItem icon={<IconArrowLineDown />} label="Download" />
                <MenuItem icon={<IconLink />} label="Link to" />
                <MenuItem icon={<IconHeart />} label="Favorite" />
                <MenuDivider />
                <MenuItem icon={<IconTrash />} label="Delete" />
              </Menu>
            </>
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
            <>
              <MenuButton state={menuState} label="More" {...itemProps} />
              <Menu state={menuState} aria-label="actions">
                <MenuItem icon={<IconArrowLineDown />} label="Download" />
                <MenuItem icon={<IconLink />} label="Link to" />
                <MenuItem icon={<IconHeart />} label="Favorite" />
                <MenuDivider />
                <MenuItem icon={<IconTrash />} label="Delete" />
              </Menu>
            </>
          )}
        </ToolbarItem>
        <ToolbarButton onClick={modalState.toggle}>Open Modal</ToolbarButton>
      </Toolbar>

      <Modal state={modalState} size="small">
        <ModalHeader>
          <ModalTitle>Item 6</ModalTitle>
        </ModalHeader>
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
