import { Divider, Radio, RadioGroup, Stack } from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack>
      <RadioGroup label="Vertical radio group" errorText="Something is wrong">
        <Radio value="apple-value">Apples</Radio>
        <Radio value="pineapple-value">Pineapples</Radio>
        <Radio value="orange-value">Oranges</Radio>
        <Radio value="watermelon-value">Watermelons</Radio>
      </RadioGroup>

      <Divider />

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

      <Divider />

      <RadioGroup
        label="Vertical radio group with description"
        errorText="Something is wrong"
        description="Please select your favorite fruit"
      >
        <Radio value="apple-value">Apples</Radio>
        <Radio value="pineapple-value">Pineapples</Radio>
        <Radio value="orange-value">Oranges</Radio>
        <Radio value="watermelon-value">Watermelons</Radio>
      </RadioGroup>

      <Divider />

      <RadioGroup label="Horizontal radio group" horizontal>
        <Radio value="apple-value">Apples</Radio>
        <Radio value="pineapple-value">Pineapples</Radio>
        <Radio value="orange-value">Oranges</Radio>
        <Radio value="watermelon-value">Watermelons</Radio>
      </RadioGroup>

      <Divider />

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

      <Divider />

      <RadioGroup
        label="Horizontal radio group with description"
        horizontal
        description="Please select your favorite fruit"
      >
        <Radio value="apple-value">Apples</Radio>
        <Radio value="pineapple-value">Pineapples</Radio>
        <Radio value="orange-value">Oranges</Radio>
        <Radio value="watermelon-value">Watermelons</Radio>
      </RadioGroup>
    </Stack>
  )
}
