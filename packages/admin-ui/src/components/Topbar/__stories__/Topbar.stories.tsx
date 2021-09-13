import React, { Fragment, useState } from 'react'
import type { Meta } from '@storybook/react'
import {
  IconArrow,
  IconHelp,
  IconImage,
  IconNotifications,
  IconUndo,
} from '@vtex/admin-ui-icons'

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
          <Button icon={<IconImage />} variant="adaptative-dark" />
          <Text csx={{ fontSize: 2, fontSettings: 'medium' }}>
            dpsppinheiros
          </Text>
        </Set>
      </TopbarStart>
      <TopbarEnd>
        <Set spacing={0}>
          <Button
            variant="tertiary"
            icon={<IconUndo csx={{ color: 'blue' }} />}
            csx={{ color: 'dark.primary' }}
          >
            Switch to previous version
          </Button>
          <Button
            variant="tertiary"
            icon={
              <IconArrow csx={{ color: 'blue', transform: `rotate(45deg)` }} />
            }
            csx={{ color: 'dark.primary' }}
          >
            View Store
          </Button>
          <Button variant="tertiary" icon={<IconNotifications />} />
          <Button variant="tertiary" icon={<IconHelp />} />
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
            <Button icon={<IconImage />} variant="adaptative-dark" />
            <Text csx={{ fontSize: 2, fontSettings: 'medium' }}>
              dpsppinheiros
            </Text>
          </Set>
        </TopbarStart>
        <TopbarEnd>
          <Set spacing={0}>
            <Button
              variant="tertiary"
              icon={<IconUndo csx={{ color: 'blue' }} />}
              csx={{ color: 'dark.primary' }}
            >
              Switch to previous version
            </Button>
            <Button
              variant="tertiary"
              icon={
                <IconArrow
                  csx={{ color: 'blue', transform: `rotate(45deg)` }}
                />
              }
              csx={{ color: 'dark.primary' }}
            >
              View Store
            </Button>
            <Button variant="tertiary" icon={<IconNotifications />} />
            <Button variant="tertiary" icon={<IconHelp />} />
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
