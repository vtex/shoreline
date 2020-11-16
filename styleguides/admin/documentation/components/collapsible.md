---
path: /collapsible/
---

# Collapsible

A `Collapsible` component is a container that allows toggling the display of its content.

- Collapsible
- version: beta.2

## Behavior

```jsx
import { Collapsible, useCollapsible, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const state = useCollapsible()

  return (
    <ThemeProvider>
      <Collapsible state={state} w="5/12">
        <Collapsible.Header label="Build for Community #1" />
        <Collapsible.Content>
          It’s all about being ready to grow and reach new levels. Have a solid
          foundation, modular thinking and flexible essence, and you’re building
          for scale. We are global but we’re audacious enough to aim for the
          stars.
        </Collapsible.Content>
      </Collapsible>
    </ThemeProvider>
  )
}
```

## Installation

```sh
yarn add @vtex/admin-ui
```

```jsx static
import { Collapsible, useCollapsible } from '@vtex/admin-ui'
```

## Variation

### With Buttons

```jsx
import {
  Collapsible,
  useCollapsible,
  ThemeProvider,
  Button,
} from '@vtex/admin-ui'

function Example() {
  const { toggle, ...props } = useCollapsible()

  return (
    <ThemeProvider>
      <Collapsible state={{ toggle, ...props }} w="6/12">
        <Collapsible.Header label="Build for Community #1">
          <Button size="small" variant="subtle">
            Button
          </Button>
          <Button size="small" onClick={toggle}>
            Open Collapsible
          </Button>
        </Collapsible.Header>
        <Collapsible.Content>
          It’s all about being ready to grow and reach new levels. Have a solid
          foundation, modular thinking and flexible essence, and you’re building
          for scale. We are global but we’re audacious enough to aim for the
          stars.
        </Collapsible.Content>
      </Collapsible>
    </ThemeProvider>
  )
}
```

### Nested

```jsx
import { Collapsible, useCollapsible, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const firstState = useCollapsible()
  const secondState = useCollapsible()

  return (
    <ThemeProvider>
      <Collapsible state={firstState} w="5/12">
        <Collapsible.Header label="Build for Community #1" />
        <Collapsible.Content>
          <Collapsible state={secondState}>
            <Collapsible.Header label="Build for Community #2" />
            <Collapsible.Content>
              It’s all about being ready to grow and reach new levels. Have a
              solid foundation, modular thinking and flexible essence, and
              you’re building for scale. We are global but we’re audacious
              enough to aim for the stars.
            </Collapsible.Content>
          </Collapsible>
        </Collapsible.Content>
      </Collapsible>
    </ThemeProvider>
  )
}
```

### Initially Visible

```jsx
import { Collapsible, useCollapsible, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const state = useCollapsible({ visible: true })

  return (
    <ThemeProvider>
      <Collapsible state={state} w="5/12">
        <Collapsible.Header label="Build for Community #1" />
        <Collapsible.Content>
          It’s all about being ready to grow and reach new levels. Have a solid
          foundation, modular thinking and flexible essence, and you’re building
          for scale. We are global but we’re audacious enough to aim for the
          stars.
        </Collapsible.Content>
      </Collapsible>
    </ThemeProvider>
  )
}
```

### State

#### `useCollapsible` hook

It returns an object of type `DisclosureStateReturn`, and you should use this hook to add state logic to the `Collapsible` component. Add the returned value to the Collapsible's `state` prop.

> 💡 This hook is extracted directly from `reakit/disclosure` with the same props. You can check [Reakit docs](https://reakit.io/docs/disclosure/#usedisclosurestate) for detailed info

### Composites

#### `<Collapsible.Header>`

It renders a `header` HTML element, and is always visible.<br/>

**Disclosure Button**: Always on the left side, and is responsible for controlling the content visibility. Use the `label` prop to define the button label. <br />
**Actions Panel**: Always on the right side. You should pass it as the header children.

#### `<Collapsible.Content>`

It renders a `section` HTML element, can be `Hidden` or `Visible`.

### Customization

#### Collapsible

You can use the `Border`, `Layout`, `Space`, and `Color` tokens defined on our theme, or you can do it using the `sx` prop as well.

#### Collapsible.Header

You can use the `Space` and `Color` tokens defined on our theme, or you can do it using the `sx` prop as well.

#### Collapsible.Content

You can use the `Flex`, `Space` and `Color` tokens defined on our theme, or you can do it using the `sx` prop as well.

> 💡 You can check the props tables to verify which token you can use.

## Props

<proptypes heading="Collapsible" component="Collapsible" />
