import { useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'

const useCarouselState = ({ totalSteps }: { totalSteps: number }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [transition, setTransition] = useState(false)
  useEffect(() => {
    setCurrentStep(0)
  }, [totalSteps])

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
    currentStep,
    transition,
    handleChangeStep,
    handleNext,
    handlePrevious,
    swipeHandlers,
  }
}

export default useCarouselState
