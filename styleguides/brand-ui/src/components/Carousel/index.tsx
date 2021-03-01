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
  slidesPerScroll = 1,
}: CarouselProps) => {
  const totalSteps =
    1 + Math.ceil((slides.length - slidesPerPage) / slidesPerScroll)

  const {
    currentStep,
    handleChangeStep,
    handleNext,
    handlePrevious,
    swipeHandlers,
    transition,
  } = useCarouselState({ totalSteps })

  const stopAtEnd = loop ? false : currentStep + 1 >= totalSteps
  const stopAtBeginning = loop ? false : currentStep - 1 < 0

  return (
    <Flex variant="carousel" sx={sx}>
      <SlidesContainer
        transition={transition}
        swipeHandlers={swipeHandlers}
        slides={slides}
        currentStep={currentStep}
        crossfade={crossfade}
        slidesPerScroll={slidesPerScroll}
        slidesPerPage={slidesPerPage}
      />
      <Flex
        variant="carousel.navigationContainer.previous"
        sx={{
          alignItems: buttonAlign === 'top' ? 'baseline' : 'center',
          height: buttonAlign === 'top' ? 'fit-content' : '100%',
        }}
      >
        {!stopAtBeginning && (
          <Button
            onClick={handlePrevious}
            sx={{
              variant: `carousel.previousButton.${size}`,
            }}
          >
            <IconCaret size={size === 'regular' ? 48 : 24} direction="left" />
            <VisuallyHidden>Previous step</VisuallyHidden>
          </Button>
        )}
      </Flex>
      <Flex
        variant="carousel.navigationContainer.next"
        sx={{
          alignItems: buttonAlign === 'top' ? 'baseline' : 'center',
          height: buttonAlign === 'top' ? 'fit-content' : '100%',
        }}
      >
        {!stopAtEnd && (
          <Button
            onClick={handleNext}
            sx={{
              variant: `carousel.nextButton.${size}`,
            }}
          >
            <IconCaret size={size === 'regular' ? 48 : 24} direction="right" />
            <VisuallyHidden>Next step</VisuallyHidden>
          </Button>
        )}
      </Flex>
      {indicators && (
        <ProgressIndicatorBar
          totalSteps={totalSteps}
          handleChangeStep={handleChangeStep}
          currentStep={currentStep}
        />
      )}
    </Flex>
  )
}

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
    <Flex
      {...swipeHandlers}
      variant={`carousel.slidesContainer${variant}`}
      sx={{
        transform: `translateX(-${translateX}%)`,
      }}
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
  )
}

interface ProgressIndicatorBarProps {
  totalSteps: number
  handleChangeStep: (slide: number) => void
  currentStep: number
}

const ProgressIndicatorBar = ({
  totalSteps,
  handleChangeStep,
  currentStep,
}: ProgressIndicatorBarProps) => (
  <Flex variant="carousel.indicatorBar">
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
