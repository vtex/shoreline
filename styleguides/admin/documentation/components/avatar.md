---
path: /avatar/
---

# Avatar

Showing the first letter capitalized in the center, this component creates a user's avatar from a label.

## Behavior

The `Avatar` can be rendered in multiple palettes, this means that the `color` and `background-color` properties change according to its `palette` property value.

```jsx
<Set>
  <Avatar label="base" />
  <Avatar label="primary" palette="primary" />
  <Avatar label="danger" palette="danger" />
</Set>
```

## Installation

```sh isStatic
yarn add @vtex/admin-ui
```

Learn more in [Get started](/docs/get-started/).

## Variation

### Base

By default, it has a `base` palette.

```jsx
<Avatar label="base" />
```

### Primary

Palette with `primary` value.

```jsx
<Avatar label="primary" palette="primary" />
```

### Danger

Palette with `danger` value.

```jsx
<Avatar label="danger" palette="danger" />
```

## Customization

You can also use the `styleOverrides` property to customize any style.

# Props

<proptypes heading="Avatar" component="Avatar" />
