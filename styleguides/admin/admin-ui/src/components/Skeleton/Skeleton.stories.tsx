import React, { Fragment } from 'react'
import { Story, Meta } from '@storybook/react'

import { Skeleton, SkeletonProps } from './index'
import { Box } from '../Box'
import { Text } from '../Text'
import { Button } from '../Button'
import { Heading } from '../Heading'

export default {
  title: 'beta/Skeleton',
  component: Skeleton,
} as Meta

export const Rect: Story<SkeletonProps> = () => {
  return <Skeleton h={128} w={128} />
}

export const Circle: Story<SkeletonProps> = () => {
  return <Skeleton shape="circle" w={100} h={100} />
}

export const Fluid: Story<SkeletonProps> = () => {
  return (
    <Box w="full" h={192}>
      <Skeleton />
    </Box>
  )
}

export const TextExample = () => {
  const [loading, setLoading] = React.useState(false)

  return (
    <Fragment>
      <Box w="sm">
        {loading ? (
          <Box>
            <Skeleton h={24} w="5/12" />
            <Skeleton h={16} />
            <Skeleton h={16} />
            <Skeleton h={16} />
            <Skeleton h={16} />
            <Skeleton h={16} />
            <Skeleton h={16} w="1/2" />
          </Box>
        ) : (
          <Box>
            <Heading>Developing</Heading>
            <Text>
              The VTEX team welcomes and thanks you for developing with us. We
              are committed in provide the best developer experience through
              consistency and quality of our guidelines. We are open and
              appreciate all the feedbacks, tips and ideas to keep this
              experience the best as possible. Bellow we describe the way we
              work and the best practices.
            </Text>
          </Box>
        )}
        <Button onClick={() => setLoading((s) => !s)}>Toggle Loading</Button>
      </Box>
    </Fragment>
  )
}
