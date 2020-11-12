import { useState } from 'react'
import { useSwipeable } from 'react-swipeable'

const useCarouselState = ({ totalSlides }: { totalSlides: number }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [swapSlide, setSwapSlide] = useState(0)
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr')

  const handleChangeSlide = (newSlide: number) => {
    if (newSlide > currentSlide) {
      setDirection('ltr')
    } else {
      setDirection('rtl')
    }
    setSwapSlide(currentSlide)
    setCurrentSlide(newSlide)
  }

  const handleNext = () => {
    const nextSlide = (currentSlide + 1) % totalSlides
    setDirection('ltr')
    setSwapSlide(currentSlide)
    setCurrentSlide(nextSlide)
  }

  const handlePrevious = () => {
    const previousSlide = (totalSlides + currentSlide - 1) % totalSlides
    setDirection('rtl')
    setSwapSlide(currentSlide)
    setCurrentSlide(previousSlide)
  }

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrevious,
  })

  return {
    currentSlide,
    swapSlide,
    direction,
    handleChangeSlide,
    handleNext,
    handlePrevious,
    swipeHandlers,
  }
}

export default useCarouselState
