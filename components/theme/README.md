# VTEX Components Theme

> Theme utilities

## Install

```bash
yarn add @vtex-components/theme
```

or

```bash
npm install @vtex-components/theme
```

## Components

### ThemeProvider

Same as `theme-ui/ThemeProvider`

## Hooks

### useColorMode

Same as `theme-ui/useColorMode`

### useTheme

Returns the theme object

```jsx
import { useTheme } from '@vtex-components/theme'

function Component() {
  const theme = useTheme()
  // ...
}
```

### useComponentSx

Combine styles of multiple modifiers within a component.

| param       | description                      | required |
| ----------- | -------------------------------- | -------- |
| id          | id of the component in the theme | ✅       |
| modifierMap | selected modifiers               | 🚫       |

```jsx
import { useComponentSx } from '@vtex-components/theme'

// sample theme
const theme = {
  components: {
    'sample-component': {
      styles: {
        bg: 'white',
        color: 'black',
        ':hover': {
          transform: 'scale(2)',
        },
      },
      variant: {
        inverted: {
          bg: 'black',
          color: 'white',
        },
      },
    },
  },
}

function Component() {
  const styles = useComponentSx('sample-component', { variant: 'inverted' })
  // console.log(styles) => { bg: 'black', color: 'white', ':hover': { transform: 'scale(2)' } }
}
```

## Utils

### mergeSx

Merges two objects deepply.

Same as `deepmerge`.

### get

Same as `@theme-ui/css/get`.
