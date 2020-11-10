---
path: /docs/layouts/introduction/
---

# Introduction

Our design system comes with a set of "layout components" which are components to help you build common layouts inside your application.

## Components Overview

<blockquote palette="primary">

- `Columns:` Represents a basic columned layout. It implements a 12 column flexbox based responsive column system.
- `Set:` Represents a set of components, that automatically space out the components.

</blockquote>

## `Do's`:

- When you are building a layout inside your application.
- When you want to add consistency between common layouts.
- When you want to avoid repeated sizing and spacing styles in atomic components.

## `Don'ts`:

- When you are not building a layout inside your application
- When you are handling with just one atomic component
- When you are building a very specific layout in your application that is not implemented yet in our design system.

<blockquote palette="primary">

If you find a layout behavior not implemented and you think that could be useful to have in our design system, feel free to create an issue in our repository, it will be really nice!

</blockquote>

## Good practices

```jsx static
// bad
function Example() {
  return (
    <Box styles={{ display: 'flex', flexDirection: 'column' }}>
      <Button styleOverrides={{ marginBottom: 3 }} />
      <Button styleOverrides={{ marginBottom: 3 }} />
      <Button styleOverrides={{ marginBottom: 3 }} />
      <Button />
    </Box>
  )
}

// good
function Example() {
  return (
    <Set orientation="vertical" spacing={3}>
      <Button />
      <Button />
      <Button />
      <Button />
    </Set>
  )
}

// bad
function Example() {
  return (
    <Box styles={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
      <Box styles={{ width: '25%' }}>First column</Box>
      <Box styles={{ width: '25%' }}>Second column</Box>
      <Box styles={{ width: '50%' }}>Third column</Box>
    </Box>
  )
}

// good
function Example() {
  return (
    <Columns>
      <Columns.Item units={3}>First Column</Columns.Item>
      <Columns.Item units={3}>Second Column</Columns.Item>
      <Columns.Item units={6}>Third Column</Columns.Item>
    </Columns>
  )
}
```
