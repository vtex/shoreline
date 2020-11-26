---
path: /form/radio/
---

# Radio

Radio buttons are tools that customize configurations. They represent a need for the user to make a choice among a few offered options. In multiple choice forms, use radio buttons for a single option to be selected. This component is always used in a `RadioGroup` context.

## Behavior

```jsx
import { Radio, useRadioState, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const state = useRadioState()

  return (
    <ThemeProvider>
      <Radio state={state} value="Radio" aria-label="radio button" />
    </ThemeProvider>
  )
}
```

## Installation

```static
yarn add @vtex/admin-ui
```

```jsx static
import { Radio } from '@vtex/admin-ui'
```

## State

The `Radio` component is always used in a `RadioGroup` context, so handling the states of each one of them and maintain accessibility can be tricky.

### useRadioState hook

For convenience, we provide this hook that already handles the state logic and accessible navigation for both `Radio` and `RadioGroup` components. You should pass the hook return to the `state` property and define a `value` to the `Radio`.

### Example

## Variation

### Standalone

When using a standalone `Radio` you should provide an `aria-label` property value. As a `form` component, it should have a label specified to guarantee accessibility.

```jsx
import { Radio, useRadioState, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const radio = useRadioState()

  return (
    <ThemeProvider>
      <Radio aria-label="label" value="Radio" state={radio} />
    </ThemeProvider>
  )
}
```

### Checked States

There are two checked states: `not checked`, and `checked`.

```jsx
import { Radio, Set, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Set>
        <Radio aria-label="label-1" />
        <Radio aria-label="label-disabled-1" disabled />
      </Set>
      <br />
      <Set>
        <Radio aria-label="label-2" checked />
        <Radio aria-label="label-disabled-2" checked disabled />
      </Set>
    </ThemeProvider>
  )
}
```

### Size

There are two size variants: `small`, `regular`. By default, it will render `regular`.

```jsx
import { Radio, Set, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Set>
        <Radio aria-label="label-small-1" size="small" />
        <Radio aria-label="label-1" />
      </Set>
      <br />
      <Set>
        <Radio aria-label="label-small-2" checked size="small" />
        <Radio aria-label="label-2" checked />
      </Set>
    </ThemeProvider>
  )
}
```

### Multiple Radios

As we always use `Radio` in multiple-choice forms, we also always need to render multiple Radios and store the current checked state. It can be easily done using our `useRadioState` hook, you just need to pass the hook return object to the radios `state` property and define a `value` for each `Radio`.

```jsx
import {
  Radio,
  RadioGroup,
  useRadioState,
  Heading,
  Label,
  ThemeProvider,
} from '@vtex/admin-ui'

function Example() {
  const radio = useRadioState()

  return (
    <ThemeProvider>
      <Heading>Selected Radio: {radio.state}</Heading>
      <RadioGroup state={radio}>
        <Label>
          <Radio state={radio} value="First Radio" />
          First Radio
        </Label>
        <Label>
          <Radio state={radio} value="Second Radio" />
          Second Radio
        </Label>
        <Label>
          <Radio state={radio} value="Third Radio" />
          Third Radio
        </Label>
      </RadioGroup>
    </ThemeProvider>
  )
}
```

## Props

<proptypes heading="Radio" component="Radio" />
