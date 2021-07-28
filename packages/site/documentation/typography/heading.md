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

You can use the `csx` property to handle different styles, and also the `TextPattern` and `SpaceStyleProps`.

### Example

```jsx
<Heading
  text="body"
  marginBottom={2}
  csx={{ fontSize: 4, bg: 'light.secondary', color: 'blue' }}
>
  Heading 1
</Heading>
```

## Props

| Name     | Type        | Description              | Required | Default |
| -------- | ----------- | ------------------------ | -------- | ------- | ---- | ----- | ----------------- | --- | ------ |
| element  | `'h1'       | 'h2'                     | 'h3'     | 'h4'    | 'h5' | 'h6'` | Element to render | 🚫  | `'h1'` |
| children | `ReactNode` | Heading children         | 🚫       | -       |
| csx      | `StyleProp` | Defines component styles | 🚫       | `{}`    |
