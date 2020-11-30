---
path: /form/numeric-stepper/
---

# NumericStepper

NumericSteppers represents a control for regular numerical input, where you expect the user to modify it by a few incremental steps.

## Behavior

```jsx
import { ThemeProvider, NumericStepper } from '@vtex/admin-ui'

function Example() {
  const [value, setValue] = React.useState(0)

  return (
    <ThemeProvider>
      <NumericStepper
        value={value}
        helperText="Helper Text"
        label="numeric-stepper"
        onChange={(event) => setValue(event.value)}
      />
    </ThemeProvider>
  )
}
```

## Installation

```static
yarn add @vtex/admin-ui
```

```jsx static
import { NumericStepper } from '@vtex/admin-ui'
```

## Variations

### Step Multiplier

The NumericStepper has two buttons: one to increment the value and the other to decrement. By default, you can increase or decrease the value one by one, but you can also set a `step`, so the value will increase or decrease according to the multiplier defined.

```jsx
import { ThemeProvider, NumericStepper } from '@vtex/admin-ui'

function Example() {
  const [value, setValue] = React.useState(0)

  return (
    <ThemeProvider>
      <NumericStepper
        value={value}
        step={5}
        helperText="Helper Text"
        label="numeric-stepper"
        onChange={(event) => setValue(event.value)}
      />
    </ThemeProvider>
  )
}
```

### Minimum and Maximum limits

You can define two limits so that the value is never less than the minimum or greater than the maximum. If you reach one of these limits, the buttons for increasing and decreasing the value will be disabled. To use these variations the `minValue` and `maxValue` properties should have a value defined.

```jsx
import { ThemeProvider, NumericStepper } from '@vtex/admin-ui'

function Example() {
  const [value, setValue] = React.useState(0)

  return (
    <ThemeProvider>
      <NumericStepper
        value={value}
        minValue={0}
        maxValue={4}
        onChange={(event) => setValue(event.value)}
        label="stepper number"
      />
    </ThemeProvider>
  )
}
```

### Helper Text

You can add a helper text to indicate the proper way to fill in the numeric stepper. To use this variation, the `helperText` property should have a value defined.

```jsx
import { ThemeProvider, NumericStepper } from '@vtex/admin-ui'

function Example() {
  const [value, setValue] = React.useState(0)

  return (
    <ThemeProvider>
      <NumericStepper
        value={value}
        helperText="Helper Text"
        label="numeric-stepper"
        onChange={(event) => setValue(event.value)}
      />
    </ThemeProvider>
  )
}
```

### Error

It means that the user added an invalid input value to the `NumericStepper`. To use this variation, the `error` property should have a `true` value. You should, also define the `errorMessage` property, so the user can know what's the error is about. The error message will appear in the same position as the `helperText`.

```jsx
import { ThemeProvider, NumericStepper } from '@vtex/admin-ui'
import { useState } from 'react'

function Example() {
  const [value, setValue] = useState(5)
  const minValue = 0
  const maxValue = 4

  const errorMessage =
    value < minValue ? 'Less than minimum!' : 'Greater than maximum!'

  return (
    <ThemeProvider>
      <NumericStepper
        value={value}
        minValue={0}
        maxValue={4}
        onChange={(event) => setValue(event.value)}
        error={value > maxValue || value < minValue}
        errorMessage={errorMessage}
        label="numeric-stepper"
      />
    </ThemeProvider>
  )
}
```

### Disabled

It means that the user will not be able to add any input value to the NumericStepper. To use this variation, the `disabled` property should have a true value.

```jsx
import { ThemeProvider, Set, NumericStepper } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <NumericStepper
        value={0}
        onChange={() => {}}
        disabled
        label="numeric-stepper"
      />
    </ThemeProvider>
  )
}
```

## State

You can use the properties `value`, and `onChange` to handling if the value has changed. You also can control the `error` property to indicate if it's a valid input or not. Note that the `onChange` represents a function with an object `{ value: number }` as a parameter. Check the example below.

```jsx
import { ThemeProvider, NumericStepper } from '@vtex/admin-ui'

function Example() {
  const [value, setValue] = React.useState(0)

  return (
    <ThemeProvider>
      <NumericStepper
        value={value}
        helperText="Helper Text"
        error={value === 5}
        errorMessage="Value cannot be 5!"
        label="numeric-stepper"
        onChange={(event) => setValue(event.value)}
      />
    </ThemeProvider>
  )
}
```

## Props

<proptypes heading="NumericStepper" component="NumericStepper" />
