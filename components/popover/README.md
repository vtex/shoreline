# VTEX Components Popover

Elementary popover component that can be reused by all VTEX Styleguides.
You can use reakit full features (except the 'as' prop) and theme-ui's sx.
It renders a popover element by default.

## Install

```bash
yarn add @vtex-components/popover
```

or

```bash
npm install @vtex-components/popover
```

## Usage

```jsx
import { Popover, usePopoverState } from '@vtex-components/popover'

function UseCase() {
  const popover = usePopoverState()

  return (
    <Popover
      {...popover}
      disclosure={<button>Open popover</button>}
    >
      <p>This is a Popover</p>
    </Popover>
  )
}
```

### With arrow

If you want your popover to have an arrow, you can pass it to the tooltip as a prop. On the following example,
it's shown how you can use the Reakit [Reakit PopoverArrow](https://reakit.io/docs/popover/#popoverarrow) with the popover, but you can design any arrow you want.
The popover state is passed to the arrow, so you can access the placement and visibility of the tooltip.

## 🎨 Theming

| Modifier | Description         |
| -------- | ------------------- |
| styles   | base styles         |

### Example

You can define the theme with:

```js
const theme = {
  components: {
    popover: {
      styles: {
        backgroundColor: 'white',
      }
    },
  },
}
```

# Props

| prop       | type        | description                                           | default | required |
| ---------- | ----------- | ----------------------------------------------------- | ------- | -------- |
| children  | ReactNode   | Popover content element                        | -       | ✔️        |
| disclosure | ReactNode   | Element that triggers the popover                     | -       | ✔️       |
| placement  | Placement   | The placement of the popover relative to its children | top     | 🚫       |
| arrow     | ReactNode   | Arrow element, if you want your tooltip to have an arrow | -       | 🚫       |
| visible   | boolean     | Whether the tooltip is visible or not                    | -       | 🚫       |
| sx        | SxStyleProp | Theme-ui style prop                                      | -       | 🚫       |


PopoverSize = `'small'` | `'regular'`  
Placement = `"auto-start" | "auto" | "auto-end" | "top-start" | "top" | "top-end" | "right-start" | "right" | "right-end" | "bottom-end" | "bottom" | "bottom-start" | "left-end" | "left" | "left-start"`
