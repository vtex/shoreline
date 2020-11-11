# RFC Template <REPLACE_WITH_TITLE>

- 📅 Start Date: 2020-11-04
- 🏆 Champions: @mayza

# Summary

- Stepper Component

# Basic example [optional]

```tsx
import { Stepper } from @vtex/admin-ui

let valueNumber = 01
const minValue = 0
const maxValue = 10

//Regular Variation
<Stepper variant="regular" value={valueNumber} minValue maxValue onChange={event => setState({ valueNumber: event.value })}/>

//Hover Variation
<Stepper variant="hover" value={valueNumber} minValue maxValue onChange={event => setState({ valueNumber: event.value })}/>

//Focus Variation
<Stepper variant="focus" value={valueNumber} minValue maxValue onChange={event => setState({ valueNumber: event.value })}/>

//Error Variation
<Stepper variant="error" errorMessage="Minimum of 10" value={valueNumber} minValue maxValue onChange={event => setState({ valueNumber: event.value })}/>

// Disabled Stepper
<Stepper variant="regular" disabled value="01" minValue maxValue onChange={event => setState({ valueNumber: event.value })}/>

```

# Detailed design

- Default props:
  `variant: Regular`
  `minValue: 0`

- Required props:
  `value and onChange`

# Unresolved questions [optional]

- `onChange` is necessary? I think that is every time the same function.
- It is not clear for me when the `error variation` occurs
