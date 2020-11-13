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

## Variation

### Text

```jsx
import { ThemeProvider, Button } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Button variant="tertiary">Admin UI Button Text</Button>
    </ThemeProvider>
  )
}
```

### Filled

```jsx
import { ThemeProvider, Button } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Button>Admin UI Button Filled</Button>
    </ThemeProvider>
  )
}
```

### Subtle

```jsx
import { ThemeProvider, Button } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Button variant="secondary">Admin UI Button Subtle</Button>
    </ThemeProvider>
  )
}
```

### Primary

```jsx
import { ThemeProvider, Button } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Button palette="primary">Admin UI Button Primary</Button>
    </ThemeProvider>
  )
}
```

### Danger

```jsx
import { ThemeProvider, Button } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Button palette="danger">Admin UI Button Danger</Button>
    </ThemeProvider>
  )
}
```

### Small

```jsx
import { ThemeProvider, Button } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Button size="small">Admin UI Button Small</Button>
    </ThemeProvider>
  )
}
```

### Regular

```jsx
import { ThemeProvider, Button } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Button size="regular">Admin UI Button Regular</Button>
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
