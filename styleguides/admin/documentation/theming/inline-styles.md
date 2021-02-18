---
path: /theming/inline-styles/
---

# Inline Styles

This page presents all the inline style techniques available within our Admin. Each style presented here has its own particularities and use cases. Check out our [Style Object](/theming/style-object/) page for more details about this superset of CSS and their API calls to style objects.

## styles & styleOverrides

Both have the same behavior, and accept a valid [`StyleObject`](/theming/style-object/). The difference is the semantic of their usage, and where they should be applied.

**Styles:**

- Use it on `Primitives`, where style changes are expected and encouraged.
- Use it with confidence, since it does not break predefined styles.
- They don't break an element's consistency.

**StyleOverrides:**

- Use it on `ThemedComponents` where changes are not common and already have default theme styles.
- Use it with care, since it can override styles.
- They can break an element's consistency.

```jsx
<Set>
  <Box styles={{ color: 'blue' }}>Text with blue color!</Box>

  {/** ☢️ Be careful while overriding styles, you can achieve undesired results */}
  <Button styleOverrides={{ bg: 'darkorchid', color: 'orange' }}>
    messed-up button
  </Button>
</Set>
```

## cn function

Function that transforms a valid [`StyleObject`](/theming/style-object/) into a `className`. It is used to style native JSX elements and support integrations with other libraries while being consistent.

### Example

```jsx
function Example() {
  const { cn } = useSystem()

  return <div className={cn({ color: 'blue' })}>Text with blue color!</div>
}
```

### Do's:

- ✅ Use it with native elements:

```jsx isStatic
function Example() {
  const { cn } = useSystem()

  return (
    <nav
      className={cn({
        bg: 'mid.tertiary',
        'button + button': { marginLeft: 2 },
      })}
    />
  )
}
```

- ✅ Use it with custom libraries that accepts a className:

```jsx isStatic
function Example() {
  const { cn } = useSystem()

  return (
    <Input
      className={cn({
        borderColor: 'mid.tertiary',
        ':hover': {
          borderColor: 'dark.primary',
        },
      })}
    />
  )
}
```

### Dont's:

- 🚫 Use it within Primitives:

```jsx isStatic
// 🚫 Wrong
<Box
  styles={cn({
    bg: 'mid.tertiary',
    'button + button': { marginLeft: 2 },
  })}
/>

// ✅ Correct
<Box
  styles={{
    bg: 'mid.tertiary',
    'button + button': { marginLeft: 2 },
  }}
/>
```

- 🚫 Use it within ThemedComponents:

```jsx isStatic
// 🚫 Wrong
<Button
  styleOverrides={cn({
    bg: 'mid.tertiary',
    'button + button': { marginLeft: 2 },
  })}
/>

// ✅ Correct
<Button
  styleOverrides={{
    bg: 'mid.tertiary',
    'button + button': { marginLeft: 2 },
  }}
/>
```
