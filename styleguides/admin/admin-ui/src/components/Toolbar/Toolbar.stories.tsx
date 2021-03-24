import React from 'react'
import { Meta } from '@storybook/react'
import {
  IconDelete,
  IconFavorite,
  IconImport,
  IconLink,
} from '@vtex/admin-ui-icons'

import { Toolbar } from './index'
import { useToolbarState } from './components'
import { Button } from '../Button'
import { MenuDisclosure, useMenuState, StatelessMenu } from '../Menu'
import { ModalDisclosure, StatelessModal, useModalState } from '../Modal'
import { Text } from '../Text'

export default {
  title: 'admin-ui/Toolbar',
  component: Toolbar,
} as Meta

const labels = ['Item 1', 'Item 2']

export const Basic = () => {
  const state = useToolbarState({ loop: true })

  return (
    <Toolbar state={state}>
      {labels.map((label) => (
        <Toolbar.Item>
          {(itemProps) => (
            <Button variant="adaptative-dark" {...itemProps} key={label}>
              {label}
            </Button>
          )}
        </Toolbar.Item>
      ))}
    </Toolbar>
  )
}

export const WithMenu = () => {
  const state = useToolbarState({ loop: true })
  const menuState = useMenuState()

  return (
    <>
      <Toolbar state={state}>
        {labels.map((label) => (
          <Toolbar.Item>
            {(itemProps) => (
              <Button variant="adaptative-dark" {...itemProps} key={label}>
                {label}
              </Button>
            )}
          </Toolbar.Item>
        ))}
        <Toolbar.Item>
          {(itemProps) => (
            <MenuDisclosure state={menuState}>
              <Button variant="adaptative-dark" {...itemProps}>
                Item 3
              </Button>
            </MenuDisclosure>
          )}
        </Toolbar.Item>
      </Toolbar>
      <StatelessMenu aria-label="actions" state={menuState}>
        <StatelessMenu.Item icon={<IconImport />}>Download</StatelessMenu.Item>
        <StatelessMenu.Item icon={<IconLink />}>Link to</StatelessMenu.Item>
        <StatelessMenu.Item icon={<IconFavorite />}>
          Favorite
        </StatelessMenu.Item>
        <StatelessMenu.Separator />
        <StatelessMenu.Item icon={<IconDelete />}>Delete</StatelessMenu.Item>
      </StatelessMenu>
    </>
  )
}

export const WithModal = () => {
  const state = useToolbarState({ loop: true })
  const menuState = useMenuState()
  const modalState = useModalState({ animated: true })

  return (
    <>
      <Toolbar state={state}>
        {labels.map((label) => (
          <Toolbar.Item>
            {(itemProps) => (
              <Button variant="adaptative-dark" {...itemProps} key={label}>
                {label}
              </Button>
            )}
          </Toolbar.Item>
        ))}
        <Toolbar.Item>
          {(itemProps) => (
            <MenuDisclosure state={menuState}>
              <Button variant="adaptative-dark" {...itemProps}>
                Item 3
              </Button>
            </MenuDisclosure>
          )}
        </Toolbar.Item>
        <Toolbar.Item>
          {(itemProps) => (
            <ModalDisclosure state={modalState}>
              <Button {...itemProps} variant="adaptative-dark">
                Item 4
              </Button>
            </ModalDisclosure>
          )}
        </Toolbar.Item>
      </Toolbar>
      <StatelessMenu aria-label="actions" state={menuState}>
        <StatelessMenu.Item icon={<IconImport />}>Download</StatelessMenu.Item>
        <StatelessMenu.Item icon={<IconLink />}>Link to</StatelessMenu.Item>
        <StatelessMenu.Item icon={<IconFavorite />}>
          Favorite
        </StatelessMenu.Item>
        <StatelessMenu.Separator />
        <StatelessMenu.Item icon={<IconDelete />}>Delete</StatelessMenu.Item>
      </StatelessMenu>
      <StatelessModal
        aria-label="Seneca's modal"
        state={modalState}
        size="small"
      >
        <StatelessModal.Header title="Item 6" />
        <StatelessModal.Content>
          <Text>
            True happiness is to enjoy the present, without anxious dependence
            upon the future, not to amuse ourselves with either hopes or fears
            but to rest satisfied with what we have, which is sufficient, for he
            that is so wants nothing. The greatest blessings of mankind are
            within us and within our reach. A wise man is content with his lot,
            whatever it may be, without wishing for what he has not.
          </Text>
        </StatelessModal.Content>
      </StatelessModal>
    </>
  )
}
