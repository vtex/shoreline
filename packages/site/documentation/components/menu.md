---
path: /menu/
---

# Menu

Accessible dropdown Menu component that follows the [WAI-ARIA Menu](https://www.w3.org/TR/wai-aria-practices/#menu).

## Behavior

```jsx
function Example() {
  const state = useMenuState()

  return (
    <Menu state={state}>
      <MenuButton>Post options</MenuButton>
      <MenuList aria-label="actions" state={state}>
        <MenuItem icon={<IconImport />}>Download</MenuItem>
        <MenuItem icon={<IconLink />}>Link to</MenuItem>
        <MenuItem icon={<IconFavorite />}>Favorite</MenuItem>
      </MenuList>
    </Menu>
  )
}
```

## Installation

```sh isStatic
yarn add @vtex/admin-ui
```

```jsx isStatic
import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  useMenuState,
  MenuSeparator,
} from '@vtex/admin-ui'
```

Learn more in [Get started](/docs/get-started/).

## Variation

### Hide on click

```jsx
function Example() {
  const state = useMenuState({
    orientation: 'vertical',
    loop: true,
    placement: 'bottom-start',
  })

  return (
    <Menu>
      <MenuButton state={state}>
        <Button>Post options</Button>
      </MenuButton>
      <MenuList aria-label="actions" state={state}>
        <MenuItem icon={<IconImport />}>Download</MenuItem>
        <MenuItem icon={<IconLink />}>Link to</MenuItem>
        <MenuItem icon={<IconFavorite />}>Favorite</MenuItem>
      </MenuList>
    </Menu>
  )
}
```

### useMenuState

Hook used to keep state. It has the same props of [Reakit/useMenuState](https://reakit.io/docs/menu/#usemenustate).

## Composites

### MenuItem

```jsx
function Example() {
  const state = useMenuState()

  return (
    <Menu state={state}>
      <MenuButton>Actions</MenuButton>
      <MenuList aria-label="actions" state={state}>
        <MenuItem>Link to</MenuItem>
        <MenuItem icon={<IconFavorite />}>Favorite</MenuItem>
      </MenuList>
    </Menu>
  )
}
```

### MenuSeparator

Represents an `hr` used to separate the menu into sections

```jsx
function Example() {
  const state = useMenuState()

  return (
    <Menu state={state} hideOnClick>
      <MenuButton>Actions</MenuButton>
      <MenuList aria-label="actions" state={state}>
        <MenuItem icon={<IconLink />}>Link to</MenuItem>
        <MenuItem icon={<IconFavorite />}>Favorite</MenuItem>
        <MenuSeparator />
        <MenuItem icon={<IconImport />}>Download</MenuItem>
        <MenuItem icon={<IconArrow direction="up" />}>Upload</MenuItem>
        <MenuSeparator />
        <MenuItem icon={<IconDelete />}>Delete</MenuItem>
      </MenuList>
    </Menu>
  )
}
```

## Props

### Menu

| Name        | Type              | Description                                      | Required | Default |
| ----------- | ----------------- | ------------------------------------------------ | -------- | ------- |
| state       | `MenuStateReturn` | useMenuState hook return                         | ✅       | -       |
| children    | `ReactNode`       | Menu's composites                                | 🚫       | -       |
| hideOnClick | `boolean`         | Whether the Menu popup should hide after clicked | 🚫       | false   |

### MenuButton

All props of admin-ui's `Button` component.

| Name    | Type     | Description | Required                                               | Default |
| ------- | -------- | ----------- | ------------------------------------------------------ | ------- | ---- |
| display | `actions | menu'`      | Display dots icon if is actions and caret down if menu | 🚫      | menu |

### MenuList

All props of `div` jsx element.

### MenuItem

All props of `button` jsx element.

### Separator

All props of `hr` jsx element.
