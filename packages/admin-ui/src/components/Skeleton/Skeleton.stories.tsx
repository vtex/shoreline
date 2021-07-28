import React from 'react'
import type { Story, Meta } from '@storybook/react'
import { Box } from '@vtex/admin-primitives'

import type { SkeletonProps } from './index'
import { Skeleton } from './index'
import { Button } from '../Button'
import { Heading } from '../Heading'
import { Paragraph } from '../Paragraph'

export default {
  title: 'admin-ui/Skeleton',
  component: Skeleton,
} as Meta

export const Playground: Story<SkeletonProps> = (args) => {
  return <Skeleton {...args} />
}

Playground.args = {
  csx: { height: 128, width: 128 },
}
export const Rect = () => {
  return <Skeleton csx={{ height: 128, width: 128 }} />
}

export const Circle = () => {
  return <Skeleton shape="circle" csx={{ width: 100, height: 100 }} />
}

export const Fluid = () => {
  return (
    <Box csx={{ width: 'full', height: 192 }}>
      <Skeleton />
    </Box>
  )
}

export const TextExample = () => {
  const [loading, setLoading] = React.useState(false)

  return (
    <Box csx={{ width: 'sm' }}>
      {loading ? (
        <Box>
          <Skeleton csx={{ height: 24, width: '5/12' }} />
          <Skeleton csx={{ height: 16 }} />
          <Skeleton csx={{ height: 16 }} />
          <Skeleton csx={{ height: 16 }} />
          <Skeleton csx={{ height: 16 }} />
          <Skeleton csx={{ height: 16 }} />
          <Skeleton csx={{ height: 16, width: '1/2' }} />
        </Box>
      ) : (
        <Box>
          <Heading>Developing</Heading>
          <Paragraph>
            The VTEX team welcomes and thanks you for developing with us. We are
            committed in provide the best developer experience through
            consistency and quality of our guidelines. We are open and
            appreciate all the feedbacks, tips and ideas to keep this experience
            the best as possible. Bellow we describe the way we work and the
            best practices.
          </Paragraph>
        </Box>
      )}
      <Button onClick={() => setLoading((s) => !s)}>Toggle Loading</Button>
    </Box>
  )
}
