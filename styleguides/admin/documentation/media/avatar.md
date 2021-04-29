---
path: /media/avatar/
---

# Avatar

Showing the first letter capitalized in the center, this component creates a user's avatar from a label.

## Import

```jsx isStatic
import { Avatar } from '@vtex/admin-ui'
```

## Behavior

```jsx
<Avatar>The headline</Avatar>
```

## Variation

### palette

```jsx
<Set>
  <Avatar label="base" />
  <Avatar label="primary" palette="primary" />
  <Avatar label="danger" palette="danger" />
</Set>
```

# Props

All props of the `div` element.

| Name    | Type               | Description         | Required       | Default            |
| ------- | ------------------ | ------------------- | -------------- | ------------------ | ------ | --- |
| label   | `string`           | Avatar label        | ✅             | 🚫                 |
| palette | `base              | primary             | danger`        | Color palette      | `base` | 🚫  |
| csx     | `StyleObject`      | Custom styles       | 🚫             | {}                 |
| as      | `React.ElementType | React.ComponentType | OndaComponent` | Polymorphic render | 🚫     | 🚫  |
