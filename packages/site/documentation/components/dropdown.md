---
title: Dropdown
path: /dropdown/
---

# Dropdown

Dropdowns are compact UI controls that allow users to select an option, require a click to see options, and support only single-selection.

## Behavior

```jsx
function Example() {
  const state = useDropdownState({
    items: ['Yesterday', '7 days ago', '28 days ago', 'One year ago'],
    initialSelectedItem: '7 days ago',
  })

  return (
    <Dropdown
      items={['Yesterday', '7 days ago', '28 days ago', 'One year ago']}
      state={state}
      label="Date"
    />
  )
}
```

## Installation

```sh isStatic
yarn add @vtex/admin-ui
```

```jsx isStatic
import { Dropdown, useDropdownState } from '@vtex/admin-ui'
```

## Variations

### Variant

In the same way as the [buttons](https://admin-ui-docs.vercel.app/button/), the `variant` prop represents the appearance of the Dropdown, indicating whether is a `primary`, `secondary`, or a `tertiary` action. By default, it will render a `primary` dropdown.

```jsx
function Example() {
  const species = ['Arabica', 'Robusta']
  const speciesState = useDropdownState({
    items: species,
    initialSelectedItem: 'Arabica',
  })

  const brewMethods = ['French Press', 'Chemex', 'Cold Brew', 'Aeropress']
  const brewState = useDropdownState({
    items: brewMethods,
    initialSelectedItem: 'Chemex',
  })

  const recipes = ['Latte', 'Espresso', 'Irish Coffee']
  const recipesState = useDropdownState({
    items: recipes,
    initialSelectedItem: 'Chemex',
  })

  return (
    <Set spacing={3}>
      <Dropdown items={species} state={speciesState} label="Species" />
      <Dropdown
        variant="secondary"
        items={brewMethods}
        state={brewState}
        label="Methods"
      />
      <Dropdown
        variant="tertiary"
        items={recipes}
        state={recipesState}
        label="Recipes"
      />
    </Set>
  )
}
```

### Items

Dropdown items can be a List of either native types (like `number`, `string`, etc.), or Object types. Check the examples below to see how to handle these two different approaches.

#### String

When using a String to represent the item, the dropdown already knows what it should render in the options, so you just need to specify the `items` property to both `useDropdownState` and `Dropdown`.

```jsx
function Example() {
  const species = ['Arabica', 'Robusta']
  const speciesState = useDropdownState({
    items: species,
    initialSelectedItem: 'Arabica',
  })

  return (
    <Set spacing={3}>
      <Dropdown
        variant="tertiary"
        items={species}
        state={speciesState}
        label="Recipes"
      />
    </Set>
  )
}
```

#### Object

When using an Object to represent the item there are two things that you should do:

Define the `itemToString` prop in the `useDropdownState`. It will return the string equivalent of the item which will be used for selection/highlight by character keys and for the aria-live a11y selection message that will occur on every item selection: `"$ItemString has been selected"`. In the example below, we use the `item.label` to be the string equivalent of each item object.

Define the `renderItem` prop in the `Dropdown`. It is similar to the `itemToString` and will return the string equivalent of each item in the select menu.

```jsx
function Example() {
  const items = [
    { id: 1, label: 'Yesterday' },
    { id: 2, label: '7 days ago' },
    { id: 3, label: '28 days ago' },
    { id: 4, label: 'One year ago' },
  ]

  const state = useDropdownState({
    items,
    itemToString: (item) => item.label,
    initialSelectedItem: items[1],
  })

  return (
    <Dropdown
      items={items}
      state={state}
      label="Date"
      renderItem={(item) => item.label}
    />
  )
}
```

### Disabled

It means that the user will not be able to select any value from the `Dropdown`. To use this variation, the `disabled` property should have a true value.

```jsx
function Example() {
  const state = useDropdownState({
    items: ['Yesterday', '7 days ago', '28 days ago', 'One year ago'],
    initialSelectedItem: '7 days ago',
  })

  return (
    <Dropdown
      items={['Yesterday', '7 days ago', '28 days ago', 'One year ago']}
      state={state}
      disabled
      label="Date"
    />
  )
}
```

## State

### useDropdownState

Hook that manages all the stateful logic needed to make the select functional and accessible. It returns a set of props that are meant to be called, and their results are destructured on the dropdown's elements: its label, toggle button, list, and list items.

It is the same as the [Downshift useSelect Hook](https://www.downshift-js.com/use-select).

```jsx
function Example() {
  const state = useDropdownState({
    items: ['Yesterday', '7 days ago', '28 days ago', 'One year ago'],
    initialSelectedItem: '7 days ago',
  })

  return (
    <Dropdown
      items={['Yesterday', '7 days ago', '28 days ago', 'One year ago']}
      state={state}
      label="Date"
    />
  )
}
```

## Customization

You can use the [csx](https://admin-ui-docs.vercel.app/theming/inline-styles/#styles--csx) property to customize any style.

### Example

```jsx
function Example() {
  const state = useDropdownState({
    items: ['Yesterday', '7 days ago', '28 days ago', 'One year ago'],
    initialSelectedItem: '7 days ago',
  })

  return (
    <Dropdown
      items={['Yesterday', '7 days ago', '28 days ago', 'One year ago']}
      state={state}
      csx={{ margin: 4 }}
      label="Date"
    />
  )
}
```

## Props

