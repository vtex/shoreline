---
path: /docs/tag/
---

# Tag

Tag is a compact element that represents an input, attribute, or action. It renders a `div` element.

- version: beta.1

## Behavior

```jsx
import { Tag, IconFavorite, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Tag
        icon={<IconFavorite />}
        label="Here goes the label!"
        handleDelete={() => console.log('delete')}
      />
    </ThemeProvider>
  )
}
```

## Installation

```static
yarn add @vtex/admin-ui
```

```jsx static
import { Tag, TagProps } from '@vtex/admin-ui'
```

## Variation

#### Sizes

```jsx
import { Tag, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Tag label="Rio de Janeiro" />
      <Tag label="Rio de Janeiro" size="small" />
    </ThemeProvider>
  )
}
```

#### Palettes

```jsx
import { Tag, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Tag label="Rio de Janeiro" palette="blue" />
      <Tag label="Rio de Janeiro" palette="red" />
      <Tag label="Rio de Janeiro" palette="yellow" />
      <Tag label="Rio de Janeiro" palette="green" />
      <Tag label="Rio de Janeiro" palette="black" />
      <Tag label="Rio de Janeiro" palette="purple" />
    </ThemeProvider>
  )
}
```

#### Deletable

```jsx
import { Tag, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Tag label="Rio de Janeiro" handleDelete={() => console.log('delete')} />
    </ThemeProvider>
  )
}
```

#### With Icon

```jsx
import { Tag, IconFavorite, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Tag icon={<IconFavorite />} label="Rio de Janeiro" />
    </ThemeProvider>
  )
}
```

## Props

| Prop name      | Description               | Type                                                           | Default value | Required? |
| -------------- | ------------------------- | -------------------------------------------------------------- | ------------- | --------- |
| `label`        | `Tag Label`               | `string`                                                       | -             | `true`    |
| `size`         | `Tag Size`                | `'regular'`, `'small'`                                         | `regular`     | `false`   |
| `palette`      | `Tag palette color`       | `'black'`, `'green'`,`'red'`, `'yellow'`, `'blue'`, `'purple'` | `blue`        | `false`   |
| `handleDelete` | `handle tag delete event` | `() => void`                                                   | -             | `false`   |
| `icon`         | `Tag Icon`                | `ReactNode`                                                    | -             | `false`   |

## Customization

You can use **Space Tokens**, **Layout Tokens**, **Flex Tokens**, and **Sx prop** to add styles to the tag component.

> Check the theme documentation section for detailed info
