import React, { useState, ReactNode } from 'react'
import { Flex, Button, IconCaret } from '@vtex/brand-ui'
import { VisuallyHidden } from 'reakit/VisuallyHidden'

interface Props {
  children: ReactNode[]
  indicators?: boolean
  size?: 'regular' | 'small'
}

export const Carousel = ({
  children: slides,
  indicators = true,
  size = 'regular',
}: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = slides.length

  const handleNext = () => setCurrentSlide((currentSlide + 1) % totalSlides)

  const handlePrevious = () =>
    setCurrentSlide((currentSlide - 1 + totalSlides) % totalSlides)

  return (
    <Flex variant="carousel">
      <Flex variant="carousel.slidesContainer">
        {slides.map((slide, index) => (
          <Flex
            key={index}
            variant={`carousel.slide.${
              index === currentSlide ? 'visible' : 'hidden'
            }`}
          >
            {slide}
          </Flex>
        ))}
      </Flex>
      <Flex variant="carousel.navigationContainer.previous">
        <Button
          onClick={handlePrevious}
          sx={{ variant: 'carousel.previousButton' }}
        >
          <IconCaret size={48} direction="left" />
          <VisuallyHidden>Previous slide</VisuallyHidden>
        </Button>
      </Flex>
      <Flex variant="carousel.navigationContainer.next">
        <Button onClick={handleNext} sx={{ variant: 'carousel.nextButton' }}>
          <IconCaret size={48} direction="right" />
          <VisuallyHidden>Next slide</VisuallyHidden>
        </Button>
      </Flex>
      {indicators && (
        <IndicatorBar
          size={size}
          slides={slides}
          setCurrentSlide={setCurrentSlide}
          currentSlide={currentSlide}
        />
      )}
    </Flex>
  )
}

interface IndicatorBarProps {
  slides: ReactNode[]
  setCurrentSlide: (slide: number) => void
  currentSlide: number
  size: 'regular' | 'small'
}

const IndicatorBar = ({
  slides,
  setCurrentSlide,
  currentSlide,
  size,
}: IndicatorBarProps) => (
  <Flex variant={`carousel.indicatorBar.${size}`}>
    {slides.map((_slide: ReactNode, slideIndex: number) => (
      <Indicator
        slideIndex={slideIndex}
        setCurrentSlide={setCurrentSlide}
        active={currentSlide == slideIndex}
      />
    ))}
  </Flex>
)

interface IndicatorProps {
  slideIndex: number
  setCurrentSlide: (slide: number) => void
  active: boolean
}

const Indicator = ({ slideIndex, setCurrentSlide, active }: IndicatorProps) => (
  <Button
    key={slideIndex}
    onClick={() => setCurrentSlide(slideIndex)}
    sx={{ variant: `carousel.indicator${active ? '.active' : ''}` }}
  >
    <VisuallyHidden>Slide {slideIndex}</VisuallyHidden>
  </Button>
)

export default Carousel
