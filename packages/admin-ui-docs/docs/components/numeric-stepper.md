---
title: NumericStepper
path: /numeric-stepper/
---

# NumericStepper

NumericSteppers represent a control for regular numerical input, where you expect the user to modify it by a few incremental steps.

## Usage

```jsx isStatic
import { NumericStepper } from '@vtex/admin-ui'

function Example() {
  const [value, setValue] = React.useState(0)

  return (
    <NumericStepper
      value={value}
      helperText="Helper Text"
      label="numeric-stepper"
      onChange={(event) => setValue(event.value)}
    />
  )
}
```

## Examples

### Tone of voice

The `NumericStepper` [tone of voice](/foundations/colors/#tones) is either `neutral` (default) or `critical`, and is adjustable with the `tone` prop.

```jsx live
<Set spacing={3}>
  <NumericStepper
    value={10}
    minValue={0}
    maxValue={10}
    onChange={() => null}
    helperText="Helper text"
    label="numeric-stepper"
  />
  <NumericStepper
    value={10}
    minValue={0}
    maxValue={10}
    tone="critical"
    onChange={() => null}
    criticalText="Critical text"
    label="numeric-stepper"
  />
</Set>
```

### Step Multiplier

The NumericStepper has two buttons: one to increment the value and the other to decrement. By default, you can increase or decrease the value one by one, but you can also set a `step`, so the value will increase or decrease according to the multiplier defined.

```jsx live
function Example() {
  const [value, setValue] = React.useState(0)

  return (
    <NumericStepper
      value={value}
      step={5}
      helperText="Helper Text"
      label="numeric-stepper"
      onChange={(event) => setValue(event.value)}
    />
  )
}
```

### Minimum and Maximum limits

You can define two limits so that the value is never less than the minimum or greater than the maximum. If you reach one of these limits, the buttons for increasing and decreasing the value will be disabled. To use these variations the `minValue` and `maxValue` properties should have a value defined.

```jsx live
function Example() {
  const [value, setValue] = React.useState(0)

  return (
    <NumericStepper
      value={value}
      minValue={0}
      maxValue={4}
      onChange={(event) => setValue(event.value)}
      label="stepper number"
    />
  )
}
```

### Helper Text

You can add a helper text to indicate the proper way to fill in the numeric stepper. To use this variation, the `helperText` property should have a value defined.

```jsx live
function Example() {
  const [value, setValue] = React.useState(0)

  return (
    <NumericStepper
      value={value}
      helperText="Helper Text"
      label="numeric-stepper"
      onChange={(event) => setValue(event.value)}
    />
  )
}
```

### Disabled

It means that the user will not be able to add any input value to the NumericStepper. To use this variation, the `disabled` property should have a true value.

```jsx live
<NumericStepper
  value={0}
  onChange={() => {}}
  disabled
  label="numeric-stepper"
/>
```

## State

You can use the properties `value`, and `onChange` to handle value changes. You also can control the `tone` property to indicate if it is a valid input or not. Note that the `onChange` represents a function with an object `{ value: number }` as a parameter. Check the example below.

```jsx live
function Example() {
  const [value, setValue] = React.useState(0)

  return (
    <NumericStepper
      value={value}
      helperText="Helper Text"
      tone={value === 5 ? 'critical' : 'neutral'}
      criticalText="Value cannot be 5!"
      label="numeric-stepper"
      onChange={(event) => setValue(event.value)}
    />
  )
}
```

## Props

| Name         | Type                        | Description                              | Required | Default   |
| ------------ | --------------------------- | ---------------------------------------- | -------- | --------- |
| value        | `number`                    | Displayed value                          | ✅       | -         |
| onChange     | `({value: number}) => void` | Change handler                           | ✅       | -         |
| label        | `string`                    | Input label                              | ✅       | -         |
| minValue     | `number`                    | Min value accepted                       | 🚫       | -10e9     |
| maxValue     | `number`                    | Max value accepted                       | 🚫       | 10e9      |
| disabled     | `boolean`                   | Whether its disabled or not              | 🚫       | false     |
| tone         | `neutral`, `critical`       | Tone of voice                            | 🚫       | `neutral` |
| criticalText | `string`                    | Error message                            | 🚫       | -         |
| helperText   | `string`                    | Helper text message                      | 🚫       | -         |
| step         | `number`                    | Increment and decrement multiplier value | 🚫       | `1`       |
