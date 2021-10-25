---
title: Flex
path: /flex/
---

# Flex

`Flex` represents a flexbox layout.

## Usage

```jsx isStatic
import { Flex, FlexSpacer } from '@vtex/admin-ui'

function Example() {
  return (
    <Flex>
      <Flex justify="center" align="center">
        First
      </Flex>
      <Flex justify="center" align="center">
        Second
      </Flex>
      <Flex justify="center" align="center">
        Third
      </Flex>
    </Flex>
  )
}
```

## Composition

| Name         | Description                                                                             |
| ------------ | --------------------------------------------------------------------------------------- |
| `Flex`       | The main wrapper with `display: flex` and helpful styles shorthand.                     |
| `FlexSpacer` | Creates an adjustable space that tunes the spacing between child elements within `Flex` |

## Examples

### Styling

Use the `csx` property to [add styles](/guidelines/styling/).

```jsx
<Flex csx={{ height: 100 }}>
  <Flex
    justify="center"
    align="center"
    csx={{
      ...palette('purple'),
      width: 100,
    }}
  >
    Fist
  </Flex>
  <Flex
    justify="center"
    align="center"
    csx={{
      ...palette('teal'),
      width: 150,
    }}
  >
    Second
  </Flex>
  <Flex
    justify="center"
    align="center"
    csx={{
      ...palette('purple'),
      flex: 1,
    }}
  >
    Third
  </Flex>
</Flex>
```

### Semantic elements

By default, `Flex` renders a div element. You can customize it using the `as` prop.

```jsx isStatic
<Flex as="section">
  ...
</Flex>

<Flex as="aside">
  ...
</Flex>

<Flex as="footer">
  ...
</Flex>
```

### Spacer

You can combine `Flex` and `FlexSpacer` to adjust spacing.

```jsx
<Flex justify="space-around">
  <Box
    csx={{
      ...palette('purple'),
      padding: 1,
      size: 100,
    }}
  >
    Box 1
  </Box>
  <FlexSpacer />
  <Box
    csx={{
      ...palette('teal'),
      padding: 1,
      size: 100,
    }}
  >
    Box 2
  </Box>
</Flex>
```

## Accessibility

Be sure that you're using the correct semantic element and `aria roles` for the behavior you're implementing. You can use the [WAI-ARIA Practices](https://www.w3.org/TR/wai-aria-practices/) to help you.

## Props

### Flex

All props of `as` which is `div` by default.

| Name      | Type                 | Description                         | Required | Default |
| --------- | -------------------- | ----------------------------------- | -------- | ------- |
| direction | `CSS.flexDirection`  | Same as flexDirection css property  | 🚫       | -       |
| wrap      | `CSS.flexWrap`       | Same as flexWrap css property       | 🚫       | -       |
| basis     | `CSS.flexBasis`      | Same as flexBasis css property      | 🚫       | -       |
| shrink    | `CSS.flexShrink`     | Same as flexShrink css property     | 🚫       | -       |
| grow      | `CSS.flexGrow`       | Same as flexGrow css property       | 🚫       | -       |
| align     | `CSS.alignItems`     | Same as alignItems css property     | 🚫       | -       |
| justify   | `CSS.justifyContent` | Same as justifyContent css property | 🚫       | -       |
| order     | `CSS.order`          | Same as order css property          | 🚫       | -       |
| csx       | `StyleObject`        | Layout styles                       | 🚫       | -       |

### FlexSpacer

All props of `div` JSX element.

| Name | Type          | Description   | Required | Default |
| ---- | ------------- | ------------- | -------- | ------- |
| csx  | `StyleObject` | Layout styles | 🚫       | -       |
