import React, { Fragment, useState } from 'react'
import type { Meta } from '@storybook/react'
import {
  IconArrowUp,
  IconQuestion,
  IconImage,
  IconBell,
  IconArrowUUpLeft,
} from '@vtex/phosphor-icons'

import { Topbar, TopbarStart, TopbarEnd } from '../index'
import { Inline } from '../../../inline'
import { Button } from '../../../button'
import { Text } from '../../Text'

export default {
  title: 'shell/Topbar',
  component: Topbar,
} as Meta

export function Example() {
  return (
    <Topbar>
      <TopbarStart>
        <Inline align="center" noWrap>
          <Button variant="neutralTertiary" icon={<IconImage />} />
          <Text variant="action1">dpsppinheiros</Text>
        </Inline>
      </TopbarStart>
      <TopbarEnd>
        <Inline align="center" noWrap>
          <Button variant="tertiary" icon={<IconArrowUUpLeft />}>
            Switch to previous version
          </Button>
          <Button
            variant="tertiary"
            icon={<IconArrowUp csx={{ transform: `rotate(45deg)` }} />}
          >
            View Store
          </Button>
          <Button variant="tertiary" icon={<IconBell />} />
          <Button variant="tertiary" icon={<IconQuestion />} />
        </Inline>
      </TopbarEnd>
    </Topbar>
  )
}

export function Loading() {
  const [loading, setLoading] = useState(true)

  return (
    <Fragment>
      <Topbar loading={loading}>
        <TopbarStart>
          <Inline align="center" noWrap>
            <Button variant="neutralTertiary" icon={<IconImage />} />
            <Text variant="action1">dpsppinheiros</Text>
          </Inline>
        </TopbarStart>
        <TopbarEnd>
          <Inline align="center" noWrap>
            <Button variant="tertiary" icon={<IconArrowUUpLeft />}>
              Switch to previous version
            </Button>
            <Button
              variant="tertiary"
              icon={<IconArrowUp csx={{ transform: `rotate(45deg)` }} />}
            >
              View Store
            </Button>
            <Button variant="tertiary" icon={<IconBell />} />
            <Button variant="tertiary" icon={<IconQuestion />} />
          </Inline>
        </TopbarEnd>
      </Topbar>
      <br />
      <Button onClick={() => setLoading((prev) => !prev)}>
        Toggle Loading
      </Button>
    </Fragment>
  )
}
