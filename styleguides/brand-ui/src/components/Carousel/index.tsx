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
  loop?: boolean
  slidesPerPage?: number
  slidesPerScroll?: number
  overlaySlides?: boolean
  initialSlide?: number
}

export const Carousel = ({
  children: slides,
  indicators = true,
  size = 'regular',
  crossfade = false,
  buttonAlign = 'center',
  sx = {},
  loop = true,
  slidesPerPage = 1,
  slidesPerScroll = slidesPerPage,
  overlaySlides = true,
  initialSlide = 0,
}: CarouselProps) => {
  const {
    totalSteps,
    currentStep,
    handleChangeStep,
    handleNext,
    handlePrevious,
    swipeHandlers,
    transition,
  } = useCarouselState({
    totalSlides: slides.length,
    slidesPerPage,
    slidesPerScroll,
    initialSlide,
  })

  const stopAtEnd = loop ? false : currentStep + 1 >= totalSteps
  const stopAtBeginning = loop ? false : currentStep - 1 < 0

  return (
    <Flex variant="carousel" sx={sx}>
      <Flex>
        <NavigationContainer
          direction="previous"
          overlaySlides={overlaySlides}
          buttonAlign={buttonAlign}
          handleClick={handlePrevious}
          size={size}
          visible={!stopAtBeginning}
        />
        <SlidesContainer
          transition={transition}
          swipeHandlers={swipeHandlers}
          slides={slides}
          currentStep={currentStep}
          crossfade={crossfade}
          slidesPerScroll={slidesPerScroll}
          slidesPerPage={slidesPerPage}
        />
        <NavigationContainer
          direction="next"
          overlaySlides={overlaySlides}
          buttonAlign={buttonAlign}
          handleClick={handleNext}
          size={size}
          visible={!stopAtEnd}
        />
      </Flex>
      {indicators && (
        <ProgressIndicatorBar
          overlaySlides={overlaySlides}
          totalSteps={totalSteps}
          handleChangeStep={handleChangeStep}
          currentStep={currentStep}
        />
      )}
    </Flex>
  )
}

interface NavigationContainerProps {
  size: 'regular' | 'small'
  buttonAlign: 'top' | 'center'
  overlaySlides: boolean
  direction: 'previous' | 'next'
  handleClick: () => void
  visible: boolean
}

const NavigationContainer = ({
  direction,
  overlaySlides,
  buttonAlign,
  handleClick,
  size,
  visible,
}: NavigationContainerProps) => (
  <Flex
    variant={`carousel.navigationContainer.${direction}-${
      overlaySlides ? 'overlay' : 'default'
    }-${buttonAlign}`}
    sx={{ visibility: visible ? 'visible' : 'hidden' }}
  >
    <Button
      onClick={handleClick}
      sx={{
        variant: `carousel.${direction}.${size}`,
      }}
    >
      <IconCaret
        size={size === 'regular' ? 48 : 24}
        direction={direction === 'previous' ? 'left' : 'right'}
      />
      <VisuallyHidden>{direction} step</VisuallyHidden>
    </Button>
  </Flex>
)

interface SlidesContainerProps {
  slides: ReactNode[]
  swipeHandlers: SwipeableHandlers
  currentStep: number
  crossfade: boolean
  slidesPerPage: number
  slidesPerScroll: number
  transition: boolean
}

const SlidesContainer = ({
  swipeHandlers,
  slides,
  currentStep,
  crossfade,
  slidesPerPage,
  slidesPerScroll,
  transition,
}: SlidesContainerProps) => {
  const slideWidth = 100 / slidesPerPage
  const translateX =
    Math.min(currentStep * slidesPerScroll, slides.length - slidesPerPage) *
    slideWidth
  const variant = crossfade
    ? transition
      ? '.crossfade.animated'
      : '.crossfade.default'
    : ''

  return (
    <Flex sx={{ overflow: 'hidden' }}>
      <Flex
        {...swipeHandlers}
        variant={`carousel.slidesContainer${variant}`}
        sx={{ transform: `translateX(-${translateX}%)` }}
      >
        {slides.map((slide, index) => {
          return (
            <Flex
              key={index}
              variant="carousel.slide"
              sx={{ width: `${slideWidth}%` }}
            >
              {slide}
            </Flex>
          )
        })}
      </Flex>
    </Flex>
  )
}

interface ProgressIndicatorBarProps {
  totalSteps: number
  handleChangeStep: (slide: number) => void
  currentStep: number
  overlaySlides: boolean
}

const ProgressIndicatorBar = ({
  totalSteps,
  handleChangeStep,
  currentStep,
  overlaySlides,
}: ProgressIndicatorBarProps) => (
  <Flex
    variant={`carousel.indicatorBar.${overlaySlides ? 'overlay' : 'default'}`}
  >
    {[...Array(totalSteps).keys()].map((step: number) => (
      <ProgressIndicator
        key={step}
        step={step}
        handleChangeStep={handleChangeStep}
        active={currentStep === step}
      />
    ))}
  </Flex>
)

interface IndicatorProps {
  step: number
  handleChangeStep: (slide: number) => void
  active: boolean
}

const ProgressIndicator = ({
  step,
  handleChangeStep,
  active,
}: IndicatorProps) => (
  <Button
    key={step}
    onClick={() => handleChangeStep(step)}
    sx={{ variant: `carousel.indicator${active ? '.active' : ''}` }}
  >
    <VisuallyHidden>Step {step}</VisuallyHidden>
  </Button>
)

export default Carousel
