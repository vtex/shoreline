import React, { Fragment } from 'react'
import { Story, Meta } from '@storybook/react'

import { Skeleton, SkeletonProps } from './index'
import { Box } from '../Box'
import { Text } from '../Text'
import { Button } from '../Button'

export default {
  title: 'beta/Skeleton',
  component: Skeleton,
} as Meta

const Template: Story<SkeletonProps> = (args) => <Skeleton {...args} />

export const Default = Template.bind({})
Default.args = {
  height: 24,
  width: 128,
}

export const Circle = Template.bind({})
Circle.args = {
  height: 32,
  width: 32,
  circle: true,
}

export const TextExample = () => {
  const [loading, setLoading] = React.useState(false)
  return (
    <Fragment>
      <Box sx={{ width: 400 }}>
        {loading ? (
          <Box>
            <Skeleton height={24} width="40%" />
            <Skeleton height={14} />
            <Skeleton height={14} />
            <Skeleton height={14} />
            <Skeleton height={14} />
            <Skeleton height={14} />
            <Skeleton height={14} width="50%" />
          </Box>
        ) : (
          <Box>
            <Text variant="headline">Developing</Text>
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
        <Button sx={{ marginX: 0 }} onClick={() => setLoading((s) => !s)}>
          Toggle Loading
        </Button>
      </Box>
    </Fragment>
  )
}
