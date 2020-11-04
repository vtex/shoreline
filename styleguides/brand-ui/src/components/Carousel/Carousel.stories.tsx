import React, { ReactNode } from 'react'
import { Meta } from '@storybook/react'
import { Flex } from 'theme-ui'

import { Button, Card } from '../..'
import { Carousel } from './index'

export default {
  title: 'beta/Carousel',
  component: Carousel,
} as Meta

const BasicCard = ({ children }: { children: ReactNode }) => (
  <Card sx={{ height: 'fit-content' }}>
    <Card.Header>Hard Feelings</Card.Header>
    <Card.Body>{children}</Card.Body>
    <Card.Footer sx={{ width: '100%', justifyContent: 'flex-end' }}>
      <Button variant="primary">Primary</Button>
    </Card.Footer>
  </Card>
)

const pageStyles = {
  paddingX: 112,
  height: 600,
  alignItems: 'center',
  backgroundColor: 'bubblegum.base',
  width: '100%',
  justifyContent: 'space-around',
}

export const MultipleCardsCarousel = () => (
  <Carousel>
    <Flex sx={pageStyles}>
      <BasicCard>Let go of your umbrella!</BasicCard>
      <BasicCard>Darling I'm just trying to tell ya</BasicCard>
      <BasicCard>Hard... Fee... lings...</BasicCard>
    </Flex>
    <Flex sx={pageStyles}>
      <BasicCard>Let go of your umbrella!</BasicCard>
      <BasicCard>Darling I'm just trying to tell ya</BasicCard>
    </Flex>
  </Carousel>
)

export const CarouselExample = () => (
  <Carousel>
    {[
      {
        backgroundColor: 'primary.base',
        content: 'Can I go where you go?',
      },
      {
        backgroundColor: 'muted.0',
        content: 'Can we always be this close?',
      },
      {
        backgroundColor: 'success.base',
        content: 'Forever and ever and ah',
      },
      {
        backgroundColor: 'danger.base',
        content: 'Take me out! And take me home!',
      },
      {
        backgroundColor: 'secondary.base',
        content: "You're my, my, my, my...",
      },
      {
        backgroundColor: 'muted.0',
        content: 'Lover',
      },
    ].map(({ backgroundColor, content }, index) => (
      <Flex
        key={index}
        sx={{
          height: 600,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          backgroundColor,
          color: 'muted.5',
          fontSize: 32,
        }}
      >
        {content}
      </Flex>
    ))}
  </Carousel>
)
