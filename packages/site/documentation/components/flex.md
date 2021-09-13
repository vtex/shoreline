---
path: /flex/
---

# Flex

Flex is a [Box](/box/) with `display: flex` and it comes with helpful styles shorthand.

## Import

```jsx isStatic
import { Flex, FlexSpacer } from '@vtex/admin-ui'
```

## Behavior

```jsx
<Flex csx={{ height: 100 }}>
  <Flex
    justify="center"
    align="center"
    csx={{
      bg: 'mid.tertiary',
      width: 100,
    }}
  >
    A
  </Flex>
  <Flex
    justify="center"
    align="center"
    csx={{
      bg: 'mid.secondary',
      width: 150,
    }}
  >
    B
  </Flex>
  <Flex
    justify="center"
    align="center"
    csx={{
      bg: 'mid.tertiary',
      flex: 1,
    }}
  >
    C
  </Flex>
</Flex>
```

## Composition

| Name         | Description                                                                                                  | Props             |
| ------------ | ------------------------------------------------------------------------------------------------------------ | ----------------- |
| `Flex`       | The main wrapper with `display: flex` and helpful styles shorthand.                                          | `FlexProps`       |
| `FlexSpacer` | Creates an adjustable, empty space that can be used to tune the spacing between child elements within `Flex` | `FlexSpacerProps` |

## Spacer

You can combine `Flex` and `FlexSpacer` to create an adjustable, empty space that can be used to tune the spacing between child elements within Flex.

```jsx
<Flex justify="space-around">
  <Box
    csx={{
      bg: 'red.secondary',
      padding: 1,
      size: 100,
    }}
  >
    Box 1
  </Box>
  <FlexSpacer />
  <Box
    csx={{
      bg: 'green.secondary',
      padding: 1,
      size: 100,
    }}
  >
    Box 2
  </Box>
</Flex>
```

## Props

### Flex

All props of `as`, which is `div` by default. And also, the props that has the same type of flexbox styles:

| Name        | Shorthand for    |
| ----------- | ---------------- |
| `direction` | `flexDirection`  |
| `wrap`      | `flexWrap`       |
| `basis`     | `flexBasis`      |
| `shrink`    | `flexShrink`     |
| `grow`      | `flexGrow`       |
| `align`     | `alignItems`     |
| `justify`   | `justifyContent` |
| `order`     | `order`          |

## FlexSpacer

All props of `div` JSX element.
