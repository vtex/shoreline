# Primitives

[![NPM](https://img.shields.io/npm/v/@vtex/admin-primitives.svg)](https://www.npmjs.com/package/@vtex/admin-primitives)

Primitives are polymorphic components

## Getting started

This package is already a part of `admin-ui` - so if you are using it, there is no need for installation.

For **standalone usage**, you can install it as an npm package (with its peer dependencies):

```sh
yarn add @vtex/admin-primitives @vtex/admin-core reakit @emotion/css @emotion/react
```

After that, you must add the `admin-core's ThemeProvider` on your app root - so that you can consume styles.

```jsx
import { ThemeProvider } from '@vtex/admin-core'
import { Flex } from '@vtex/admin-primitives'

function ApplicationRoot() {
  return (
    <ThemeProvider>
      <Flex>A flex container</Flex>
    </ThemeProvider>
  )
}
```

## Engineering

### csx prop

This prop is present in all components and is responsible to receive a style-object. More info [Styles](../styles/README.md)

```jsx
<Primitive csx={{ bg: 'blue', color: 'light.primary' }}>Blue box</Primitive>s
```

### Polymorphism

All primitives are polymorphic, this means that you can assign different elements to them through the `element` property.

The default element is the `div`, this is true to every component:

```jsx
<Primitive>renders a div</Primitive>
```

You can choose the element to render:

```jsx
<Primitive element="a" href="#">
  renders an anchor
</Primitive>
```

You can also pass a valid React component (it must receive `className` so that styles are passed correctly):

```jsx
import { Link } from 'gatsby'

function Example() {
  return <Primitive element={Link}>Gatsby link</Primitive>
}
```

### Types

#### PrimitiveProps<E>

| prop          | type         | required | description                            |
| ------------- | ------------ | -------- | -------------------------------------- |
| element       | `E`          | 🚫       | Element that will be rendered          |
| className     | `string`     | 🚫       | element className                      |
| extends `<E>` | props of `E` | 🤔       | This component inherits all props of E |

#### FlexProps<E>

| prop      | type                              | required | description                                 |
| --------- | --------------------------------- | -------- | ------------------------------------------- |
| E         | `PrimitiveProps<E>`               | 🚫       | Extends all props of `Primitive`            |
| align     | `ResponsiveValue<AlignContent>`   | 🚫       | Shorthand for CSS `alignItems` property     |
| basis     | `ResponsiveValue<FlexBasis>`      | 🚫       | Shorthand for CSS `flexbasis` property      |
| direction | `ResponsiveValue<FlexDirection>`  | 🚫       | Shorthand for CSS `flexDirection` property  |
| grow      | `ResponsiveValue<FlexGrow>`       | 🚫       | Shorthand for CSS `flexGrow` property       |
| shrink    | `ResponsiveValue<FlexShrink>`     | 🚫       | Shorthand for CSS `flexShrink` property     |
| justify   | `ResponsiveValue<JustifyContent>` | 🚫       | Shorthand for CSS `justifyContent` property |
| wrap      | `ResponsiveValue<FlexWrap>`       | 🚫       | Shorthand for CSS `flexWrap` property       |
| order     | `ResponsiveValue<Order>`          | 🚫       | Shorthand for CSS `order` property          |

#### FlexSpacerProps<E>

| prop | type                | required | description                      |
| ---- | ------------------- | -------- | -------------------------------- |
| E    | `PrimitiveProps<E>` | 🚫       | Extends all props of `Primitive` |

#### GridProps<E>

| prop            | type                                   | required | description                                      |
| --------------- | -------------------------------------- | -------- | ------------------------------------------------ |
| E               | `PrimitiveProps<E>`                    | 🚫       | Extends all props of `Primitive`                 |
| gap             | `ResponsiveValue<GridGap>`             | 🚫       | Shorthand for CSS `gridGap` property             |
| rowGap          | `ResponsiveValue<GridRowGap>`          | 🚫       | Shorthand for CSS `gridRowGap` property          |
| columnGap       | `ResponsiveValue<GridColumnGap>`       | 🚫       | Shorthand for CSS `gridColumnGap` property       |
| templateAreas   | `string[]`                             | 🚫       | Shorthand for CSS `gridTemplateAreas` property   |
| templateRows    | `ResponsiveValue<GridTemplateRows>`    | 🚫       | Shorthand for CSS `gridTemplateRows` property    |
| templateColumns | `ResponsiveValue<GridTemplateColumns>` | 🚫       | Shorthand for CSS `gridTemplateColumns` property |

#### GridItemProps<E>

| prop | type                        | required | description                           |
| ---- | --------------------------- | -------- | ------------------------------------- |
| E    | `PrimitiveProps<E>`         | 🚫       | Extends all props of `Primitive`      |
| area | `ResponsiveValue<GridArea>` | 🚫       | Shorthand for CSS `gridArea` property |
