---
title: Anchor
path: /typography/anchor/
---

# Anchor

Component to create an anchor.

## Behavior

```jsx
<Box styles={{ width: 300 }}>
  <Anchor href="/typography/anchor/#behavior">Link</Anchor>
</Box>
```

## Installation

```sh isStatic
yarn add @vtex/admin-ui
```

```jsx isStatic
import { Anchor } from '@vtex/admin-ui'
```

## Customization

You can use the `csx` property to customize any style.

# Props

| Name     | Type        | Description              | Required | Default |
| -------- | ----------- | ------------------------ | -------- | ------- |
| children | `ReactNode` | Component children       | 🚫       | -       |
| csx      | `StyleProp` | Defines component styles | 🚫       | `{}`    |

The Anchor component also has all anchor HTML attributes
