---
title: Select
path: /select/
---

# Select

Select is a component that allows users to select an option from a list. It requires a click to see the options and supports only single-selection.

## Usage

```jsx isStatic
import { useState } from 'react'
import { Select } from '@vtex/admin-ui'

const days = ['Yesterday', '7 days ago', '28 days ago', 'One year ago']

function Example() {
  const [value, setValue] = useState('today')

  return (
    <Select
      label="Date"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      <option value="yesterday">Yesterday</option>
      <option value="today">Today</option>
      <option value="tomorrow">Tomorrow</option>
    </Select>
  )
}
```

## Examples

### Tone of voice

The `Select` [tone of voice](/foundations/colors/#tones) is either `neutral` (default) or `critical`, and is adjustable using the `tone` prop.

```jsx live
function Example() {
  const [value, setValue] = React.useState('today')

  return (
    <Set spacing={3}>
      <Select
        label="Neutral"
        helperText="Helpful text"
        criticalText="Critical message"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        <option value="yesterday">Yesterday</option>
        <option value="today">Today</option>
        <option value="tomorrow">Tomorrow</option>
      </Select>
      <Select
        tone="critical"
        label="Critical"
        criticalText="Critical message"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        <option value="yesterday">Yesterday</option>
        <option value="today">Today</option>
        <option value="tomorrow">Tomorrow</option>
      </Select>
    </Set>
  )
}
```

### Disabled

It means that the user will not be able to select any value from the `Select`. To use this variation, the `disabled` property should have a true value.

```jsx live
function Example() {
  const [value, setValue] = React.useState('today')

  return (
    <Select
      label="Disabled"
      helperText="Helpful text"
      criticalText="Critical message"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      disabled
    >
      <option value="yesterday">Yesterday</option>
      <option value="today">Today</option>
      <option value="tomorrow">Tomorrow</option>
    </Select>
  )
}
```

## Props

Besides the props listed bellow, you can use all the props accepted by the `select` JSX element.

| Name         | Type                | Description               | Required | Default   |
| ------------ | ------------------- | ------------------------- | -------- | --------- |
| label        | `string`            | Label text                | ✅       | -         |
| helperText   | `string`            | Select helper text        | 🚫       | -         |
| tone         | `neutral, critical` | Select's tone of voice    | 🚫       | `neutral` |
| criticalText | `string`            | TextArea critical message | 🚫       | -         |
| csx          | `StyleProp`         | Defines component styles  | 🚫       | `{}`      |
