---
title: Text
path: /text/
---

# Text

By default `<Text>` renders a `<span>` or a specific text element, like `<i>`, `<kbd>`, `<strong>`, etc. You can apply all `TextVariants` using the `variant` prop.

## Usage

```jsx isStatic
import { Text } from '@vtex/admin-ui'

function Example() {
  return <Text variant="headline">Headline</Text>
}
```

## Examples

### Tone of voice

Text tone of voice

```jsx live
<Box
  csx={{
    '> *': {
      display: 'block',
    },
  }}
>
  <Text tone="primary">Default text</Text>
  <Text tone="secondary">Muted text</Text>
  <Text tone="info">Info text</Text>
  <Text tone="critical">Critical text</Text>
  <Text tone="warning">Warning text</Text>
  <Text tone="positive">Positive text</Text>
</Box>
```

### Variant

```jsx live
<Box
  csx={{
    '> *': {
      display: 'block',
    },
  }}
>
  <Text variant="pageTitle">PageTitle</Text>
  <Text variant="title1">Title 1</Text>
  <Text variant="title2">Title 2</Text>
  <Text variant="action1">Action 1</Text>
  <Text variant="action2">Action 2</Text>
  <Text variant="display">Display</Text>
  <Text variant="body">Body</Text>
  <Text variant="detail">Detail</Text>
</Box>
```

## Props

All props of `span` jsx element.

| Name     | Type               | Description                             | Required | Default    |
| -------- | ------------------ | --------------------------------------- | -------- | ---------- |
| as       | `TextElementType`  | Element to render                       | 🚫       | `'span'`   |
| variant  | `TextVariantType`  | Text variant. Consumes the text pattern | 🚫       | `body`     |
| feedback | `TextFeedbackType` | Text feedback                           | 🚫       | ` default` |
