# VTEX Components Button

Accessible admin button component.

## Install

```bash
yarn add @vtex/admin-ui
```

or

```bash
npm install @vtex/admin-ui
```

## Usage

```jsx
import Button from '@vtex/admin-ui'

function UseCase() {
  return <Button>VTEX Components Button</Button>
}
```

## Props

| prop         | type                                                      | description                | required | default      |
| ------------ | --------------------------------------------------------- | -------------------------- | -------- | ------------ |
| orientation  | "horizontal", "vertical"                                  | Divider's orientation      | 🚫       | "horizontal" |
| size         | "regular", "small"                                        | Size of the button         | 🚫       | "regular"    |
| variant      | "filled", "outlined", "subtle"                            | Button variant             | 🚫       | "filled"     |
| palette      | "primary", "danger"                                       | Colors palette             | 🚫       | "primary"    |
| iconPosition | "start", "end"                                            | Position of the icon       | 🚫       | "start"      |
| icon         | (props: { size: number; sx: SxStyleProp }) => JSX.Element | Icon of the button         | 🚫       | -            |
| sx           | SxStyleProp                                               | Theme-ui style prop        | 🚫       | -            |
| disabled     | boolean                                                   | Same as the HTML attribute | 🚫       | false        |
| children     | ReactNode                                                 | Button Label               | 🚫       | -            |
| onClick      | () => void                                                | onClick event              | 🚫       | -            |
| value        | string                                                    | value                      | 🚫       | -            |
| onFocus      |                                                           | onFocus event              | 🚫       | -            |
| onMouseEnter |                                                           | onMouseEnter event         | 🚫       | -            |
| onMouseLeave |                                                           | onMouseLeave event         | 🚫       | -            |
| onMouseDown  |                                                           | onMouseDown event          | 🚫       | -            |
| onMouseUp    |                                                           | onMouseUp event            | 🚫       | -            |
| onMouseOver  |                                                           | onMouseOver event          | 🚫       | -            |

### Migration Guide

#### Button Style

- `variation` -> Refer to the structure of the button and how it will behavior on the states of hover, pressed, and focused.
- `palette` -> Refer to the color palette of the button (Primary and Danger palettes)
- `sx` -> It's used for styling, so if it's neecessary to add or override some style, is possible to do this using this property.

#### Button with Icon

To use a button with an icon before, we needed to import another component, but now we can have this behavior only using the main Button.

##### Example

- Icon and Label

```jsx
import { Button } from '@vtex/admin-ui'

function UseCase() {
  return (
    <Button icon={(props) => <Icon {...props} />} iconPosition="start">
      VTEX Button
    </Button>
  )
}
```

- Only Icon

```jsx
import { Button } from '@vtex/admin-ui'

function UseCase() {
  return <Button icon={(props) => <Icon {...props} />} />
}
```

##### Icon render props

You can reuse a pre-built style for the icon, using `render props`. We do this in order to guarantee the `pixel perfect` design.

- `sx` -> Guarantee the margin spacing between Icon and Label
- `size` -> To identify the size of the button - "regular" or "smal"

If necessary you can override the style defined before, just passing a custom `sx` prop.
