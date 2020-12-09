import React, { ReactNode } from 'react'
import { SwipeableHandlers } from 'react-swipeable'
import { VisuallyHidden } from 'reakit/VisuallyHidden'
import { Flex, SxStyleProp } from 'theme-ui'

import { Button } from '../Button'
import { IconCaret } from '../../icons'
import useCarouselState from './useCarouselState'

export interface CarouselProps {
  children: ReactNode[]
  indicators?: boolean
  size?: 'regular' | 'small'
  sx?: SxStyleProp
  crossfade?: boolean
  buttonAlign?: 'top' | 'center'
}

export const Carousel = ({
  children: slides,
  indicators = true,
  size = 'regular',
  crossfade = false,
  buttonAlign = 'center',
  sx = {},
}: CarouselProps) => {
  const {
    currentSlide,
    swapSlide,
    direction,
    handleChangeSlide,
    handleNext,
    handlePrevious,
    swipeHandlers,
  } = useCarouselState({ totalSlides: slides.length })

  return (
    <Flex variant="carousel" sx={sx}>
      <SlidesContainer
        swipeHandlers={swipeHandlers}
        slides={slides}
        direction={direction}
        currentSlide={currentSlide}
        swapSlide={swapSlide}
        crossfade={crossfade}
      />
      <Flex
        variant="carousel.navigationContainer.previous"
        sx={{ alignItems: buttonAlign === 'top' ? 'baseline' : 'center' }}
      >
        <Button
          onClick={handlePrevious}
          sx={{
            variant: `carousel.previousButton.${size}`,
          }}
        >
          <IconCaret size={size === 'regular' ? 48 : 24} direction="left" />
          <VisuallyHidden>Previous slide</VisuallyHidden>
        </Button>
      </Flex>
      <Flex
        variant="carousel.navigationContainer.next"
        sx={{ alignItems: buttonAlign === 'top' ? 'baseline' : 'center' }}
      >
        <Button
          onClick={handleNext}
          sx={{
            variant: `carousel.nextButton.${size}`,
          }}
        >
          <IconCaret size={size === 'regular' ? 48 : 24} direction="right" />
          <VisuallyHidden>Next slide</VisuallyHidden>
        </Button>
      </Flex>
      {indicators && (
        <IndicatorBar
          slides={slides}
          handleChangeSlide={handleChangeSlide}
          currentSlide={currentSlide}
        />
      )}
    </Flex>
  )
}

interface SlidesContainerProps {
  slides: ReactNode[]
  direction: 'ltr' | 'rtl'
  swipeHandlers: SwipeableHandlers
  currentSlide: number
  swapSlide: number
  crossfade: boolean
}

const SlidesContainer = ({
  swipeHandlers,
  slides,
  direction,
  currentSlide,
  swapSlide,
  crossfade,
}: SlidesContainerProps) => (
  <Flex {...swipeHandlers} variant="carousel.slidesContainer">
    {slides.map((slide, index) => {
      let variant = ''

      if (index === currentSlide) {
        variant = 'current'
      } else if (crossfade || index !== swapSlide) {
        variant = 'default'
      } else {
        variant = 'swap'
      }

      const disableAnimation = currentSlide === swapSlide

      return (
        <Flex
          key={index}
          variant={`carousel.slide.${
            crossfade ? 'crossfade' : direction
          }.${variant}`}
          sx={disableAnimation ? { animation: 'none' } : {}}
        >
          {slide}
        </Flex>
      )
    })}
  </Flex>
)

interface IndicatorBarProps {
  slides: ReactNode[]
  handleChangeSlide: (slide: number) => void
  currentSlide: number
}

const IndicatorBar = ({
  slides,
  handleChangeSlide,
  currentSlide,
}: IndicatorBarProps) => (
  <Flex variant="carousel.indicatorBar">
    {slides.map((_slide: ReactNode, slideIndex: number) => (
      <Indicator
        key={slideIndex}
        slideIndex={slideIndex}
        handleChangeSlide={handleChangeSlide}
        active={currentSlide === slideIndex}
      />
    ))}
  </Flex>
)

interface IndicatorProps {
  slideIndex: number
  handleChangeSlide: (slide: number) => void
  active: boolean
}

const Indicator = ({
  slideIndex,
  handleChangeSlide,
  active,
}: IndicatorProps) => (
  <Button
    key={slideIndex}
    onClick={() => handleChangeSlide(slideIndex)}
    sx={{ variant: `carousel.indicator${active ? '.active' : ''}` }}
  >
    <VisuallyHidden>Slide {slideIndex}</VisuallyHidden>
  </Button>
)

export default Carousel
