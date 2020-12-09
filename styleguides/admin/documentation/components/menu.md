---
path: /menu/
---

# Menu

Accessible dropdown Menu component that follows the [WAI-ARIA Menu](https://www.w3.org/TR/wai-aria-practices/#menu).

## Behavior

```jsx
<Menu aria-label="menu label" disclosure={<Button>Actions</Button>}>
  <Menu.Item>Download</Menu.Item>
  <Menu.Item>Link to</Menu.Item>
  <Menu.Item>Favorite</Menu.Item>
</Menu>
```

## Installation

```sh isStatic
yarn add @vtex/admin-ui
```

```jsx isStatic
import { Menu } from '@vtex/admin-ui'
```

Learn more in [Get started](/docs/get-started/).

## Variation

## State

### Stateful

Handles the state internally.

```jsx
<Menu hideOnClick aria-label="menu label" disclosure={<Button>Actions</Button>}>
  <Menu.Item icon={<IconImport />}>Download</Menu.Item>
  <Menu.Item icon={<IconLink />}>Link to</Menu.Item>
  <Menu.Item icon={<IconFavorite />}>Favorite</Menu.Item>
  <Menu.Item icon={<IconDelete />}>Delete</Menu.Item>
</Menu>
```

#### 🚫 Dont

- Use when you need to change menu states programmatically.

#### Props

<propdetails heading="Menu Props" component="Menu">
</propdetails>

### Stateless

Accepts states handled by the `useMenuState` hook within the `state` prop.

```jsx
function Example() {
  const state = useMenuState({
    orientation: 'vertical',
    loop: true,
    placement: 'bottom-start',
  })

  return (
    <>
      <MenuDisclosure state={state}>
        <Button>Post options</Button>
      </MenuDisclosure>
      <StatelessMenu aria-label="actions" state={state}>
        <StatelessMenu.Item icon={<IconImport />}>Download</StatelessMenu.Item>
        <StatelessMenu.Item icon={<IconLink />}>Link to</StatelessMenu.Item>
        <StatelessMenu.Item icon={<IconFavorite />}>
          Favorite
        </StatelessMenu.Item>
      </StatelessMenu>
    </>
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
<Menu hideOnClick aria-label="menu label" disclosure={<Button>Actions</Button>}>
  <Menu.Item>Link to</Menu.Item>
  <Menu.Item icon={<IconFavorite />}>Favorite</Menu.Item>
</Menu>
```

#### Props

<propdetails heading="MenuItem Props" component="Button">
</propdetails>

### MenuSeparator

Represents an `hr` used to separate the menu into sections

```jsx
<Menu hideOnClick aria-label="menu label" disclosure={<Button>Actions</Button>}>
  <Menu.Item icon={<IconLink />}>Link to</Menu.Item>
  <Menu.Item icon={<IconFavorite />}>Favorite</Menu.Item>
  <Menu.Separator />
  <Menu.Item icon={<IconImport />}>Download</Menu.Item>
  <Menu.Item icon={<IconArrow direction="up" />}>Upload</Menu.Item>
  <Menu.Separator />
  <Menu.Item icon={<IconDelete />}>Delete</Menu.Item>
</Menu>
```
