---
path: /packages/admin-styles/
---

# admin-styles

admin css-in-js parser

This package is responsible to:

1. Define the VTEX admin theme structure
2. Parse the [StyleObject](/theming/style-object/) to the a emotion [ObjectStyle](https://emotion.sh/docs/object-styles)

```bash isStatic
yarn add @vtex/admin-styles @emotion/css @emotion/react
```

## Usage

Define a theme object that respect's the defined shape of the `Theme` type, and call the `styles` function:

```ts isStatic
import { styles, Theme } from '@vtex/admin-styles'

const theme: Theme = {
  colors: {
    dark: {
      primary: 'black',
      secondary: 'silver',
    },
  },
}

styles({
  bg: 'dark.primary',
  color: 'dark.secondary',
})(theme)

// returns { backgroundColor: 'black', color: 'silver' }
```

You can also use emotion to style your react components after parse.

```tsx isStatic
import { css } from '@emotion/css'
import { styles, Theme } from '@vtex/admin-styles'

const theme: Theme = {
  colors: {
    dark: {
      primary: 'black',
      secondary: 'silver',
    },
  },
}

const styles = styles({
  bg: 'dark.primary',
  color: 'dark.secondary',
})(theme)

/** compiled className */
const className = css(styles)

render(<div className={className} />)
```
