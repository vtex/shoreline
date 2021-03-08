import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Skeleton, SkeletonProps } from './index'
import { Box } from '../Box'
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
  styles: { height: 128, width: 128 },
}
export const Rect = () => {
  return <Skeleton styles={{ height: 128, width: 128 }} />
}

export const Circle = () => {
  return <Skeleton shape="circle" styles={{ width: 100, height: 100 }} />
}

export const Fluid = () => {
  return (
    <Box styles={{ width: 'full', height: 192 }}>
      <Skeleton />
    </Box>
  )
}

export const TextExample = () => {
  const [loading, setLoading] = React.useState(false)

  return (
    <Box styles={{ width: 'sm' }}>
      {loading ? (
        <Box>
          <Skeleton styles={{ height: 24, width: '5/12' }} />
          <Skeleton styles={{ height: 16 }} />
          <Skeleton styles={{ height: 16 }} />
          <Skeleton styles={{ height: 16 }} />
          <Skeleton styles={{ height: 16 }} />
          <Skeleton styles={{ height: 16 }} />
          <Skeleton styles={{ height: 16, width: '1/2' }} />
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
