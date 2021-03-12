---
path: /visually-hidden/
---

# VisuallyHidden

VisuallyHidden is a common technique used in web accessibility to hide content from the visual client, but keep it readable for screen readers.

## Behavior

```jsx
<Box csx={{ display: 'flex', flexDirection: 'column', width: 200 }}>
  <VisuallyHidden>
    <label htmlFor="search">Hidden Label</label>
  </VisuallyHidden>
  <input id="search" type="search" placeholder="A11y Search Input" />
  <Text variant="small" csx={{ alignSelf: 'flex-end', marginTop: 3 }}>
    Use this input to search things
  </Text>
</Box>
```

## Installation

```sh isStatic
yarn add @vtex/admin-ui
```

```jsx isStatic
import { VisuallyHidden } from '@vtex/admin-ui'
```

## Props

<proptypes heading="VisuallyHidden" component="VisuallyHidden">
