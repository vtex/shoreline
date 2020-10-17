---
path: /docs/unstable-button/
---

# Unstable Button

Accessible button component

## Installation

```sh
yarn add @vtex/admin-ui
```

Learn more in [Get started](/docs/get-started/).

## Usage

```jsx
import { ThemeProvider, Button } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Button>Button</Button>
    </ThemeProvider>
  )
}
```

## Migration Guide

This section is designated for users coming from [Styleguide v9](https://styleguide.vtex.com/)

### Button Style

- `variation` -> Refer to the structure of the button and how it will behave on the states of hover, pressed, and focused.
- `palette` -> Refer to the color palette of the button (Primary and Danger palettes)
- `sx` -> It's used for styling, so if it's necessary to add or override some style, is possible to do this using this property.

### Variant and Palette

In the `styleguide v9`, we used `variation` to define the type and color of the button. Now we've separated it into two props `variant` and `palette`.

#### How we use

- `variation="primary"` -> `variant="filled" palette="primary"`
- `variation="secondary"` -> `variant="subtle" palette="primary"`
- `variation="tertiary"` -> `variant="text" palette="primary"`
- `variation="danger"` -> `variant="filled" palette="danger"`
- `variation="danger-tertiary"` -> `variant="text" palette="danger"`

### Button with Icon

To use a button with an icon before, we needed to import another component, but now we can have this behavior only using the main Button.

#### Example

- Icon and Label

```jsx
import { Button, IconFavorite, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Button icon={<IconFavorite />} iconPosition="start">
        Icon start
      </Button>
      <Button icon={<IconFavorite />} iconPosition="end">
        Icon end
      </Button>
    </ThemeProvider>
  )
}
```

- Only Icon

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

<proptypes component="unstableButton" />
