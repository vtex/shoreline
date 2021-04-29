---
path: /typography/heading/
---

# Heading

Typography element designed for titles. It renders a `h1` jsx element by default.

## Import

```jsx isStatic
import { Heading } from '@vtex/admin-ui'
```

## Behavior

```jsx
<Heading>The headline</Heading>
```

## Variation

### Levels

The heading level can be changed by the use of polymorphism

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

## Props

All props of the `h1` element

| Name | Type               | Description         | Required       | Default            |
| ---- | ------------------ | ------------------- | -------------- | ------------------ | --- | --- |
| csx  | `StyleObject`      | Custom styles       | 🚫             | {}                 |
| as   | `React.ElementType | React.ComponentType | OndaComponent` | Polymorphic render | 🚫  | 🚫  |
