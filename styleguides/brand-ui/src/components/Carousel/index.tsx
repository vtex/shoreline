import React, { useState, ReactNode } from 'react'
import { Flex, Button, IconCaret } from '@vtex/brand-ui'

interface Props {
  children: ReactNode[]
  indicators?: boolean
  size?: 'regular' | 'small'
}

export const Carousel = ({ children: slides, indicators = true, size = 'regular' }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = slides.length

  const handleNext = () =>
    setCurrentSlide((currentSlide + 1) % totalSlides)

  const handlePrevious = () =>
    setCurrentSlide((currentSlide - 1 + totalSlides) % totalSlides)

  return (
    <Flex sx={{ position: 'relative' }}>
      <Flex variant="carousel.slidesContainer">
        {slides.map((slide, index) => (
          <Flex key={index} variant={`carousel.slide.${index === currentSlide ? 'visible' : 'hidden'}`}>
            {slide}
          </Flex>
        ))}
      </Flex>
      <Flex variant="carousel.navigationContainer.previous">
        <Button onClick={handlePrevious} sx={{ variant: 'carousel.previousButton' }}>
          <IconCaret size={48} direction="left" />
        </Button>
      </Flex>
      <Flex variant="carousel.navigationContainer.next">
        <Button onClick={handleNext} sx={{ variant: 'carousel.nextButton' }}>
          <IconCaret size={48} direction="right" />
        </Button>
      </Flex>
      {indicators && <IndicatorBar slides={slides} setCurrentSlide={setCurrentSlide} currentSlide={currentSlide} />}
    </Flex>
  )
}

interface IndicatorBarProps {
  slides: ReactNode[],
  setCurrentSlide: (slide: number) => void,
  currentSlide: number
}

const IndicatorBar = ({ slides, setCurrentSlide, currentSlide }: IndicatorBarProps) => (
  <Flex variant="carousel.navigationBar">
    {slides.map((_slide: ReactNode, slideIndex: number) => (
      <Button
        key={slideIndex}
        onClick={() => setCurrentSlide(slideIndex)}
        sx={{ variant: `carousel.indicator${currentSlide === slideIndex ? '.active' : ''}` }}
      />
    ))}
  </Flex>
)

export default Carousel
