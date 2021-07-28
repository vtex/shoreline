---
path: /feedback/spinner/
---

# Spinner

A Spinner is a way of showing the user something is being loaded, either because of a user action or not. It should be used for short, indeterminate loading times.

## Import

```jsx isStatic
import { Spinner } from '@vtex/admin-ui'
```

## Behavior

```jsx
function Example() {
  return <Spinner />
}
```

## Variations

### Size

```jsx
function Example() {
  return <Spinner size={50} />
}
```

### Color

```jsx
function Example() {
  return <Spinner color="red" />
}
```

## Props

| Name  | Type          | Description   | Required      | Default |
| ----- | ------------- | ------------- | ------------- | ------- | ------ |
| csx   | `StyleObject` | Custom styles | 🚫            | {}      |
| color | `SystemColor  | string`       | Spinner color | 🚫      | 'blue' |
| size  | `number`      | Spinner size  | 🚫            | 24      |
