# Admin UI Text

The component that abstracts all text variants from admin's styleguide

## Usage

```jsx
import { Text } from '@vtex/admin-ui'

function UseCase() {
  return <Text variant="headline">Here goes your text!</Text>
}
```

## Types

| prop    | type              | description                        | required | default |
| ------- | ----------------- | ---------------------------------- | -------- | ------- |
| as      | React.ElementType | Used to render a specific HTML Tag | 🚫       | -       |
| variant | TextVariant       | Text variants                      | 🚫       | 'body'  |

```ts
type TextVariant =
  | 'small'
  | 'body'
  | 'highlight'
  | 'action'
  | 'subtitle'
  | 'headline'
```

### `variant` prop

By default `<Text />` render three HTML elements

- **variant='headline'** -> `<h1 />`
- **variant='subtitle'** -> `<h2 />`
- **other variants** -> `<span />`

| variant    | Admin's Theme                                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------------------------- |
| 'small'    | `fontVariationSettings: "'wght' 80"`,<br>`fontSize: 0`                                                              |
| 'body'     | `lineHeight: 'body'`,<br> `fontVariationSettings: "'wght' 80"`,<br> `fontSize: 1`                                   |
| 'highlight | `lineHeight: 'highlight'`,<br> `fontVariationSettings: "'wght' 100"`,<br> `fontSize: 1`                             |
| 'action'   | `lineHeight: 'action'`,<br>`fontVariationSettings: "'wght' 100"`,<br>`fontSize: 1`,<br>`textTransform: 'uppercase'` |
| 'subtitle' | `lineHeight: 'subtitle'`,<br> `fontVariationSettings: "'wght' 100"`,<br> `fontSize: 2`                              |
| 'headline' | `lineHeight: 'headline'`,<br> `fontVariationSettings: "'wght' 100"`,<br>`fontSize: 3`                               |

> 💡 Also check [VTEX Admin Theme](../../theme/README.md) for detailed info.

### `as` prop

If you want to render the component using a different HTML tag, you should use this prop.

#### Examples

```jsx
import { Text } from '@vtex/admin-ui'

function UseCase() {
  return (
    <Text as="p" variant="body">
      Look, a paragraph
    </Text>
  )
}
```

```jsx
import { Text } from '@vtex/admin-ui'

function UseCase() {
  return (
    <Text as="h3" variant="headline">
      Look, a heading 3
    </Text>
  )
}
```
