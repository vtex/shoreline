export const isNumber = (value: number | string): value is number =>
  typeof value === 'number'

export const isNumberAsString = (value: number | string): value is string =>
  typeof value === 'string' && value.length > 0 && !Number.isNaN(Number(value))

export const isValidNumber = (value: number, min: number, max: number) =>
  min <= value && value <= max

export const getIncrementedValue = ({
  currentValue,
  nextValue,
  min,
  max,
}: NumberValidationProps): number => {
  if (isValidNumber(currentValue, min, max)) {
    return nextValue <= max ? nextValue : max
  }

  // When the currentValue is less than the min range value and you click to increment
  return min
}

export const getDecrementedValue = ({
  currentValue,
  nextValue,
  min,
  max,
}: NumberValidationProps): number => {
  if (isValidNumber(currentValue, min, max)) {
    return nextValue >= min ? nextValue : min
  }

  // When the currentValue is more than the max range value and you click to decrement
  return max
}

export type NumberValidationProps = {
  currentValue: number
  nextValue: number
  min: number
  max: number
}
