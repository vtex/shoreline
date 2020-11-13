---
path: /button/
---

# Button

Component that handles all Button variants of the DS. It renders a button jsx element by default.

## Behavior

```jsx
import { ThemeProvider, Button } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Button>Admin UI Button</Button>
    </ThemeProvider>
  )
}
```

## Installation

```static
yarn add @vtex/admin-ui
```

```jsx static
import { Button } from '@vtex/admin-ui'
```

Learn more in [Get started](/docs/get-started/).

## Variants

### Primary

This option should be used for the most important action of the page.

#### ✅ Do's:

- Use this on topbars and confirmation modals.
- Use it only once per page / modal.

#### 🚫 Dont's:

- Avoid using more than 2 words.
- Buttons should be in all caps.
- Prefer imperative verbs.
- No punctuation.

#### Example

```jsx
import { ThemeProvider, Button, Set } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Set orientation="vertical">
        <Button variant="primary">Primary Action</Button>
        <Button variant="danger">Dangerous Primary Action</Button>
      </Set>
    </ThemeProvider>
  )
}
```

### Secondary

This option should be used for optional actions.

#### ✅ Do's:

- Use this option for topbars, tables, lists and forms.
- Non-urgent actions

#### 🚫 Dont's:

- Avoid using more than 2 words.
- Buttons should be in all caps.
- Prefer imperative verbs.
- No punctuation.

#### Example

```jsx
import { ThemeProvider, Button, Set } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Set orientation="vertical">
        <Button variant="secondary">Secondary Action</Button>
        <Button variant="danger-secondary">Dangerous Secondary Action</Button>
      </Set>
    </ThemeProvider>
  )
}
```

### Tertiary

This option should be used for optional/tertiary actions.

#### ✅ Do's:

- Non-urgent, teritiary actions

#### 🚫 Dont's:

- Avoid using more than 3 words.
- Sentence case.
- Prefer imperative verbs.
- No punctuation.

```jsx
import { ThemeProvider, Button, Set } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Set orientation="vertical">
        <Button variant="tertiary">Tertiary Action</Button>
        <Button variant="danger-tertiary">Dangerous Tertiary Action</Button>
      </Set>
    </ThemeProvider>
  )
}
```

### Sizes

```jsx
import { ThemeProvider, Button, Set } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Set orientation="vertical">
        <Button size="regular">Regular Button</Button>
        <Button size="small">Small Button</Button>
      </Set>
    </ThemeProvider>
  )
}
```

### Button with Icon

To use a button with an icon before, we needed to import another component, but now we can have this behavior only using the main Button.

#### Icon and Label

```jsx
import { Button, IconFavorite, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Button icon={<IconFavorite />} iconPosition="start" mr="20px">
        Icon start
      </Button>
      <Button icon={<IconFavorite />} iconPosition="end">
        Icon end
      </Button>
    </ThemeProvider>
  )
}
```

#### Only Icon

```jsx
import { Button, IconFavorite, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Button icon={<IconFavorite title="Favorite" />} />
    </ThemeProvider>
  )
}
```

## Props

<proptypes heading="Button" component="Button" />
