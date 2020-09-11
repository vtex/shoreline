# VTEX Components Tooltip

Elementary tooltip component that can be reused by all VTEX Styleguides.
You can use reakit full features (except the 'as' prop) and theme-ui's sx.
It renders a tooltip element by default.

> This is a styled base component, so any system can theme it. You may configure your `components.tooltip` property of the theme object (check the theming section).

## Install

```bash
yarn add @vtex-components/tooltip
```

or

```bash
npm install @vtex-components/tooltip
```

## Usage

```jsx
import Tooltip from '@vtex-components/toolitp'

function UseCase() {
  return <Tooltip label="Tooltip text here"><button>Children</button></Tooltip>
}
```

## 🎨 Theming

| Modifier | Description         |
| -------- | ------------------- |
| styles   | base styles         |

### Example

You can define the theme with:

```js
const theme = {
  components: {
    tooltip: {
      backgroundColor: 'black',
      color: 'white',
      paddingY: 1,
      paddingX: 2,
    },
  },
}
```
