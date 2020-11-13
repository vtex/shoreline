---
path: /theming/colors/
---

# Colors

Our styleguide provides an accessible default palette to get you up and running.

## Complete color set

### Backgrounds

<backgroundcolors></backgroundcolors>

### Text

<textcolors></textcolors>

### Complementary

<complementarycolors></complementarycolors>

### Primary

<semanticcolor color="primary"></semanticcolor>

### Secondary

<semanticcolor color="secondary"></semanticcolor>

### Danger

<semanticcolor color="danger"></semanticcolor>

#### Washed

<semanticcolor color="danger.washed"></semanticcolor>

### Warning

<semanticcolor color="warning"></semanticcolor>

#### Washed

<semanticcolor color="warning.washed"></semanticcolor>

### Success

<semanticcolor color="success"></semanticcolor>

#### Washed

<semanticcolor color="success.washed"></semanticcolor>

## Accessing color

### StyleObject

#### Example

```jsx
import { cn } from '@vtex/admin-ui'

function Example() {
  return (
    <div
      className={cn({
        size: 96,
        bg: 'primary.base',
      })}
    />
  )
}
```
