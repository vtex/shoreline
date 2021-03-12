---
path: /primitives/skeleton/
---

# Skeleton

Our design system comes with a set of primitive components that represent our most elementary components, through which other components are built. They are basic elements, with no determined style, that are used as a starting point for other components. Checkout our [Introduction](/primitives/introduction) page, to see Do's and Don'ts about primitive components.

`Skeleton` is a versatile primitive component, with no defined style, that can be used to leverage UIs that don't contain actual content yet. Instead, it shows the loading elements of a page in a shape similar to the actual content. Other use cases include:

- It shows users that content is loading, offering a vague preview of how content will look once it fully loads.
- It's being used internally by AdminUI to handle the loading state of specific components.

If you want to know more about how to style a primitive component, check out our [Inline Styles](/theming/inline-styles/) page.

## Behavior

By default, the `Skeleton` is fluid, which means that both width and height are `100%` of its container.

```jsx
<Box csx={{ width: 'full', height: 192 }}>
  <Skeleton />
</Box>
```

## Installation

```sh isStatic
yarn add @vtex/admin-ui
```

```jsx isStatic
import { Skeleton } from '@vtex/admin-ui'
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

## Customization

With the `csx` property, you can add any customization to the `Skeleton` component. Check the [StyleObject](/theming/style-object) page for detailed info.

## Props

<proptypes heading="Skeleton" component="Skeleton" />
