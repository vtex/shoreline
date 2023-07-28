import React from 'react'
import type { Meta } from '@storybook/react'
import { csx } from '@vtex/admin-ui-core'
import {
  Options,
  useTopbarOptions,
  Option,
  OptionItem,
  OptionsList,
} from '../index'
import { Announcements } from '../options/mock'
import { IconBell, IconQuestion, IconStorefront } from '@vtex/phosphor-icons'

export default {
  title: 'admin-ui-review/topbar',
} as Meta

export const Example = () => {
  const state = useTopbarOptions({
    initialTitle: 'More options',
  })

  return (
    <div>
      <Options state={state}>
        <OptionsList>
          <Option state={state} id="information-center" icon={<IconQuestion />}>
            Information Center
          </Option>
          <Option state={state} id="announcements" icon={<IconBell />}>
            Announcements
          </Option>
          <Option
            state={state}
            id="visit-store"
            icon={<IconStorefront />}
            href="https://google.com"
          >
            Visit Store
          </Option>
        </OptionsList>

        <OptionItem state={state} id="announcements">
          <Announcements />
        </OptionItem>
      </Options>
    </div>
  )
}
