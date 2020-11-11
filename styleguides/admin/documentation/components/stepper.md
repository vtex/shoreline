---
path: /docs/stepper/
---

# Stepper

This is a component of a regular numerical input where you expect the user to modify it by a few incremental steps.

## Behavior

```jsx
import { ThemeProvider, Stepper } from '@vtex/admin-ui'

function ExampleStepper() {
  return (
    <ThemeProvider>
      <Stepper variant="focus" value={1} maxValue={3}></Stepper>
    </ThemeProvider>
  )
}
```
