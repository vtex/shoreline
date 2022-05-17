import { useCallback, useState } from 'react'

export const useNumberFieldState = (
  initialValue: number,
  max: number,
  min: number,
  step: number
) => {
  const [currentValue, setCurrentValue] = useState(initialValue)

  const handleChange = useCallback((event) => {
    setCurrentValue(event.target.value)
  }, [])

  const handleIncrement = useCallback(() => {
    if (currentValue + step <= (max ?? 10)) {
      setCurrentValue((previousValue: number) => previousValue + step)
    } else {
      setCurrentValue(Number(max ?? 10))
    }
  }, [currentValue])

  const handleDecrement = useCallback(() => {
    if (currentValue - step >= (min ?? -10)) {
      setCurrentValue((previousValue: number) => previousValue - step)
    } else {
      setCurrentValue(Number(min ?? -10))
    }
  }, [currentValue])

  return {
    currentValue,
    handleChange,
    handleIncrement,
    handleDecrement,
  }
}
