---
path: /select/
---

# Select

Select is a component that allow users to select an option, require a click to see options and support only single-selection.

## Behavior

```jsx
function Example() {
  const days = ['Yesterday', '7 days ago', '28 days ago', 'One year ago']
  const state = useSelectState({
    items: days,
    initialSelectedItem: 'Yesterday',
  })

  return (
    <ThemeProvider>
      <Select items={days} state={state} label="Date" />
    </ThemeProvider>
  )
}
```

## Installation

```sh isStatic
yarn add @vtex/admin-ui
```

```jsx isStatic
import { Select, useSelectState } from '@vtex/admin-ui'
```

## Variations

### Items

Select items can be a List of either native types (like `number`, `string`, etc.), or Object types. Check the examples below to see how to handle these two different approaches.

#### String

When using a String to represent the item, the select already knows what it should render in the options, so you just need to specify the `items` property to both `useSelectState` and `Select`.

```jsx
function Example() {
  const species = ['Arabica', 'Robusta']
  const speciesState = useSelectState({
    items: species,
    initialSelectedItem: 'Arabica',
  })

  return (
    <ThemeProvider>
      <Select items={species} state={speciesState} label="Recipes" />
    </ThemeProvider>
  )
}
```

#### Object

When using an Object to represent the item there are two things that you should do:

Define the `itemToString` prop in the `useSelectState`. It will return the string equivalent of the item which will be used for selection/highlight by character keys and for the aria-live a11y selection message that will occur on every item selection: `"$ItemString has been selected"`. In the example below, we use the `item.label` to be the string equivalent of each item object.

Define the `renderItem` prop in the `Select`. It is similar to the `itemToString` and will return the string equivalent of each item in the select menu.

```jsx
function Example() {
  const items = [
    { id: 1, label: 'Yesterday' },
    { id: 2, label: '7 days ago' },
    { id: 3, label: '28 days ago' },
    { id: 4, label: 'One year ago' },
  ]

  const state = useSelectState({
    items,
    itemToString: (item) => item.label,
    initialSelectedItem: items[1],
  })

  return (
    <ThemeProvider>
      <Select
        items={items}
        state={state}
        label="Date"
        renderItem={(item) => item.label}
      />
    </ThemeProvider>
  )
}
```

### Disabled

It means that the user will not be able to select any value from the `Select`. To use this variation, the `disabled` property should have a true value.

```jsx
function Example() {
  const days = ['Yesterday', '7 days ago', '28 days ago', 'One year ago']
  const initialState = useSelectState({
    items: days,
    initialSelectedItem: '7 days ago',
  })

  return (
    <ThemeProvider>
      <Select items={days} state={initialState} label="Date" disabled />
    </ThemeProvider>
  )
}
```

### Helpers

You can add a `text` helper to add information about the `Select`. Just use the `helperText` properties.

```jsx
function Example() {
  const days = ['Yesterday', '7 days ago', '28 days ago', 'One year ago']
  const state = useSelectState({
    items: days,
    initialSelectedItem: 'Yesterday',
  })

  return (
    <ThemeProvider>
      <Select items={days} state={state} label="Date" helperText="Help text" />
    </ThemeProvider>
  )
}
```

### Error

You can add a `error message` in the same place of the `helperText`. Just use the `error` property for that.

```jsx
function Example() {
  const days = ['Yesterday', '7 days ago', '28 days ago', 'One year ago']
  const state = useSelectState({ items: days })

  return (
    <ThemeProvider>
      <Select
        items={days}
        state={state}
        label="Date"
        error
        errorMessage="Message error"
      />
    </ThemeProvider>
  )
}
```

### Block

You can define the select as a block-level element. It means that the Select will have full-width by default. To use this variation the `block` property should have a true value.

```jsx
function Example() {
  const days = ['Yesterday', '7 days ago', '28 days ago', 'One year ago']
  const state = useSelectState({ items: days })

  return (
    <Card csx={{ width: 500 }}>
      <Select
        items={days}
        state={state}
        label="Date"
        errorMessage="Message error"
        block
      />
    </Card>
  )
}
```

## State

### useSelectState

Hook that manages all the stateful logic needed to make the select functional and accessible. It returns a set of props that are meant to be called, and their results are destructured on the select's elements: its label, toggle button, list, and list items.

It is the same as the [Downshift useSelect Hook](https://www.downshift-js.com/use-select).

```jsx
function Example() {
  const state = useSelectState({
    items: ['Yesterday', '7 days ago', '28 days ago', 'One year ago'],
    initialSelectedItem: '7 days ago',
  })

  return (
    <ThemeProvider>
      <Select
        items={['Yesterday', '7 days ago', '28 days ago', 'One year ago']}
        state={state}
        label="Date"
      />
    </ThemeProvider>
  )
}
```

## Customization

You can use the [csx](https://admin-ui-docs.vercel.app/theming/inline-styles/#styles--csx) property to customize any style.

### Example

```jsx
function Example() {
  const state = useSelectState({
    items: ['Yesterday', '7 days ago', '28 days ago', 'One year ago'],
    initialSelectedItem: '7 days ago',
  })

  return (
    <ThemeProvider>
      <Select
        items={['Yesterday', '7 days ago', '28 days ago', 'One year ago']}
        state={state}
        csx={{ margin: 4 }}
        label="Date"
      />
    </ThemeProvider>
  )
}
```

## Props

<proptypes heading="Select" component="Select" />
