import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Skeleton, SkeletonProps } from './index'
import { unstableBox as Box } from '../unstableBox'
import { Button } from '../Button'
import { Heading } from '../Heading'
import { Paragraph } from '../Paragraph'
import { unstableThemeProvider as ThemeProvider } from '../unstableThemeProvider'

export default {
  title: 'beta/Skeleton',
  component: Skeleton,
} as Meta

export const Rect: Story<SkeletonProps> = () => {
  return (
    <ThemeProvider>
      <Skeleton styles={{ height: 128, width: 128 }} />
    </ThemeProvider>
  )
}

export const Circle: Story<SkeletonProps> = () => {
  return (
    <ThemeProvider>
      <Skeleton shape="circle" styles={{ width: 100, height: 100 }} />
    </ThemeProvider>
  )
}

export const Fluid: Story<SkeletonProps> = () => {
  return (
    <ThemeProvider>
      <Box width="full" height={192}>
        <Skeleton />
      </Box>
    </ThemeProvider>
  )
}

export const TextExample = () => {
  const [loading, setLoading] = React.useState(false)

  return (
    <ThemeProvider>
      <Box width="sm">
        {loading ? (
          <Box>
            <Skeleton height={24} width="5/12" />
            <Skeleton height={16} />
            <Skeleton height={16} />
            <Skeleton height={16} />
            <Skeleton height={16} />
            <Skeleton height={16} />
            <Skeleton height={16} width="1/2" />
          </Box>
        ) : (
          <Box>
            <Heading>Developing</Heading>
            <Paragraph>
              The VTEX team welcomes and thanks you for developing with us. We
              are committed in provide the best developer experience through
              consistency and quality of our guidelines. We are open and
              appreciate all the feedbacks, tips and ideas to keep this
              experience the best as possible. Bellow we describe the way we
              work and the best practices.
            </Paragraph>
          </Box>
        )}
        <Button onClick={() => setLoading((s) => !s)}>Toggle Loading</Button>
      </Box>
    </ThemeProvider>
  )
}
