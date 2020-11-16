---
path: /collapsible/
---

# Collapsible

A `Collapsible` component is a container that allows toggling the display of its content. It renders a `<div>` element.

## Behavior

Always when using the `Collapsible`'s you should also use its composites: `Collapsible.Header` and `Collapsible.Content`

```jsx
import { Collapsible, useCollapsible, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const state = useCollapsible()

  return (
    <ThemeProvider>
      <Collapsible state={state} styleOverrides={{ width: 500 }}>
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

### Actions Panel

You can render a set of actions on the right side of the collapsible's header. Just pass the buttons to the `Collapsible.Header` children.

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
      <Collapsible state={{ toggle, ...props }}>
        <Collapsible.Header label="Actions Panel">
          <Button variant="secondary">Secondary</Button>
          <Button onClick={toggle}>Toggle Collapsible Content</Button>
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

### Initially Visible

You can set the `Collapsible.Content` to be initially visible. Just define the property `visible` to be `true`, in the `useCollapsible` hook.

```jsx
import { Collapsible, useCollapsible, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const state = useCollapsible({ visible: true })

  return (
    <ThemeProvider>
      <Collapsible state={state}>
        <Collapsible.Header label="Initially Visible" />
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

It is possible to render a `Collapsible` inside another, just pass the `Collapsible` as a child of `Collapsible.Content`. Note that each nested collapsible has different padding than the one at the root, this is a design requirement, each internal collapsible must have a `16px` padding, while the one in the root has a `24px` padding.

```jsx
import { Collapsible, useCollapsible, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const root = useCollapsible()
  const nested = useCollapsible()

  return (
    <ThemeProvider>
      <Collapsible state={root}>
        <Collapsible.Header label="Root Collapsible" />
        <Collapsible.Content>
          <Collapsible state={nested}>
            <Collapsible.Header label="Nested Collapsible" />
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

## Composites

The `Collapsible` component uses two composites, `Collapsible.Header` and `Collapsible.Content`.

### Header

As the title says, it represents the `header` of the collapsible. It renders a `<header>` and is always visible.

#### Disclosure Button

It represents the `button` that controls the content visibility and it's always located on the left side of the header. Collapsible's `label` property defines the disclosure button label.

#### Actions Panel

It represents a set of `buttons` and it's always located on the right side of the header. You should pass this set of `buttons` to the `Collapsible.Header` children, to this panel to be rendered.

### Content

As the name already says, it represents the `content` of the collapsible. It renders a `<section>` and can be `hidden` or `visible`.

## State

### useCollapsible hook

For convenience, we provide a hook that already implements the state logic for you. It can be very handy if you have a group of collapsible and want to handle the states of each one. You should pass the hook return to the `state` property.

This hook is extracted directly from `reakit/disclosure` with the same props. You can check [Reakit docs](https://reakit.io/docs/disclosure/#usedisclosurestate) for detailed info

### Example

```jsx
import { Collapsible, useCollapsible, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const collapsibleState = useCollapsible()

  return (
    <ThemeProvider>
      <Collapsible state={collapsibleState} styleOverrides={{ width: 500 }}>
        <Collapsible.Header label="State Logic" />
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

## Customization

You can use the [styleOverrides](/theming/inline-styles/#styles--styleoverrides) property to handle different styles. The `Collapsible` and its composites accepts this property.

### Example

```jsx
import {
  Collapsible,
  Paragraph,
  useCollapsible,
  ThemeProvider,
} from '@vtex/admin-ui'

function Example() {
  const collapsibleState = useCollapsible()

  return (
    <ThemeProvider>
      <Collapsible
        state={collapsibleState}
        styleOverrides={{ width: 500, margin: 3 }}
      >
        <Collapsible.Header
          label="Customization"
          styleOverrides={{ bg: 'muted.3' }}
        />
        <Collapsible.Content styleOverrides={{ color: 'primary.base' }}>
          <Paragraph>Text with primary.base color!</Paragraph>
        </Collapsible.Content>
      </Collapsible>
    </ThemeProvider>
  )
}
```

## Props

<propdetails heading="Collapsible" component="Collapsible"></propdetails>

<propdetails heading="Collapsible.Header" component="Header"></propdetails>

<propdetails heading="Collapsible.Content" component="Content"></propdetails>
