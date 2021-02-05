import React, { ReactNode, useState } from 'react'
import { Meta } from '@storybook/react'
import { Flex } from 'theme-ui'

import { Card } from '../..'
import { Carousel, CarouselProps } from './index'
import { Select } from '../Select'
import { ChangeEvent } from 'react'

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

const SimpleCarousel = (
  props: Pick<
    CarouselProps,
    'size' | 'indicators' | 'crossfade' | 'buttonAlign'
  >
) => (
  <Carousel {...props}>
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
      You&apos;re my, my, my, my...
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

export const Basic = () => <SimpleCarousel />

export const Crossfade = () => <SimpleCarousel crossfade />

export const ButtonAlignTop = () => <SimpleCarousel buttonAlign="top" />

export const Small = () => <SimpleCarousel size="small" />

export const WithoutIndicators = () => <SimpleCarousel indicators={false} />

export const SelectSlideCount = () => {
  const [value, setValue] = useState(2)

  const onChangeSelect = (e: ChangeEvent<HTMLSelectElement>) =>
    setValue((e.target.value as unknown) as number)

  const slides = Array.from({ length: value }).map((_) => (
    <Flex
      sx={{
        ...carouselPageStyles,
        backgroundColor: 'muted.0',
      }}
    >
      Take me out! And take me home!
    </Flex>
  ))

  return (
    <Flex sx={{ flexDirection: 'column' }}>
      <Select
        label="Number of slides"
        id="slides"
        onChange={onChangeSelect}
        value={value}
      >
        <Select.Option value={2}>Two</Select.Option>
        <Select.Option value={3}>Three</Select.Option>
        <Select.Option value={4}>Four</Select.Option>
      </Select>
      <Carousel>{slides}</Carousel>
    </Flex>
  )
}

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

export const MultipleCards = () => (
  <Carousel>
    <Flex sx={cardContainerStyles}>
      <SimpleCard>Bet you wanna rip my heart out</SimpleCard>
      <SimpleCard>Bet you wanna skip my calls now</SimpleCard>
      <SimpleCard>Well guess what? I like that</SimpleCard>
    </Flex>
    <Flex sx={cardContainerStyles}>
      <SimpleCard>&apos;Cause I&apos;m gonna mess your life up</SimpleCard>
      <SimpleCard>Gonna wanna tape my mouth shut</SimpleCard>
      <SimpleCard>Look out, lovers</SimpleCard>
    </Flex>
  </Carousel>
)
