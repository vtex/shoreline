import React from 'react'
import type { Meta } from '@storybook/react'

import { Flex } from '../../flex'
import { Text } from '../../components/Text'
import { VisuallyHidden } from '../index'

export default {
  title: 'admin-ui-review/visually-hidden',
  component: VisuallyHidden,
} as Meta

export function WithSimpleSearchField() {
  return (
    <Flex direction="column" csx={{ width: 200 }}>
      <VisuallyHidden>
        <label htmlFor="search">Hidden Label</label>
      </VisuallyHidden>
      <input id="search" type="search" placeholder="A11y Search Input" />
      <Text csx={{ alignSelf: 'flex-end', marginTop: 3 }} variant="detail">
        Use this input to search things
      </Text>
    </Flex>
  )
}
