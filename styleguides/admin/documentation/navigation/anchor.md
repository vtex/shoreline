---
path: /navigation/anchor/
---

# Anchor

Anchors are navigational elements. They may appear on their own, within a sentence, or directly in the content. This component is also polymorphic so that it can fit perfectly with the app navigation strategy.

## Import

```jsx isStatic
import { Anchor } from '@vtex/admin-ui'
```

## Behavior

```jsx
<Anchor href="https://vtex.com" target="blank">
  Go to VTEX
</Anchor>
```

## Polymorphism

```jsx
// import { Link as GatsbyLink } from 'gatsby'

<Anchor as={GatsbyLink} to="/core-concepts/onda-factory/">
  Go to onda factory
</Anchor>
```

## Props

All props of the `a` element

| Name | Type               | Description         | Required       | Default            |
| ---- | ------------------ | ------------------- | -------------- | ------------------ | --- | --- |
| csx  | `StyleObject`      | Custom styles       | 🚫             | {}                 |
| as   | `React.ElementType | React.ComponentType | OndaComponent` | Polymorphic render | 🚫  | 🚫  |
