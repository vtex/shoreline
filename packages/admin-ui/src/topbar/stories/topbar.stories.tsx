import React from 'react'
import type { Meta } from '@storybook/react'
import { csx } from '@vtex/admin-ui-core'
import {
  Actions,
  useActions,
  Action,
  ActionItem,
  ActionList,
  Topbar,
  TopbarItem,
} from '../index'
import { Announcements } from '../actions/mock'
import {
  IconBell,
  IconList,
  IconQuestion,
  IconStorefront,
} from '@vtex/phosphor-icons'

import { Button } from '../../button'
import { Avatar } from '../../avatar'

export default {
  title: 'admin-ui-review/topbar',
} as Meta

export const DesktopExample = () => {
  const state = useActions({
    initialTitle: 'More options',
  })

  return (
    <Topbar>
      <TopbarItem>
        <Button variant="neutralTertiary" icon={<IconList />} />
        <Button variant="neutralTertiary">my account</Button>
      </TopbarItem>

      <TopbarItem justify="center">
        <Button variant="neutralTertiary" className={csx({ width: '100%' })}>
          Search VTEX
        </Button>
      </TopbarItem>

      <TopbarItem justify="end">
        <Avatar label="Lucas" />
        <Actions state={state}>
          <ActionList>
            <Action
              state={state}
              id="information-center"
              icon={<IconQuestion />}
            >
              Information Center
            </Action>
            <Action state={state} id="announcements" icon={<IconBell />}>
              Announcements
            </Action>
            <Action
              state={state}
              id="visit-store"
              icon={<IconStorefront />}
              href="https://google.com"
            >
              Visit Store
            </Action>
          </ActionList>

          <ActionItem state={state} id="announcements">
            <Announcements />
          </ActionItem>
        </Actions>
      </TopbarItem>
    </Topbar>
  )
}

export const MobileExample = () => {
  const state = useActions({
    initialTitle: 'More options',
  })

  return (
    <Topbar>
      <TopbarItem justify="start">
        <Button variant="neutralTertiary" icon={<IconList />} />
        <Button variant="neutralTertiary">my account</Button>
      </TopbarItem>

      <TopbarItem justify="end">
        <Avatar label="Lucas" />
        <Actions state={state}>
          <ActionList>
            <Action
              state={state}
              id="information-center"
              icon={<IconQuestion />}
            >
              Information Center
            </Action>
            <Action state={state} id="announcements" icon={<IconBell />}>
              Announcements
            </Action>
            <Action
              state={state}
              id="visit-store"
              icon={<IconStorefront />}
              href="https://google.com"
            >
              Visit Store
            </Action>
          </ActionList>

          <ActionItem state={state} id="announcements">
            <Announcements />
          </ActionItem>
        </Actions>
      </TopbarItem>
    </Topbar>
  )
}
