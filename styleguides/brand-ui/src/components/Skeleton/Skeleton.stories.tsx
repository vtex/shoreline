import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'
import { Skeleton, SkeletonProps } from './index'
import { Box, Text } from 'theme-ui'
import { Button } from '../Button'

export default {
  title: 'beta/Skeleton',
  component: Skeleton,
} as Meta

const Template: Story<SkeletonProps> = (args: SkeletonProps) => {
  return <Box> <Skeleton {...args}></Skeleton> </Box>
}

export const Playground = Template.bind({})
Playground.args = {
  sx: { height: 20, width: 200 },
  shape: 'rect'
}

export const Rect = () => {
  return <Skeleton sx={{ height: 128, width: 128 }} shape='rect' />
}

export const Circle = () => {
  return <Skeleton sx={{ height: 128, width: 128 }} shape='circle' />
}

export const TextExample = () => {
  const [loading, setLoading] = useState(false)

  return (<Box sx={{ width: '20rem' }}>
    {loading ? (
      <Box >
        <Skeleton sx={{ width: 100, height: 20, marginBottom: 2 }} />
        <Skeleton sx={{ height: 18, width: 310 }} />
        <Skeleton sx={{ height: 18, width: 310 }} />
        <Skeleton sx={{ height: 18, width: 310 }} />
        <Skeleton sx={{ height: 18, width: 310 }} />
        <Skeleton sx={{ height: 18, width: 310 }} />
        <Skeleton sx={{ height: 18, width: 310 }} />
        <Skeleton sx={{ height: 18, width: 150 }} />
      </Box>
    ) : (
        <Box>
          <Text sx={{ fontWeight: 'bold', margin: 2, width: 'min-content' }}> Developing </Text>
          <Text sx={{ fontSize: 1, margin: 2 }}>
            The VTEX team welcomes and thanks you for developing with us. We are
            committed in provide the best developer experience through
            consistency and quality of our guidelines. We are open and
            appreciate all the feedbacks, tips and ideas to keep this experience
            the best as possible. Bellow we describe the way we work and the
            best practices.
          </Text>
        </Box>
      )}
    <Button onClick={() => setLoading(!loading)} size='small'>Loading</Button>
  </Box>)
}

