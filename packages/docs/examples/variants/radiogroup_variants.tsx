import { Radio, RadioGroup } from '@vtex/shoreline'

export function DefaultRadioGroup() {
  return (
    <RadioGroup label="Vertical radio group">
      <Radio value="apple-value">Apples</Radio>
      <Radio value="pineapple-value">Pineapples</Radio>
      <Radio value="orange-value">Oranges</Radio>
      <Radio value="watermelon-value">Watermelons</Radio>
    </RadioGroup>
  )
}

export function HorizontalRadioGroup() {
  return (
    <RadioGroup label="Horizontal radio group" horizontal>
      <Radio value="apple-value">Apples</Radio>
      <Radio value="pineapple-value">Pineapples</Radio>
      <Radio value="orange-value">Oranges</Radio>
      <Radio value="watermelon-value">Watermelons</Radio>
    </RadioGroup>
  )
}

export function RadioGroupWithError() {
  return (
    <RadioGroup
      label="Vertical radio group with error"
      errorText="Something is wrong"
      error
    >
      <Radio value="apple-value">Apples</Radio>
      <Radio value="pineapple-value">Pineapples</Radio>
      <Radio value="orange-value">Oranges</Radio>
      <Radio value="watermelon-value">Watermelons</Radio>
    </RadioGroup>
  )
}

export function RadioGroupWithDescription() {
  return (
    <RadioGroup
      label="Vertical radio group with description"
      description="Please select your favorite fruit"
    >
      <Radio value="apple-value">Apples</Radio>
      <Radio value="pineapple-value">Pineapples</Radio>
      <Radio value="orange-value">Oranges</Radio>
      <Radio value="watermelon-value">Watermelons</Radio>
    </RadioGroup>
  )
}

export function HorizontalRadioGroupWithError() {
  return (
    <RadioGroup
      label="Horizontal radio group with error"
      horizontal
      errorText="Something is wrong"
      error
    >
      <Radio value="apple-value">Apples</Radio>
      <Radio value="pineapple-value">Pineapples</Radio>
      <Radio value="orange-value">Oranges</Radio>
      <Radio value="watermelon-value">Watermelons</Radio>
    </RadioGroup>
  )
}
