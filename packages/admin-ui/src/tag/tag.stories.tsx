/* eslint-disable no-console */
import type { ReactNode } from 'react'
import React from 'react'
import type { Meta, Story } from '@storybook/react'
import type { StyleProp } from '@vtex/admin-ui-core'

import type { TagProps } from './tag'
import { Tag } from './tag'
import { Stack } from '../stack'
import type { InlineProps } from '../inline'
import { Inline as AdminUIInline } from '../inline'
import { Text } from '../components/Text'

const LABEL = 'Short text'

export default {
  title: 'admin-ui-review/tag',
  component: Tag,
  argTypes: {
    palette: {
      options: ['cyan', 'purple', 'green', 'red', 'orange', 'teal', 'gray'],
      control: { type: 'select' },
    },
  },
} as Meta

export const Playground: Story<TagProps> = (args) => {
  return <Tag {...args} />
}

Playground.args = {
  label: 'Short text',
}

type Props = InlineProps & { children: ReactNode; csx?: StyleProp }

function Inline(props: Props) {
  return (
    <AdminUIInline
      {...props}
      csx={{
        minWidth: '15rem',
        justifyContent: 'space-between',
        ...props.csx,
      }}
    />
  )
}

export function Variants() {
  return (
    <Stack>
      <Inline>
        <Text>gray</Text>
        <Tag label={LABEL} palette="gray" />
      </Inline>
      <Inline>
        <Text>red (critical)</Text>
        <Tag label={LABEL} palette="red" />
      </Inline>
      <Inline>
        <Text>orange (warning)</Text>
        <Tag label={LABEL} palette="orange" />
      </Inline>
      <Inline>
        <Text>green (positive)</Text>
        <Tag label={LABEL} palette="green" />
      </Inline>
      <Inline>
        <Text>lightBlue (default, info)</Text>
        <Tag label={LABEL} palette="lightBlue" />
      </Inline>
      <Inline>
        <Text>cyan</Text>
        <Tag label={LABEL} palette="cyan" />
      </Inline>
      <Inline>
        <Text>purple</Text>
        <Tag label={LABEL} palette="purple" />
      </Inline>
      <Inline>
        <Text>teal</Text>
        <Tag label={LABEL} palette="teal" />
      </Inline>
      <Inline>
        <Text>pink</Text>
        <Tag label={LABEL} palette="pink" />
      </Inline>
      <Inline
        csx={{
          bg: '$secondary',
          height: '2rem',
          paddingTop: '0.1rem',
        }}
      >
        <Text>outline</Text>
        <Tag label={LABEL} />
      </Inline>
    </Stack>
  )
}
