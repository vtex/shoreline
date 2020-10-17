---
path: /docs/unstable-theme/
nightly: true
---

# Unstable Theme

## Installation

To use this version, need to install the next version of admin-ui:

```sh
yarn add @vtex/admin-ui@next
```

## Behavior

### Custom themes

> Make sure to read the theme theory section

```jsx
import {
  unstableThemeProvider as ThemeProvider,
  unstableButton as Button,
} from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider
      theme={{
        colors: {
          primary: {
            base: 'text',
          },
        },
      }}
    >
      <Button>Button Primary</Button>
    </ThemeProvider>
  )
}
```

### With current theme

```jsx
import {
  Button,
  unstableThemeProvider as ThemeProvider,
  unstableButton as ButtonNext,
  theme,
} from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider theme={theme}>
      <Button sx={{ marginRight: 2 }}>Current Button</Button>
      <ButtonNext styles={{ marginLeft: 2 }}>Upcomming Button</ButtonNext>
    </ThemeProvider>
  )
}
```

<proptypes component="unstableThemeProvider">
