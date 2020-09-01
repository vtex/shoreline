# VTEX Components Button

Elementary accessible button component that can be reused by all VTEX Styleguides.
You can use reakit full features (except the 'as' prop) and theme-ui's sx.
It renders a button element by default.

> This is a styled base component, so any Styleguide can theme it. You may configure your `components.button` property of the theme object (check the theming section).

## Install

```bash
yarn add @vtex-components/button
```

or

```bash
npm install @vtex-components/button
```

## Usage

```jsx
import Button from '@vtex-components/button'

function UseCase() {
  return <Button>VTEX Components Button</Button>
}
```

## 🎨 Theming

| Modifier | Description         |
| -------- | ------------------- |
| styles   | base styles         |
| variant  | button variants     |
| size     | measures in general |

### Example

You can define the theme with:

```js
const theme = {
  components: {
    button: {
      styles: {
        ':focus': {
          outline: 'none',
          boxShadow: '0px 0px 1px 0px solid #cecece'
        }
      },
      variant: {
        primary: {
          bg: 'primary',
          color: 'white',
        },
        secondary: {
          bg: 'secondary',
          color: 'black',
        },
      },
      size: {
        small: {
          paddingY: 1
          paddingX: 2
        },
        regular: {
          paddingY: 2
          paddingX: 3
        },
      },
    },
  },
}
```

Then use the Button:

```jsx
<Button variant="primary" size="small">
  Small Primary Button
</Button>
```
