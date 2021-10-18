---
title: Avatar
path: /avatar/
---

# Avatar

Showing the first letter capitalized in the center, this component creates a user's avatar from a label.

## Usage

```jsx isStatic
import { Avatar } from '@vtex/admin-ui'

function Example() {
  return <Avatar label="Label" />
}
```

## Examples

### Palette

The `Avatar` can be rendered in multiple palettes, this means that the `color` and `background-color` properties change according to its `palette` property value. It has `base` value by default.

```jsx
<Set>
  <Avatar label="base" />
  <Avatar label="primary" palette="primary" />
  <Avatar label="danger" palette="danger" />
</Set>
```

## Props

It also receive all props of `div` JSX element.

| Name    | Type        | Description                                        | Required  | Default      |
| ------- | ----------- | -------------------------------------------------- | --------- | ------------ | --- | -------- |
| label   | `string`    | String that will have its first letter capitalized | ✅        | -            |
| palette | `'base'     | 'primary'                                          | 'danger'` | Avatar theme | 🚫  | `'base'` |
| csx     | `StyleProp` | Defines component styles                           | 🚫        | `{}`         |
