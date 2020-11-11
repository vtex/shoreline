---
path: /docs/layouts/introduction/
---

# Introduction

Our design system comes with a set of "layout components" which are components to help you build common layouts inside your application.

## Components Overview

- `Columns:` Represents a basic columned layout. It implements a 12 column flexbox based responsive column system.
- `Set:` Represents a set of components, that automatically space out the components.

## `Do's`:

- You are building a layout inside your application.

- You want to add consistency between common layouts.

- You want to avoid handling layout behavior in atomic components.

```jsx static
// 🚫 wrong
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

// ✅ right
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
```

## `Don'ts`:

- You are not building a layout inside your application.

- You are handling with just one atomic component.

```jsx static
// 🚫 wrong
function Example() {
  return (
    <Columns>
      <Columns.Item>
        <Paragraph>Paragraph</Paragraph>
      </Columns.Item>
    </Columns>
  )
}

// ✅ right
function Example() {
  return <Paragraph>Paragraph</Paragraph>
}
```

- Apply styles of color, border, background, etc. The component should only handle the layout behavior.

```jsx static
// 🚫 wrong
function Example() {
  return (
    <Set
      spacing={2}
      orientation="vertical"
      styleOverrides={{
        borderStyle: 'solid',
        borderWidth: '1px',
        borderRadius: 'default',
        borderColor: 'muted.2',
        padding: 6,
      }}
    >
      <Button />
      <Button />
      <Button />
      <Button />
    </Set>
  )
}

// ✅ right
function Example() {
  return (
    <Card>
      <Set orientation="vertical" spacing={3}>
        <Button />
        <Button />
        <Button />
        <Button />
      </Set>
    </Card>
  )
}
```

## Suggestions

If you find a layout behavior not implemented yet and you think that could be useful to have it in our design system, feel free to create an issue in our repository. Suggestions are welcome!
