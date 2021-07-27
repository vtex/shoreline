---
path: /typography/text/
---

# Text

By default `<Text>` renders a `<span>` or a specific text element, like `<i>`, `<kbd>`, `<strong>`, etc. You can apply all `TextVariants` using the `variant` prop.

## Behavior

```jsx
<Text variant="headline">Here goes your text!</Text>
```

## Installation

```sh isStatic
yarn add @vtex/admin-ui
```

```jsx isStatic
import { Text } from '@vtex/admin-ui'
```

## Variation

### Small

```jsx isStatic
lineHeight: 'small', // 1.125
fontVariationSettings: 'regular', // "'wght' 92"
fontSize: 0, // 0.75rem
```

```jsx
<Text variant="small">Here goes your text!</Text>
```

### Body

```jsx isStatic
lineHeight: 'body', // 1.25
fontVariationSettings: 'regular', // "'wght' 92"
fontSize: 1, // 0.875rem
```

```jsx
<Text variant="body">Here goes your text!</Text>
```

### Highlight

```jsx isStatic
lineHeight: 'highlight', // 1.25
fontVariationSettings: 'regular', // "'wght' 92"
fontSize: 1, // 0.875rem
```

```jsx
<Text variant="highlight">Here goes your text!</Text>
```

### Action

```jsx isStatic
lineHeight: 'action', // 1.5
fontVariationSettings: 'regular', // "'wght' 92"
fontSize: 1, // 0.875rem
textTransform: 'uppercase',
```

```jsx
<Text variant="action">Here goes your text!</Text>
```

### Subtitle

```jsx isStatic
lineHeight: 'subtitle', // 1.5
fontVariationSettings: 'regular', // "'wght' 92"
fontSize: 2, // 1rem
```

```jsx
<Text variant="subtitle">Here goes your text!</Text>
```

### Headline

```jsx isStatic
lineHeight: 'headline', // 1.5
fontVariationSettings: 'regular', // "'wght' 92"
fontSize: 4, // 1.25rem
```

```jsx
<Text variant="headline">Here goes your text!</Text>
```

### Feedback

Feedback that the text should pass.

```jsx
<Box
  csx={{
    '> *': {
      display: 'block',
    },
  }}
>
  <Text>Default text</Text>
  <Text feedback="secondary">Secondary text</Text>
  <Text feedback="primary">Primary text</Text>
  <Text feedback="danger">Danger text</Text>
  <Text feedback="warning">Warning text</Text>
  <Text feedback="success">Success text</Text>
</Box>
```

## Customization

You can use the `csx` property to handle different styles.

### Example

```jsx
<Text csx={{ color: 'blue.hover' }} variant="body" element="span">
  Look, a text with 'blue.hover' color... 🤔
</Text>
```

## Props

| Name     | Type               | Description                             | Required | Default    |
| -------- | ------------------ | --------------------------------------- | -------- | ---------- |
| element  | `TextElementType`  | Element to render                       | 🚫       | `'span'`   |
| variant  | `TextVariantType`  | Text variant. Consumes the text pattern | 🚫       | `body`     |
| feedback | `TextFeedbackType` | Text feedback                           | 🚫       | ` default` |
| id       | `string`           | HTML id                                 | 🚫       | -          |
| children | `ReactNode`        | Text children                           | 🚫       | -          |
| csx      | `StyleProp`        | Defines component styles                | 🚫       | `{}`       |
