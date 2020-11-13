---
path: /menu/
---

# Menu

Accessible dropdown Menu component that follows the [WAI-ARIA Menu](https://www.w3.org/TR/wai-aria-practices/#menu).

## Behavior

```jsx
import { ThemeProvider, Button, Menu } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Menu aria-label="menu label" disclosure={<Button>Actions</Button>}>
        <Menu.Item>Download</Menu.Item>
        <Menu.Item>Link to</Menu.Item>
        <Menu.Item>Favorite</Menu.Item>
      </Menu>
    </ThemeProvider>
  )
}
```

## Installation

```static
yarn add @vtex/admin-ui
```

```jsx static
import { Menu } from '@vtex/admin-ui'
```

Learn more in [Get started](/docs/get-started/).

## Variation

## State

### Stateful

Handles the state internally.

```jsx
import {
  Menu,
  IconDownload,
  IconLink,
  IconFavorite,
  IconDelete,
  ThemeProvider,
  Button,
  Box,
} from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Menu
        hideOnClick
        aria-label="menu label"
        disclosure={<Button>Actions</Button>}
      >
        <Menu.Item icon={<IconDownload />}>Download</Menu.Item>
        <Menu.Item icon={<IconLink />}>Link to</Menu.Item>
        <Menu.Item icon={<IconFavorite />}>Favorite</Menu.Item>
        <Menu.Item icon={<IconDelete />}>Delete</Menu.Item>
      </Menu>
    </ThemeProvider>
  )
}
```

#### 🚫 Dont

- Use when you need to change menu states programmatically.

#### Props

<propdetails heading="Menu Props" component="Menu">
</propdetails>

### Stateless

Accepts states handled by the `useMenuState` hook within the `state` prop.

```jsx
import {
  ThemeProvider,
  useMenuState,
  StatelessMenu,
  MenuDisclosure,
  Button,
  IconDownload,
  IconLink,
  IconFavorite,
} from '@vtex/admin-ui'

function Example() {
  const state = useMenuState({
    orientation: 'vertical',
    loop: true,
    placement: 'bottom-start',
  })

  return (
    <ThemeProvider>
      <MenuDisclosure state={state}>
        <Button>Post options</Button>
      </MenuDisclosure>
      <StatelessMenu aria-label="actions" state={state}>
        <StatelessMenu.Item icon={<IconDownload />}>
          Download
        </StatelessMenu.Item>
        <StatelessMenu.Item icon={<IconLink />}>Link to</StatelessMenu.Item>
        <StatelessMenu.Item icon={<IconFavorite />}>
          Favorite
        </StatelessMenu.Item>
      </StatelessMenu>
    </ThemeProvider>
  )
}
```

#### useMenuState

Hook used to keep state. It has the same props of [Reakit/useMenuState](https://reakit.io/docs/menu/#usemenustate).

#### ✅ Do's

- Use when you need to change menu states programmatically
- Use together with `MenuDisclosure` for user-based state changes.

#### 🚫 Dont's

- Use it to handle a simple/contained menu, stateful is a solution.

#### Props

<propdetails heading="StatelessMenu Props" component="StatelessMenu">
</propdetails>

## Composites

### MenuItem

```jsx
import { Menu, IconFavorite, ThemeProvider, Button } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Menu
        hideOnClick
        aria-label="menu label"
        disclosure={<Button>Actions</Button>}
      >
        <Menu.Item>Link to</Menu.Item>
        <Menu.Item icon={<IconFavorite />}>Favorite</Menu.Item>
      </Menu>
    </ThemeProvider>
  )
}
```

#### Props

<propdetails heading="MenuItem Props" component="Button">
</propdetails>

### MenuSeparator

Represents an `hr` used to separate the menu into sections

```jsx
import {
  Menu,
  IconDownload,
  IconLink,
  IconFavorite,
  IconDelete,
  IconArrow,
  ThemeProvider,
  Button,
} from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Menu
        hideOnClick
        aria-label="menu label"
        disclosure={<Button>Actions</Button>}
      >
        <Menu.Item icon={<IconLink />}>Link to</Menu.Item>
        <Menu.Item icon={<IconFavorite />}>Favorite</Menu.Item>
        <Menu.Separator />
        <Menu.Item icon={<IconDownload />}>Download</Menu.Item>
        <Menu.Item icon={<IconArrow direction="up" />}>Upload</Menu.Item>
        <Menu.Separator />
        <Menu.Item icon={<IconDelete />}>Delete</Menu.Item>
      </Menu>
    </ThemeProvider>
  )
}
```
