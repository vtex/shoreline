---
title: Heading
path: /typography/heading/
---

# Heading

By default, `<Heading>` renders a `<h1>` with reset styles.

## Behavior

```jsx
<Heading>Heading 1</Heading>
```

## Import

```jsx isStatic
import { Heading } from '@vtex/admin-ui'
```

## Variation

### Headers

```jsx
<Set orientation="vertical">
  <Heading>Heading 1</Heading>
  <Heading as="h2">Heading 2</Heading>
  <Heading as="h3">Heading 3</Heading>
  <Heading as="h4">Heading 4</Heading>
  <Heading as="h5">Heading 5</Heading>
  <Heading as="h6">Heading 6</Heading>
</Set>
```

## Customization

You can use the `csx` property to handle different styles, and also the `TextPattern` and `SpaceStyleProps`.

### Example

```jsx
<Heading csx={{ fontSize: 4, bg: 'light.secondary', color: 'blue' }}>
  Heading 1
</Heading>
```

## Props

All props of `h` jsx element.

| Name | Type                  | Description       | Required | Default |
| ---- | --------------------- | ----------------- | -------- | ------- |
| as   | `React.ComponentType` | Element to render | 🚫       | `'h1'`  |
