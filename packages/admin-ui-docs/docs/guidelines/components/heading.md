---
title: Heading
path: /heading/
---

# Heading

By default, `<Heading>` renders a `<h1>` with reset styles.

## Behavior

```jsx live
<Heading>Heading 1</Heading>
```

## Import

```jsx isStatic
import { Heading } from '@vtex/admin-ui'
```

## Variation

### Headers

```jsx live
<Set orientation="vertical">
  <Heading>Heading 1</Heading>
  <Heading as="h2">Heading 2</Heading>
  <Heading as="h3">Heading 3</Heading>
  <Heading as="h4">Heading 4</Heading>
  <Heading as="h5">Heading 5</Heading>
  <Heading as="h6">Heading 6</Heading>
</Set>
```

## Props

Besides the props listed bellow, you can use all the props accepted by the `h` JSX element.

| Name | Type                  | Description       | Required | Default |
| ---- | --------------------- | ----------------- | -------- | ------- |
| as   | `React.ComponentType` | Element to render | 🚫       | `'h1'`  |
