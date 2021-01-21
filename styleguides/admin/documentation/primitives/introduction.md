---
path: /primitives/introduction/
---

# Introduction

Our design system comes with a set of primitive components that represent our most elementary components, through which other components are built. They are basic elements, with no determined style, that are used as a starting point for other components. They include the following basic structures:

- `Box:` versatile primitive component, with no defined style, that can be used to leverage other elementary components. The majority of our components are built on top of the `<Box>`. By default it renders a `<div>` element.  
  Find out more about `Box` [here](/primitives/box)
- `Skeleton:` versatile primitive component, with no defined style, that can be used to leverage UIs that don't contain actual content yet. Instead, it shows the loading elements of a page in a shape similar to the actual content.
  Find out more about `Skeleton` [here](/primitives/skeleton).
  If you want to know more about how to style a primitive component, check out our [Inline Styles](/theming/inline-styles/) page.

If you find a primitive component not implemented yet and you think that could be useful to have it in our design system, feel free to create an [issue in our repository](https://github.com/vtex/onda/issues/new/choose). Suggestions are welcome!

## Do's

Primitive components should be used during the following cases:

### ✅ Build a specific component.

```jsx isStatic
function CustomComponent({ heading, children }) {
  return (
    <Box styles={{ display: 'flex', paddingY: 4, border: 'divider-bottom' }}>
      <Box styles={{ bg: 'blue', width: 10, height: 60, marginRight: 3 }} />
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

### ✅ Build a container component.

```jsx isStatic
// 🚫 Wrong
function Example() {
  const { cn } = useSystem()

  return (
    <div className={cn({ padding: 2, margin: 2, bg: 'mid.tertiary' })}>
      {...content}
    </div>
  )
}

// ✅ Correct
function Example() {
  return (
    <Box styles={{ bg: 'mid.tertiary', padding: 2, margin: 2 }}>
      {...content}
    </Box>
  )
}
```

## Don'ts

Primitive components should _not_ be used during the following cases:

_Note that you may want to use one of our `Layout` components before using Box to build layouts. Also check one of our `Typography` components before using it to render a text._

### 🚫 Build layouts

```jsx isStatic
// 🚫 Wrong
function Example() {
  return (
    <Box styles={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box styles={{ width: '25%' }}>25%</Box>
      <Box styles={{ width: '50%' }}>75%</Box>
    </Box>
  )
}

// ✅ Correct
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

### 🚫 Render texts

```jsx isStatic
// 🚫 Wrong
function Example() {
  return (
    <Box element="h1" styles={{ text: 'headline' }}>
      Headline 1 text
    </Box>
  )
}

// ✅ Correct
function Example() {
  return <Heading>Headline 1 text</Heading>
}
```

### 🚫 Reacreate components already defined on our design system.

```jsx isStatic
// 🚫 Wrong
function Example() {
  return (
    <Box
      styles={{
        borderStyle: 'solid',
        borderWidth: '1px',
        borderRadius: 'default',
        borderColor: 'mid.tertiary',
        padding: 6,
      }}
    >
      <Box
        element="button"
        styles={{
          border: 'none',
          borderRadius: 'default',
          bg: 'dark.primary',
          color: 'light.primary',
        }}
      />
    </Box>
  )
}

// ✅ Correct
function Example() {
  return (
    <Card>
      <Button />
    </Card>
  )
}
```
