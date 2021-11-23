# Migrating from 0.114.x

This document list the new features and breaking changes that you need to be aware while updating from `0.114.x` versions to `0.115.x` and above.

## 🚀 Features

### Center component

Center is a layout component that centers its child within itself. [Documentation](https://admin-ui-doc.vercel.app/center/)

## 🚨 Breaking Changes

### Colors

Now the colors used on the design system have semantic this means that you won’t just apply the required color to your component, but you'll apply the semantic token that refers to your usage.

You can find all tokens available on [this page](https://admin-ui-docs.vercel.app/guidelines/design-tokens)

Check this example of the “old” primary button implementation:

**Before**

```jsx
<tag.button
  csx={{
    color: 'light.primary',
    bg: 'blue',
    ':hover': {
      bg: 'blue.hover',
      color: 'light.primary',
    },
    ':active': {
      bg: 'blue.pressed',
      color: 'light.primary',
    },
  }}
>
  Label
</tag.button>
```

**After**

```jsx
<tag.button
  csx={{
    color: 'action.main',
    bg: 'action.main',
    ':hover': {
      bg: 'action.mainHover',
      color: 'action.mainHover',
    },
    ':active': {
      bg: 'action.mainPressed',
      color: 'action.mainPressed',
    },
  }}
>
  Label
</tag.button>
```

### Alert

The `type` property changed to `tone`

**Before**

- type -> `info`, `warning`, `success`, `error`

```jsx
<Alert type="info" visible />
<Alert type="success" visible />
<Alert type="warning" visible />
<Alert type="error" visible />
```

**After**

- tone -> `info`, `warning`, `positive`, `critical`

```jsx
<Alert tone="info" visible />
<Alert tone="positive" visible />
<Alert tone="warning" visible />
<Alert tone="critical" visible />
```

### Avatar

The palette property changed its values

**Before**

- palette -> `base`, `primary`, `warning`

```jsx
<Avatar label="base" />
<Avatar label="primary" palette="primary" />
<Avatar label="danger" palette="danger" />
```

**After**

- palette -> `lightBlue`, `green`, `orange`, `cyan`, `purple`, `teal`, `grey`

```jsx
<Avatar label="lightBlue" />
<Avatar label="green" palette="green" />
<Avatar label="orange" palette="orange" />
<Avatar label="cyan" palette="cyan" />
<Avatar label="purple" palette="purple" />
<Avatar label="teal" palette="teal" />
<Avatar label="grey" palette="grey" />
```

### Button

We split the `variant` prop into two properties: `variant` and `tone`, and we also changed its values.

We removed the `adaptative` variants, now you must use the `ButtonGhost` component.

> Note: the first button specified on “after” represents the first button on “before”, and so on.

**Before**

```jsx
<Button variant="primary" />
<Button variant="secondary" />
<Button variant="tertiary" />
<Button variant="danger" />
<Button variant="danger-secondary" />
<Button variant="danger-tertiary" />
<Button variant="adaptative-dark" />
<Button variant="adaptative-light" />
```

**After**

```jsx
<Button variant="solid" tone="main" />
<Button variant="soft" tone="main" />
<Button variant="text" tone="main" />
<Button variant="solid" tone="critical" />
<Button variant="soft" tone="critical" />
<Button variant="text" tone="critical" />
<ButtonGhost />
// adaptative-light no longer exist
```

### Input & InputPassword & TextArea & Select & NumericStepper

The way of handling errors on the Fields has changed. Now you must use a combination of the `tone` and `criticalText` properties, instead of `error` and `errorMessage`

**Before**

```jsx
<Input
  label="Label"
  charLimit={120}
  helperText="Helper Text!"
  errorMessage="Error message!"
/>
// Input with some error
<Input
  label="Label"
  charLimit={120}
  helperText="Helper Text!"
  errorMessage="Error message!"
  error
/>
```

**After**

```jsx
<Input
  label="Label"
  charLimit={120}
  helperText="Helper Text!"
  tone="neutral"
  criticalText="Critical message!"
/>
// Input with some error
<Input
  label="Label"
  charLimit={120}
  helperText="Helper Text!"
  tone="critical"
  criticalText="Critical message!"
/>
```

### Spinner

The color property is no longer used. Now the Spinner has the color set as `currentColor` and the color is changed based on the context that the spinner is.

**Before**

```jsx
<Spinner />
<Spinner color="red" />
<Spinner color="green" />
<Spinner color="yellow" />
```

**After**

```jsx
<Spinner />
```

### Tag

It changed the `palette` property values.

**Before**

- palette -> `blue`, `red`, `yellow`, `green`, `gray`, `purple`

```jsx
<Tag palette="blue" />
<Tag palette="red" />
<Tag palette="yellow" />
<Tag palette="green" />
<Tag palette="gray" />
<Tag palette="purple" />
```

**After**

- palette -> `lightBlue`, `red`, `orange`, `green`, `gray`, `purple`, `cyan`, `teal`

```jsx
<Tag palette="lightBlue" />
<Tag palette="red" />
<Tag palette="orange" />
<Tag palette="green" />
<Tag palette="cyan" />
<Tag palette="teal" />
<Tag palette="purple" />
```

### Text

The `feedback` property was replaced by `tone` and its values have changed too.

**Before**

```jsx
<Text feedback="secondary">Secondary text</Text>
<Text feedback="primary">Primary text</Text>
<Text feedback="danger">Danger text</Text>
<Text feedback="warning">Warning text</Text>
<Text feedback="success">Success text</Text>
```

**After**

```jsx
<Text tone="neutral">Neutral text</Text>
<Text tone="muted">Muted text</Text>
<Text tone="info">Info text</Text>
<Text tone="positive">Positive text</Text>
<Text tone="critical">Critical text</Text>
<Text tone="warning">Warning text</Text>
```

### Toast

The `type` property was replaced by `tone` and its values have changed too.
**Before**

- type -> `success`, `info`, `warning`, `error`

```jsx
<Button
  onClick={showToast({
    type: 'success', // 'info', 'warning', 'error'
    message: 'Type a short message here',
    action: {
      label: 'Action',
      onClick: () => alert('Toast callback'),
    },
  })}
>
  Show Toast
</Button>
```

**After**

- tone -> `positive`, `info`, `warning`, `critical`

```jsx
<Button
  onClick={showToast({
    tone: 'positive', // 'info', 'warning', 'critical'
    message: 'Type a short message here',
    action: {
      label: 'Action',
      onClick: () => alert('Toast callback'),
    },
  })}
>
  Show Toast
</Button>
```
