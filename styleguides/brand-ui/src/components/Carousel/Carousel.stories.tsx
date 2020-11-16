import React, { ReactNode } from 'react'
import { Meta } from '@storybook/react'
import { Flex } from 'theme-ui'

import { Card } from '../..'
import { Carousel, CarouselProps } from './index'

export default {
  title: 'beta/Carousel',
  component: Carousel,
} as Meta

const carouselPageStyles = {
  padding: 112,
  alignItems: 'center',
  height: 400,
  width: '100%',
  color: 'muted.5',
  justifyContent: 'space-around',
  fontSize: 32,
}

const SimpleCarousel = ({
  size,
  indicators,
  crossfade,
}: Pick<CarouselProps, 'size' | 'indicators' | 'crossfade'>) => (
  <Carousel
    size={size}
    indicators={indicators}
    crossfade={crossfade}
  >
    <Flex
      sx={{
        ...carouselPageStyles,
        backgroundColor: 'muted.0',
      }}
    >
      Take me out! And take me home!
    </Flex>
    <Flex
      sx={{
        ...carouselPageStyles,
        backgroundColor: 'success.base',
      }}
    >
      You're my, my, my, my...
    </Flex>
    <Flex
      sx={{
        ...carouselPageStyles,
        backgroundColor: 'primary.base',
      }}
    >
      Lover
    </Flex>
  </Carousel>
)

export const BasicCarousel = () => <SimpleCarousel />

export const CrossfadeCarousel = () => <SimpleCarousel crossfade />

export const SmallCarousel = () => <SimpleCarousel size="small" />

export const CarouselWithoutIndicators = () => (
  <SimpleCarousel indicators={false} />
)

const SimpleCard = ({ children }: { children: ReactNode }) => (
  <Card sx={{ height: 'fit-content' }}>
    <Card.Header>Loveless</Card.Header>
    <Card.Body>{children}</Card.Body>
  </Card>
)

const cardContainerStyles = {
  ...carouselPageStyles,
  backgroundColor: 'bubblegum.base',
  color: 'text',
  div: {
    marginRight: 5,
    ':last-child': {
      marginRight: 0,
    },
  },
}

export const MultipleCardsCarousel = () => (
  <Carousel>
    <Flex sx={cardContainerStyles}>
      <SimpleCard>Bet you wanna rip my heart out</SimpleCard>
      <SimpleCard>Bet you wanna skip my calls now</SimpleCard>
      <SimpleCard>Well guess what? I like that</SimpleCard>
    </Flex>
    <Flex sx={cardContainerStyles}>
      <SimpleCard>'Cause I'm gonna mess your life up</SimpleCard>
      <SimpleCard>Gonna wanna tape my mouth shut</SimpleCard>
      <SimpleCard>Look out, lovers</SimpleCard>
    </Flex>
  </Carousel>
)
