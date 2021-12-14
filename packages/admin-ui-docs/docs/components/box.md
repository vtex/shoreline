---
title: Box
path: /box/
---

# Box

`Box` is the base component to be used for most of your html elements. It has no defined style or shape.

## Usage

```jsx isStatic
import { Box } from '@vtex/admin-ui'

function Example() {
  return <Box>Content</Box>
}
```

## Examples

### Styling

Use the `csx` property to [add styles](/guidelines/styling/).

```jsx isStatic
<Box csx={{ padding: 1 }}>...</Box>
```

### Semantic elements

By default, `Box` renders a div element. You can customize it using the `as` prop.

```jsx isStatic
<Box as="section">
  ...
</Box>

<Box as="span" aria-hidden>
  ...
</Box>
```

## Accessibility

Be sure that you're using the correct semantic element and `aria roles` for the behavior you're implementing. You can use the [WAI-ARIA Practices](https://www.w3.org/TR/wai-aria-practices/) to help you.

## Props

All props of `as` which is `div` by default.

| Name | Type          | Description   | Required | Default |
| ---- | ------------- | ------------- | -------- | ------- |
| csx  | `StyleObject` | Layout styles | 🚫       | -       |
