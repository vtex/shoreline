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

#### Small

```jsx isStatic
lineHeight: 'small', // 1.125
fontSettings: 'regular', // "'WGHT' 500"
fontSize: 0, // 0.75rem
```

```jsx live
<Text variant="small">Here goes your text!</Text>
```

#### Body

```jsx isStatic
lineHeight: 'body', // 1.25
fontSettings: 'regular', // "'WGHT' 500"
fontSize: 1, // 0.875rem
```

```jsx live
<Text variant="body">Here goes your text!</Text>
```

#### Highlight

```jsx isStatic
lineHeight: 'highlight', // 1.25
fontSettings: 'regular', // "'WGHT' 500"
fontSize: 1, // 0.875rem
```

```jsx live
<Text variant="highlight">Here goes your text!</Text>
```

#### Action

```jsx isStatic
lineHeight: 'action', // 1.5
fontSettings: 'regular', // "'WGHT' 500"
fontSize: 1, // 0.875rem
textTransform: 'uppercase',
```

```jsx live
<Text variant="action">Here goes your text!</Text>
```

#### Subtitle

```jsx isStatic
lineHeight: 'subtitle', // 1.5
fontSettings: 'regular', // "'WGHT' 500"
fontSize: 2, // 1rem
```

```jsx live
<Text variant="subtitle">Here goes your text!</Text>
```

#### Headline

```jsx isStatic
lineHeight: 'headline', // 1.5
fontSettings: 'regular', // "'WGHT' 500"
fontSize: 4, // 1.25rem
```

```jsx live
<Text variant="headline">Here goes your text!</Text>
```

## Props

All props of `span` jsx element.

| Name     | Type               | Description                             | Required | Default    |
| -------- | ------------------ | --------------------------------------- | -------- | ---------- |
| as       | `TextElementType`  | Element to render                       | 🚫       | `'span'`   |
| variant  | `TextVariantType`  | Text variant. Consumes the text pattern | 🚫       | `body`     |
| feedback | `TextFeedbackType` | Text feedback                           | 🚫       | ` default` |
