---
path: /hooks/use-theme/
---

# useTheme

Custom hook that returns the entire theme object. Must be used under a `<ThemeProvider>` context.

## Usage

```jsx
function Example() {
  const theme = useTheme()

  return <div>value of blue.default: {theme.colors.blue.default}</div>
}
```

### Do

- ✅ Use it if you need theme values on your custom hooks

```jsx isStatic
// function that mix two colors
import { mix } from 'polished'

// mixes primary and success color by weight
function usePrimarySuccess(weight = 0.5) {
  const theme = useTheme()
  const primary = theme.colors.blue.default
  const success = theme.colors.green.default

  return mix(weight, primary, success)
}
```

### Dont

- 🚫 Use it to pass values to StyleObject

```jsx isStatic
const theme = useTheme()

// 🚫 Wrong
<Box styles={{ color: theme.colors.blue.default  }} />
<div className={cn({ color: theme.colors.blue.default  })} />


// ✅ Correct
<Box styles={{ color: 'blue'  }} />
<div className={cn({ color: 'blue'  })} />
```
