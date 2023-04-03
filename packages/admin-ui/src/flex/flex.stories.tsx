import React from 'react'
import type { Meta } from '@storybook/react'
import { csx, palette } from '@vtex/admin-ui-core'

import { Flex, FlexSpacer } from './index'

export default {
  title: 'admin-ui-review/flex',
  component: Flex,
} as Meta

export const Example = () => {
  return (
    <Flex>
      <div
        className={csx({
          ...palette('cyan'),
          size: 200,
        })}
      >
        Box 1
      </div>
      <div
        className={csx({
          ...palette('teal'),
          size: 200,
        })}
      >
        Box 2
      </div>
      <div className={csx({ ...palette('purple'), size: 200 })}>Box 3</div>
    </Flex>
  )
}

export function Spacer() {
  return (
    <Flex>
      <div
        className={csx({
          ...palette('cyan'),
          size: 200,
        })}
      >
        Box 1
      </div>
      <FlexSpacer />
      <div
        className={csx({
          ...palette('teal'),
          size: 200,
        })}
      >
        Box 2
      </div>
    </Flex>
  )
}

export function Around() {
  return (
    <Flex justify="space-around">
      <div
        className={csx({
          ...palette('teal'),
          size: 100,
        })}
      >
        Box 1
      </div>
      <div
        className={csx({
          ...palette('purple'),
          size: 100,
        })}
      >
        Box 2
      </div>
    </Flex>
  )
}

export function Direction() {
  return (
    <Flex direction="column">
      <div
        className={csx({
          ...palette('teal'),
          size: 100,
        })}
      >
        Box 1
      </div>
      <div
        className={csx({
          ...palette('purple'),
          size: 100,
        })}
      >
        Box 2
      </div>
    </Flex>
  )
}

export function Align() {
  return (
    <Flex align="center" className={csx({ size: 300, bg: '$secondary' })}>
      <div
        className={csx({
          ...palette('teal'),
          size: 100,
        })}
      >
        Box 1
      </div>
      <div
        className={csx({
          ...palette('purple'),
          size: 100,
        })}
      >
        Box 2
      </div>
    </Flex>
  )
}

export function Responsive() {
  return (
    <Flex
      align={{ mobile: 'center', tablet: 'flex-start', desktop: 'flex-end' }}
      direction={{ mobile: 'column', tablet: 'row' }}
      justify="space-around"
      className={csx({ size: 300, bg: '$secondary' })}
    >
      <div
        className={csx({
          ...palette('teal'),
          size: 100,
        })}
      >
        Box 1
      </div>
      <div
        className={csx({
          ...palette('purple'),
          size: 100,
        })}
      >
        Box 2
      </div>
    </Flex>
  )
}
