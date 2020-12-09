---
path: /typography/list/
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

## Installation

```sh isStatic
yarn add @vtex/admin-ui
```

```jsx isStatic
import { List, ListProps } from '@vtex/admin-ui'
```

## Variation

### Ordered

```jsx
<List ordered>
  <List.Item>Coffee</List.Item>
  <List.Item>Juice</List.Item>
  <List.Item>Tea</List.Item>
  <List ordered>
    <List.Item>With Milk</List.Item>
    <List.Item>Without Milk</List.Item>
  </List>
</List>
```

## Customization

You can use the `styleOverrides` property to handle different styles, and also the `TextPattern`.

### Example

```jsx
<List style="square">
  <List.Item
    text="subtitle"
    styleOverrides={{ bg: 'primary.base', color: 'background' }}
  >
    Coffe
  </List.Item>
  <List>
    <List.Item text="highlight">Arabica</List.Item>
    <List.Item text="highlight">Robusta</List.Item>
  </List>
  <List.Item text="highlight">Juice</List.Item>
  <List.Item text="highlight">Tea</List.Item>
</List>
```

## Props

<propdetails heading="List" component="List">
</propdetails>

<propdetails heading="List.Item" component="ListItem">
</propdetails>
