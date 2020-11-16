---
path: /stepper/
---

# Stepper

This is a component of a regular numerical input where you expect the user to modify it by a few incremental steps.

## Behavior

```jsx
import { ThemeProvider, Stepper } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Stepper value={1} helperText="Helper Text"></Stepper>
    </ThemeProvider>
  )
}
```

## Installation

```static
yarn add @vtex/admin-ui
```

```jsx static
import { Stepper } from '@vtex/admin-ui'
```

## Variation

### Error

```jsx
import { ThemeProvider, Stepper } from '@vtex/admin-ui'
import { useState } from 'react'

function Example() {
  const [value, setValue] = useState(5)
  const stepperData = { minValue: 0, maxValue: 4 }
  return (
    <ThemeProvider>
      <Stepper
        value={value}
        minValue={stepperData.minValue}
        maxValue={stepperData.maxValue}
        onChange={(newValue) => {
          setValue(newValue)
        }}
        error={value > stepperData.maxValue || value < stepperData.minValue}
        errorMessage={
          value > stepperData.maxValue
            ? 'Maximum value exceeded'
            : value < stepperData.minValue
            ? 'Invalid Value'
            : undefined
        }
      />
    </ThemeProvider>
  )
}
```

### Disabled

```jsx
import { ThemeProvider, Set, Stepper } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Set orientation="horizontal">
        <Stepper value={9} disable />
        <Stepper value={1} minValue={1} />
      </Set>
    </ThemeProvider>
  )
}
```

## Variation

### Min and Max Value

```jsx
import { ThemeProvider, Stepper } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Stepper variant="focus" value={2} minValue={0} maxValue={4}></Stepper>
    </ThemeProvider>
  )
}
```

### OnChange Function

```jsx
import { ThemeProvider, Stepper } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Stepper
        variant="focus"
        value={1}
        onChange={(value) => {
          alert(`Hi ${value}`)
        }}
      ></Stepper>
    </ThemeProvider>
  )
}
```

### Unit Mutiplier

```jsx
import { ThemeProvider, Stepper } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Stepper variant="focus" value={0} unitMultiplier={5}></Stepper>
    </ThemeProvider>
  )
}
```

## Props

<proptypes heading="Stepper" component="Stepper" />
