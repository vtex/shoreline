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
import { Set } from '../../Set'
import { Button } from '../../Button'
import { Text } from '../../Text'

export default {
  title: 'shell/Topbar',
  component: Topbar,
} as Meta

export function Example() {
  return (
    <Topbar>
      <TopbarStart>
        <Set spacing={3}>
          <Button variant="adaptative-dark" icon={<IconImage />} />
          <Text csx={{ fontSize: 2, fontSettings: 'medium' }}>
            dpsppinheiros
          </Text>
        </Set>
      </TopbarStart>
      <TopbarEnd>
        <Set spacing={0}>
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
        </Set>
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
          <Set spacing={3}>
            <Button variant="adaptative-dark" icon={<IconImage />} />
            <Text csx={{ fontSize: 2, fontSettings: 'medium' }}>
              dpsppinheiros
            </Text>
          </Set>
        </TopbarStart>
        <TopbarEnd>
          <Set spacing={0}>
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
          </Set>
        </TopbarEnd>
      </Topbar>
      <br />
      <Button onClick={() => setLoading((prev) => !prev)}>
        Toggle Loading
      </Button>
    </Fragment>
  )
}
