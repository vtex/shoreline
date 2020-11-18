---
path: /form/text-area/
---

# TextArea

Component to create a TextArea.

## Behavior

```jsx
import { Box, TextArea, useInputState, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const state = useInputState()

  return (
    <ThemeProvider>
      <Box width={300}>
        <TextArea
          state={state}
          id="textarea-1"
          label="Label"
          helperText="Helper Text"
          charLimit={120}
        />
      </Box>
    </ThemeProvider>
  )
}
```

## Installation

```static
yarn add @vtex/admin-ui
```

```jsx static
import { TextArea } from '@vtex/admin-ui'
```

## Variation

### Error

```jsx
import { Box, TextArea, useInputState, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const state = useInputState()

  return (
    <ThemeProvider>
      <Box width={300}>
        <TextArea
          state={state}
          id="textarea-2"
          label="Label"
          helperText="Helper Text"
          errorMessage="Error Message"
          charLimit={120}
        />
      </Box>
    </ThemeProvider>
  )
}
```

### Disabled

```jsx
import { Box, TextArea, useInputState, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  const state = useInputState()

  return (
    <ThemeProvider>
      <Box width={300}>
        <TextArea
          state={state}
          id="textarea-3"
          label="Label"
          helperText="Helper Text"
          disabled
          charLimit={120}
        />
      </Box>
    </ThemeProvider>
  )
}
```

## Customization

You can use the `styleOverrides` property to customize any style.

# Props

<proptypes heading="TextArea" component="TextArea" />
