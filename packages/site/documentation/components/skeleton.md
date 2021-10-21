---
title: Skeleton
path: /skeleton/
---

# Skeleton

`Skeleton` is a versatile primitive component, with no defined style, that can be used to leverage UIs that don't contain actual content yet. Instead, it shows the loading elements of a page in a shape similar to the actual content. Other use cases include:

- It shows users that content is loading, offering a vague preview of how content will look once it fully loads.
- It's being used internally by AdminUI to handle the loading state of specific components.

## Import

```jsx isStatic
import { Skeleton } from '@vtex/admin-ui'
```

## Behavior

By default, the `Skeleton` is fluid, which means that both width and height are `100%` of its container.

```jsx
<Box csx={{ width: 'full', height: 192 }}>
  <Skeleton />
</Box>
```

## Variation

### Rectangle

By default, Skeleton's shape is rectangular. To use this variation, the `shape` property has the `rect` value.

```jsx
<Skeleton csx={{ size: 128 }} />
```

### Circle

The shape can also be circular. To use this variation, the `shape` property has the `circle` value.

```jsx
<Skeleton shape="circle" csx={{ size: 100 }} />
```

## Props

| Name    | Type              | Description       | Required | Default |
| ------- | ----------------- | ----------------- | -------- | ------- |
| csx     | `StyleObject`     | Custom styles     | 🚫       | {}      |
| shape   | `rect, or circle` | 🚫                | `circle` |
| element | `ElementType`     | Element to render | 🚫       | 'div'   |
