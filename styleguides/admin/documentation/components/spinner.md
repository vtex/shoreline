---
path: /spinner/
---

# Spinner

A Spinner is a way of showing the user something is being loaded, either because of a user action or not. It should be used for short, indeterminate loading times.

## Behavior

```jsx
function Example() {
  return <Spinner />
}
```

## Installation

```bash isStatic
yarn add @vtex/admin-ui
```

```jsx isStatic
import { Spinner } from '@vtex/admin-ui'
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

<propdetails heading="Spinner" component="Spinner"></propdetails>
