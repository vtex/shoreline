---
title: Collapsible
path: /collapsible/
---

# Collapsible

A `Collapsible` component is a container that allows toggling the display of its content.

## Installation

```jsx isStatic
import { Collapsible, useCollapsibleState } from '@vtex/admin-ui'
```

## Behavior

Always when using the `Collapsible`'s you should also use its composites: `CollapsibleHeader` and `CollapsibleContent`

```jsx
function Example() {
  const state = useCollapsibleState()

  return (
    <Collapsible state={state} csx={{ width: 500 }}>
      <CollapsibleHeader label="Build for Community #1" />
      <CollapsibleContent>
        It’s all about being ready to grow and reach new levels. Have a solid
        foundation, modular thinking and flexible essence, and you’re building
        for scale. We are global but we’re audacious enough to aim for the
        stars.
      </CollapsibleContent>
    </Collapsible>
  )
}
```

## State

For convenience, we provide a hook that already implements the state logic for you. It can be very handy if you have a group of collapsible and want to handle the states of each one. You should pass the hook return to the `state` property.

This hook is extracted directly from `reakit/disclosure` with the same props. You can check [Reakit docs](https://reakit.io/docs/disclosure/#usedisclosurestate) for detailed info

```jsx
function Example() {
  const collapsibleState = useCollapsibleState()

  return (
    <Collapsible state={collapsibleState} csx={{ width: 500 }}>
      <CollapsibleHeader label="State Logic" />
      <CollapsibleContent>
        It’s all about being ready to grow and reach new levels. Have a solid
        foundation, modular thinking and flexible essence, and you’re building
        for scale. We are global but we’re audacious enough to aim for the
        stars.
      </CollapsibleContent>
    </Collapsible>
  )
}
```

## Variation

### Actions Panel

You can render a set of actions on the right side of the collapsible's header. Just pass the buttons to the `CollapsibleHeader` children.

```jsx
function Example() {
  const { toggle, ...props } = useCollapsibleState()

  return (
    <Collapsible state={{ toggle, ...props }}>
      <CollapsibleHeader label="Actions Panel">
        <Button variant="secondary">Secondary</Button>
        <Button onClick={toggle}>Toggle Collapsible Content</Button>
      </CollapsibleHeader>
      <CollapsibleContent>
        It’s all about being ready to grow and reach new levels. Have a solid
        foundation, modular thinking and flexible essence, and you’re building
        for scale. We are global but we’re audacious enough to aim for the
        stars.
      </CollapsibleContent>
    </Collapsible>
  )
}
```

### Initially Visible

You can set the `CollapsibleContent` to be initially visible. Just define the property `visible` to be `true`, in the `useCollapsibleState` hook.

```jsx
function Example() {
  const state = useCollapsibleState({ visible: true })

  return (
    <Collapsible state={state}>
      <CollapsibleHeader label="Initially Visible" />
      <CollapsibleContent>
        It’s all about being ready to grow and reach new levels. Have a solid
        foundation, modular thinking and flexible essence, and you’re building
        for scale. We are global but we’re audacious enough to aim for the
        stars.
      </CollapsibleContent>
    </Collapsible>
  )
}
```

### Nested

It is possible to render a `Collapsible` inside another, just pass the `Collapsible` as a child of `CollapsibleContent`. Note that each nested collapsible has different padding than the one at the root, this is a design requirement, each internal collapsible must have a `16px` padding, while the one in the root has a `24px` padding.

```jsx
function Example() {
  const root = useCollapsibleState()
  const nested = useCollapsibleState()

  return (
    <Collapsible state={root}>
      <CollapsibleHeader label="Root Collapsible" />
      <CollapsibleContent>
        <Collapsible state={nested}>
          <CollapsibleHeader label="Nested Collapsible" />
          <CollapsibleContent>
            It’s all about being ready to grow and reach new levels. Have a
            solid foundation, modular thinking and flexible essence, and you’re
            building for scale. We are global but we’re audacious enough to aim
            for the stars.
          </CollapsibleContent>
        </Collapsible>
      </CollapsibleContent>
    </Collapsible>
  )
}
```

## Composites

The `Collapsible` component uses two composites, `CollapsibleHeader` and `CollapsibleContent`.

### Header

As the title says, it represents the `header` of the collapsible. It renders a `<header>` and is always visible.

#### Disclosure Button

It represents the `button` that controls the content visibility and it's always located on the left side of the header. Collapsible's `label` property defines the disclosure button label.

#### Actions Panel

It represents a set of `buttons` and it's always located on the right side of the header. You should pass this set of `buttons` to the `CollapsibleHeader` children, to this panel to be rendered.

### Content

As the name already says, it represents the `content` of the collapsible. It renders a `<section>` and can be `hidden` or `visible`.

## Props

| Name      | Type          | Description                                                                                                                                           | Required | Default |
| --------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| state     | `State`       | Component state                                                                                                                                       | ✅       | -       |
| csx       | `StyleObject` | Custom styles                                                                                                                                         | 🚫       | {}      |
| focusable | `booelan`     | When an element is disabled, it may still be focusable. It works similarly to readOnly on form elements. In this case, only aria-disabled will be set | 🚫       | true    |
| disabled  | `boolean`     | Same as the HTML attribute                                                                                                                            | 🚫       | false   |
| children  | `ReactNode`   | Collapsible children                                                                                                                                  | 🚫       | -       |

### CollapsibleHeader Props

| Name     | Type          | Description                | Required | Default |
| -------- | ------------- | -------------------------- | -------- | ------- |
| csx      | `StyleObject` | Custom styles              | 🚫       | {}      |
| label    | `ReactNode`   | Toggle button label        | 🚫       | -       |
| children | `ReactNode`   | CollapsibleHeader children | 🚫       | -       |

### CollapsibleContent Props

| Name     | Type          | Description                 | Required | Default |
| -------- | ------------- | --------------------------- | -------- | ------- |
| csx      | `StyleObject` | Custom styles               | 🚫       | {}      |
| children | `ReactNode`   | CollapsibleContent children | 🚫       | -       |

### State

| Name    | Type         | Description                                        |
| ------- | ------------ | -------------------------------------------------- |
| visible | `booelan`    | Whether the content is visible or not              |
| baseId  | `string`     | ID that will serve as a base for all the items IDs |
| toggle  | `() => void` | Toggles the visible state                          |

### useCollapsibleState params

| Name    | Type      | Description        | Required | Default |
| ------- | --------- | ------------------ | -------- | ------- |
| visible | `boolean` | Whether is visible | 🚫       | false   |
