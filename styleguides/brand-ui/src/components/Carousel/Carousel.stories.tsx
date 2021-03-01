import React, { useState } from 'react'
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
    'size' | 'indicators' | 'crossfade' | 'buttonAlign' | 'loop'
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

export const NoLoop = () => <SimpleCarousel loop={false} />

export const ButtonAlignTop = () => <SimpleCarousel buttonAlign="top" />

export const Small = () => <SimpleCarousel size="small" />

export const WithoutIndicators = () => <SimpleCarousel indicators={false} />

export const MultipleCards = () => {
  const [scroll, setScroll] = useState(1)
  const [page, setPage] = useState(3)

  const onChangeScroll = (e: ChangeEvent<HTMLSelectElement>) =>
    setScroll((e.target.value as unknown) as number)
  const onChangePage = (e: ChangeEvent<HTMLSelectElement>) =>
    setPage((e.target.value as unknown) as number)

  return (
    <Flex sx={{ flexDirection: 'column' }}>
      <Select
        label="Slides per page"
        id="page"
        onChange={onChangePage}
        value={page}
      >
        {[2, 3, 4, 5].map((value) => (
          <Select.Option value={value}>{value}</Select.Option>
        ))}
      </Select>
      <Select
        label="Slides per scroll"
        id="scroll"
        onChange={onChangeScroll}
        value={scroll}
      >
        {[1, 2, 3, 4, 5].map((value) => (
          <Select.Option value={value}>{value}</Select.Option>
        ))}
      </Select>
      <Carousel
        indicators={false}
        slidesPerPage={page}
        slidesPerScroll={scroll}
      >
        {[...Array(10).keys()].map((value) => (
          <Card sx={{ marginY: 2 }}>
            <Card.Header>Card</Card.Header>
            <Card.Body sx={{ textAlign: 'center' }}>{value + 1}</Card.Body>
          </Card>
        ))}
      </Carousel>
    </Flex>
  )
}
