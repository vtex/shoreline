---
path: /data-display/visually-hidden/
---

# VisuallyHidden

VisuallyHidden is a common technique used in web accessibility to hide content from the visual client, but keep it readable for screen readers.

## Import

```jsx isStatic
import { VisuallyHidden } from '@vtex/admin-ui'
```

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

## Props

| Name     | Type        | Description             | Required | Default |
| -------- | ----------- | ----------------------- | -------- | ------- |
| children | `ReactNode` | VisuallyHidden children |
