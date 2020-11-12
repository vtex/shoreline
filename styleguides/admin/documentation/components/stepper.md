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
      <Stepper value={1}></Stepper>
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

### Focus

```jsx
import { ThemeProvider, Stepper } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Stepper variant="focus" value={1}></Stepper>
    </ThemeProvider>
  )
}
```

### Hover

```jsx
import { ThemeProvider, Stepper } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Stepper variant="hover" value={1}></Stepper>
    </ThemeProvider>
  )
}
```

### Error

```jsx
import { ThemeProvider, Stepper } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Stepper variant="danger" value={1}></Stepper>
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
        <Stepper value={9} disable={true} />
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

### Default Value

If an error occurs or an alphabet character is written in the entry, the default value assumes the value

```jsx
import { ThemeProvider, Stepper } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Stepper variant="hover" value={0} defaultValue={5}></Stepper>
    </ThemeProvider>
  )
}
```

## Props

<proptypes heading="Stepper" component="Stepper" />
