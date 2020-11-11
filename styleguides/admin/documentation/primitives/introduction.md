---
path: /docs/primitives/introduction/
---

# Introduction

Our design system comes with a set of "primitive components" that represent our most elementary components and you can build anything from them.

## Components Overview

- `Box:` The majority of our components are built on top of the `<Box>`. By default it renders a `<div>` element.
- `Skeleton:` Represent a UI that doesn’t contain actual content, instead, it shows the loading elements of a page in a shape similar to the actual content.

## `Do's`:

### Build a specific component.

```jsx static
function CustomComponent({ heading, children }) {
  return (
    <Box paddingY={4} border="divider-bottom" styles={{ display: 'flex' }}>
      <Box
        styles={{ bg: 'primary.base' }}
        width="10px"
        height="60px"
        marginRight={3}
      />
      <Set spacing={3} orientation="vertical" fluid>
        <Heading>{heading}</Heading>
        <Paragraph>{children}</Paragraph>
      </Set>
    </Box>
  )
}

function Example() {
  return (
    <Set orientation="vertical" fluid>
      <CustomComponent heading="What's New?">
        Levarege your business from our latest and more relevant product
        launches.
      </CustomComponent>
      <CustomComponent heading="GettingStarted">
        Learn, step by step, everything you need to know to get started on VTEX.
      </CustomComponent>
      <CustomComponent heading="HelpCenter">
        Access content and find solutions to all your questions about the
        platform.
      </CustomComponent>
    </Set>
  )
}
```

### Build a container component.

```jsx static
// 🚫 wrong
function Example() {
  return (
    <div className={cn({ padding: 2, margin: 2, bg: 'muted.2' })}>
      {...content}
    </div>
  )
}

// ✅ right
function Example() {
  return (
    <Box padding={2} margin={2} styles={{ bg: 'muted.2' }}>
      {...content}
    </Box>
  )
}
```

## `Don'ts`:

### Build layouts

```jsx static
// 🚫 wrong
function Example() {
  return (
    <Box styles={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box styles={{ width: '25%' }}>25%</Box>
      <Box styles={{ width: '50%' }}>75%</Box>
    </Box>
  )
}

// ✅ right
function Example() {
  return (
    <Columns>
      <Columns.Item units={3} offset="right">
        25%
      </Columns.Item>
      <Columns.Item units={6}>50%</Columns.Item>
    </Columns>
  )
}
```

### Render texts

```jsx static
// 🚫 wrong
function Example() {
  return (
    <Box element="h1" text="headline">
      Headline 1 text
    </Box>
  )
}

// ✅ right
function Example() {
  return <Heading text="headline">Headline 1 text</Heading>
}
```

### Reacreate components already defined on our design system.

```jsx static
// 🚫 wrong
function Example() {
  return (
    <Box
      padding={6}
      styles={{
        borderStyle: 'solid',
        borderWidth: '1px',
        borderRadius: 'default',
        borderColor: 'muted.2',
      }}
    >
      <Box
        element="button"
        styles={{
          border: 'none',
          borderRadius: 'default',
          bg: 'text',
          color: 'background',
        }}
      />
    </Box>
  )
}

// ✅ right
function Example() {
  return (
    <Card>
      <Button />
    </Card>
  )
}
```

## Suggestions

If you find a primitive component not implemented yet and you think that could be useful to have it in our design system, feel free to create an issue in our repository. Suggestions are welcome!
