# Admin UI Text

The component that abstracts all text variants from admin's styleguide

> 💡 Also check [VTEX Admin Theme](../../theme/README.md) for detailed info.

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
| sx      | SxStyleProp       | ThemeUI style prop                 | 🚫       | {}      |

```ts
type TextVariant =
  | 'small'
  | 'body'
  | 'highlight'
  | 'action'
  | 'subtitle'
  | 'headline'
```

### Customization

Use `sx` prop if you want to add any style to your `Text` component.

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

⚠️ Remember that variant styles are based on `Admin's Theme`

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

## Color

This component doesn't have a default color, we do this so that the component can inherit the color defined on its parent.
But you can set this using `sx` prop!

### Example

```jsx
import { Text } from '@vtex/admin-ui'

function UseCase() {
  return (
    <Text sx={{ color: 'text' }} variant="body">
      Look, a text with 'text' color... 🤔
    </Text>
  )
}
```

⚠️ Remember that color values are based on `Admin's Theme`

## VTEX Trust variable font

A variable font is a specification that can significantly reduce font file sizes and make it possible to animate font characters. We've implemented `VTEX Trust font` using this feature.

[Read more about Variable Fonts](https://web.dev/variable-fonts/)

### Fallback

Most of the browsers have support to variable fonts, but for the remaining browsers who do not, we have a fallback using `sans-serif` font.

[Read more about the Browsers Support](https://caniuse.com/variable-fonts)
