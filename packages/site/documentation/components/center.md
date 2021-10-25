---
title: Center
path: /center/
---

# Center

Center is a layout component that centers its child within itself.

## Usage

```jsx isStatic
import { Center } from '@vtex/admin-ui'

function Example() {
  return (
    <Center>
      <tag.h1>Center heading</tag.h1>
    </Center>
  )
}
```

## Examples

### Centralized

Put any child element inside it, give it any `width` or/and `height`, it'll ensure the child is centered.

```jsx
<Center
  csx={{
    height: 200,
    bg: 'muted',
  }}
>
  <tag.h1>This is the center</tag.h1>
</Center>
```

## Accessibility

Be sure that you're using the correct semantic element and `aria roles` for the behavior you're implementing. You can use the [WAI-ARIA Practices](https://www.w3.org/TR/wai-aria-practices/) to help you.

## Props

All props of `as` which is `div` by default.
