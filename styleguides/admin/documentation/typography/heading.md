---
path: /typography/heading/
---

# Heading

By default, `<Heading>` renders a `<h1>` with reset styles.

## Behavior

```jsx
<Heading>Heading 1</Heading>
```

## Installation

```sh isStatic
yarn add @vtex/admin-ui
```

```jsx isStatic
import { Heading, HeadingProps } from '@vtex/admin-ui'
```

## Variation

### Headers

```jsx
<Set orientation="vertical">
  <Heading>Heading 1</Heading>
  <Heading element="h2">Heading 2</Heading>
  <Heading element="h3">Heading 3</Heading>
  <Heading element="h4">Heading 4</Heading>
  <Heading element="h5">Heading 5</Heading>
  <Heading element="h6">Heading 6</Heading>
</Set>
```

## Customization

You can use the `styleOverrides` property to handle different styles, and also the `TextPattern` and `SpaceStyleProps`.

### Example

```jsx
<Heading
  text="body"
  marginBottom={2}
  styleOverrides={{ fontSize: 4, bg: 'muted.3', color: 'primary.base' }}
>
  Heading 1
</Heading>
```

## Props

<proptypes heading="Heading" component="Heading"/>
