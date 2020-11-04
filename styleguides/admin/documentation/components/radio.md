---
path: /docs/radio/
---

# Radio

An accessible Radio input component.

## Behavior

```jsx
import { Radio, useRadioState, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const state = useRadioState({})

  return (
    <ThemeProvider>
      <Radio state={state} value="playground" aria-label="playground" />
    </ThemeProvider>
  )
}
```

**value prop**

The `Radio` is used mostly in a `RadioGroup` context, so every Radio should have a value set.

**aria-label prop**

`aria-label` is an optional prop, but, as a `form` component, the Radio should have a label specified to be accessible, so we grant this using this property.

### State

#### `useRadio` hook

The `Radio` component is always used in a `RadioGroup` context, so we provide this hook that already handles the state and accessible navigation logic for both `Radio` and `RadioGroup` components.

#### Hook return

```jsx static
interface RadioStateReturn {
  baseId: string
  state: string | number | undefined
  setState: React.Dispatch<React.SetStateAction<string | number | undefined>>
  rtl: boolean
  orientation?: 'horizontal' | 'vertical' | undefined
  items: Item[]
  groups: Group[]
  currentId?: string | null | undefined
  loop: boolean | Orientation
  wrap: boolean | Orientation
  unstable_virtual: boolean
  unstable_moves: number
  unstable_angular: boolean
  unstable_hasActiveWidget: boolean
}
```

## Installation

```jsx static
yarn add @vtex/admin-ui
```

```jsx static
import { Radio } from '@vtex/admin-ui'
```

## Variation

```jsx
import {
  Radio,
  useRadioState,
  ThemeProvider,
  Text,
  RadioGroup,
  Label,
} from '@vtex/admin-ui'

function Example() {
  const state = useRadioState({ state: 'oms' })
  const values = [
    'Marketplace Ecommerce',
    'B2C Commerce',
    'B2B Commerce',
    'Order Management System',
    'Disabled',
  ]
  return (
    <ThemeProvider>
      <Text variant="subtitle">Selected solution: {state.state}</Text>
      <RadioGroup state={state} orientation="vertical" aria-label="Solutions">
        {values.map((value, key) => {
          return (
            <Label key={key}>
              <Radio
                value={value}
                state={state}
                disabled={value === 'Disabled'}
              />
              {value}
            </Label>
          )
        })}
      </RadioGroup>
    </ThemeProvider>
  )
}
```

## Props

### WIP

<proptypes heading="Radio" component="Radio" />
