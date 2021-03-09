import { useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'

interface CarouselStateProps {
  totalSlides: number
  slidesPerPage: number
  slidesPerScroll: number
  initialSlide: number
}

const useCarouselState = ({
  totalSlides,
  slidesPerPage,
  slidesPerScroll,
  initialSlide,
}: CarouselStateProps) => {
  const totalSteps =
    1 + Math.ceil((totalSlides - slidesPerPage) / slidesPerScroll)

  const initialStep = Math.max(
    0,
    Math.ceil((initialSlide - slidesPerPage + 1) / slidesPerScroll)
  )

  const [currentStep, setCurrentStep] = useState(initialStep)
  const [transition, setTransition] = useState(false)
  useEffect(() => {
    setCurrentStep(initialStep)
  }, [totalSteps, initialSlide])

  const handleChangeStep = (newStep: number) => {
    setTransition(true)
    setTimeout(() => {
      setCurrentStep(newStep)
      setTimeout(() => {
        setTransition(false)
      }, 250)
    }, 250)
  }

  const handleNext = () => {
    const nextStep = (currentStep + 1) % totalSteps
    handleChangeStep(nextStep)
  }

  const handlePrevious = () => {
    const previousStep = (totalSteps + currentStep - 1) % totalSteps
    handleChangeStep(previousStep)
  }

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrevious,
  })

  return {
    totalSteps,
    currentStep,
    transition,
    handleChangeStep,
    handleNext,
    handlePrevious,
    swipeHandlers,
  }
}

export default useCarouselState
