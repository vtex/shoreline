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
  sx: {
    height: 128,
    width: 128,
  },
}

export const Circle = Template.bind({})
Circle.args = {
  sx: { width: 100, height: 100 },
  shape: 'circle',
}

export const Fluid = () => {
  return (
    <Box w="full" h="19">
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
            <Skeleton sx={{ height: 8, width: '2/5' }} />
            <Skeleton sx={{ height: 6 }} />
            <Skeleton sx={{ height: 6 }} />
            <Skeleton sx={{ height: 6 }} />
            <Skeleton sx={{ height: 6 }} />
            <Skeleton sx={{ height: 6 }} />
            <Skeleton sx={{ height: 6, width: '1/2' }} />
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
        <Button mx="0" onClick={() => setLoading((s) => !s)}>
          Toggle Loading
        </Button>
      </Box>
    </Fragment>
  )
}

TextExample.parameters = {
  playroom: {
    code: `
<Play.ToggleState>
  {({ toggle, setToggle }) => (
    <>
      <Box w="sm">
        {toggle ? (
          <Box>
            <Skeleton sx={{ height: 8, width: "2/5" }} />
            <Skeleton sx={{ height: 6 }} />
            <Skeleton sx={{ height: 6 }} />
            <Skeleton sx={{ height: 6 }} />
            <Skeleton sx={{ height: 6 }} />
            <Skeleton sx={{ height: 6 }} />
            <Skeleton sx={{ height: 6, width: "1/2" }} />
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
        <Button mx="0" onClick={() => setToggle((s) => !s)}>
          Toggle Loading
        </Button>
      </Box>
    </>
  )}
</Play.ToggleState>
    `,
  },
}
