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

## Props

| prop      | type        | description                                              | default | required |
| --------- | ----------- | -------------------------------------------------------- | ------- | -------- |
| children  | ReactNode   | Element that triggers the tooltip                        | -       | ✔️       |
| label     | String      | Text shown in the tooltip                                | -       | ✔️       |
| arrow     | ReactNode   | Arrow element, if you want your tooltip to have an arrow | -       | 🚫       |
| placement | Placement   | The placement of the tooltip relative to its children    | top     | 🚫       |
| visible   | boolean     | Whether the tooltip is visible or not                    | -       | 🚫       |
| sx        | SxStyleProp | Theme-ui style prop                                      | -       | 🚫       |

### Arrow example

If you want your tooltip to have an arrow, you can pass it to the tooltip as a prop. On the following example,
it's shown how you can use the Reakit TooltipArrow with the tooltip, but you can design any arrow you want.
The tooltip state is passed to the arrow, so you can access the placement and visibility of the tooltip.

```js
import Tooltip from '@vtex-components/toolitp'
import { TooltipArrow } from 'reakit'

function Arrow(props) {
  return <TooltipArrow {...props} />;
}

function TooltipExample() {
  return(
    <Tooltip label="Tooltip label" placement="top" arrow={<Arrow />}>
      <button>Children component</button>
    </Tooltip>
  )
}
```
