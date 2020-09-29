# Admin UI Button

Accessible button component.

## Install

```bash
yarn add @vtex/admin-ui
```

## Usage

- Simple usage

```jsx
import Button from '@vtex/admin-ui'

function UseCase() {
  return <Button>Admin Button</Button>
}
```

- Variants

```jsx
import Button from '@vtex/admin-ui'

function UseCase() {
  return (
    <>
      <Button variant="filled">Filled Button</Button>
      <Button variant="subtle">Subtle Button</Button>
      <Button variant="text">Text Button</Button>
    </>
  )
}
```

- Palettes

```jsx
import Button from '@vtex/admin-ui'

function UseCase() {
  return (
    <>
      <Button palette="primary">Primary Button</Button>
      <Button palette="danger">Danger Button</Button>
    </>
  )
}
```

- Button With Icon

```jsx
import Button from '@vtex/admin-ui'

function UseCase() {
  return (
    <>
      <Button iconPosition="start" icon={<Icon />}>
        Primary Button
      </Button>
    </>
  )
}
```

## Props

| prop         | type                                                      | description                | required | default   |
| ------------ | --------------------------------------------------------- | -------------------------- | -------- | --------- |
| size         | "regular", "small"                                        | Size of the button         | 🚫       | "regular" |
| variant      | "filled", "subtle", "text"                                | Button variant             | 🚫       | "filled"  |
| palette      | "primary", "danger"                                       | Colors palette             | 🚫       | "primary" |
| iconPosition | "start", "end"                                            | Position of the icon       | 🚫       | "start"   |
| icon         | (props: { size: number; sx: SxStyleProp }) => JSX.Element | Icon of the button         | 🚫       | -         |
| sx           | SxStyleProp                                               | Theme-ui style prop        | 🚫       | -         |
| disabled     | boolean                                                   | Same as the HTML attribute | 🚫       | false     |
| children     | ReactNode                                                 | Button Label               | 🚫       | -         |
| value        | string                                                    | value                      | 🚫       | -         |
| onClick      | () => void                                                | onClick event              | 🚫       | -         |
| onFocus      | func                                                      | onFocus event              | 🚫       | -         |
| onMouseEnter | func                                                      | onMouseEnter event         | 🚫       | -         |
| onMouseLeave | func                                                      | onMouseLeave event         | 🚫       | -         |
| onMouseDown  | func                                                      | onMouseDown event          | 🚫       | -         |
| onMouseUp    | func                                                      | onMouseUp event            | 🚫       | -         |
| onMouseOver  | func                                                      | onMouseOver event          | 🚫       | -         |

## Migration Guide

This section is designated for users coming from [Styleguide v9](https://styleguide.vtex.com/)

### Button Style

- `variation` -> Refer to the structure of the button and how it will behave on the states of hover, pressed, and focused.
- `palette` -> Refer to the color palette of the button (Primary and Danger palettes)
- `sx` -> It's used for styling, so if it's necessary to add or override some style, is possible to do this using this property.

### Variant and Palette

In the `styleguide v9`, we used `variation` to define the type and color of the button. Now we've separated it into two props `variant` and `palette`.

#### How we use

- `variation="primary"` -> `variant="filled" palette="primary"`
- `variation="secondary"` -> `variant="subtle" palette="primary"`
- `variation="tertiary"` -> `variant="text" palette="primary"`
- `variation="danger"` -> `variant="filled" palette="danger"`
- `variation="danger-tertiary"` -> `variant="text" palette="danger"`

### Button with Icon

To use a button with an icon before, we needed to import another component, but now we can have this behavior only using the main Button.

#### Example

- Icon and Label

```jsx
import { Button } from '@vtex/admin-ui'

function UseCase() {
  return (
    <Button icon={<Icon />} iconPosition="start">
      VTEX Button
    </Button>
  )
}
```

- Only Icon

```jsx
import { Button } from '@vtex/admin-ui'

function UseCase() {
  return <Button icon={<Icon />} />
}
```

#### Icon render props

You can reuse a pre-built style for the icon, using `render props`. We do this to guarantee a `pixel-perfect` design.

- `sx` -> Guarantee the margin spacing between Icon and Label
- `size` -> To identify the size of the button - "regular" or "smal"

If necessary you can override the style defined before, just passing a custom `sx` prop.
