---
title: Spinner
path: /spinner/
---

# Spinner

A Spinner is a way of showing the user something is being loaded, either because of a user action or not. It should be used for short, indeterminate loading times.

## Usage

```jsx isStatic
import { Spinner } from '@vtex/admin-ui'

function Example() {
  return <Spinner />
}
```

## Alternatives

- [Skeleton](skeleton/) - For layout/block loading

## Examples

### Contextual theming

The spinner's circle always has the `currentColor` fill.

```jsx live
<Set>
  <Center csx={{ size: 50, ...palette('lightBlue') }}>
    <Spinner />
  </Center>
  <Center csx={{ size: 50, ...palette('red') }}>
    <Spinner />
  </Center>
</Set>
```

### Size

```jsx live
function Example() {
  return <Spinner size={50} />
}
```

## Props

It also accepts all the props of `svg` jsx element.

| Name | Type          | Description        | Required | Default |
| ---- | ------------- | ------------------ | -------- | ------- |
| csx  | `StyleObject` | Custom styles      | 🚫       | `{}`    |
| size | `number`      | Spinner size in px | 🚫       | `24`    |
