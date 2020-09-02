# VTEX Components Divider

Elementary accessible `hr`, that can be reused by all VTEX Styleguides.
You can use reakit full features (except the 'as' prop) and theme-ui's sx.
It renders a `hr` element by default.

> This is a styled base component, so any Styleguide can theme it. You may configure your `components.divider` property of the theme object (check the theming section).

## Install

```bash
yarn add @vtex-components/divider
```

or

```bash
npm install @vtex-components/divider
```

## Usage

```jsx
import Divider from '@vtex-components/divider'

function UseCase() {
  return <Divider orientation="horizontal" />
}
```

## 🎨 Theming

| Modifier    | Description         |
| ----------- | ------------------- |
| styles      | base styles         |
| orientation | Divider orientation |

### Example

You can define the theme with:

```js
const theme = {
  components: {
    divider: {
      styles: {...},
      orientation: {
        vertical: {...},
        horizontal: {...}
      }
    },
  },
}
```

Then use the Divider:

```jsx
<Divider orientation="horizontal"/>
<Divider orientation="vertical"/>
```
