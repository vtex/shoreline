---
title: List
path: /list/
---

# List

`<List>` renders a `<ul>` element by default with reset styles.

## Behavior

```jsx
<List>
  <List.Item>Coffee</List.Item>
  <List>
    <List.Item>Arabica</List.Item>
    <List.Item>Robusta</List.Item>
  </List>
  <List.Item>Juice</List.Item>
  <List.Item>Tea</List.Item>
</List>
```

## Import

```jsx isStatic
import { List, ListProps } from '@vtex/admin-ui'
```

## Variation

### Ordered

```jsx
<List as="ol">
  <List.Item>Coffee</List.Item>
  <List.Item>Juice</List.Item>
  <List.Item>Tea</List.Item>
  <List as="ol">
    <List.Item>With Milk</List.Item>
    <List.Item>Without Milk</List.Item>
  </List>
</List>
```

## Customization

You can use the `csx` property to handle different styles.

### Example

```jsx
<List style="square">
  <List.Item csx={{ bg: 'muted', color: 'muted' }}>Coffe</List.Item>
  <List>
    <List.Item>Arabica</List.Item>
    <List.Item>Robusta</List.Item>
  </List>
  <List.Item>Juice</List.Item>
  <List.Item>Tea</List.Item>
</List>
```

## Props

### List

All props of `ul` jsx element.

| Name  | Type            | Description              | Required | Default |
| ----- | --------------- | ------------------------ | -------- | ------- |
| style | `ListStyleType` | List style               | 🚫       | `disc`  |
| csx   | `StyleProp`     | Defines component styles | 🚫       | `{}`    |

### List.Item

All props of `li` jsx element.

| Name | Type        | Description              | Required | Default |
| ---- | ----------- | ------------------------ | -------- | ------- |
| csx  | `StyleProp` | Defines component styles | 🚫       | `{}`    |
