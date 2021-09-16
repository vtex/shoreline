---
path: /menu/
---

# Menu

Accessible dropdown Menu component that follows the [WAI-ARIA Menu](https://www.w3.org/TR/wai-aria-practices/#menu).

## Usage

```jsx isStatic
import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  useMenuState,
  MenuSeparator,
} from '@vtex/admin-ui'

function Example() {
  const state = useMenuState()

  return (
    <Menu state={state}>
      <MenuButton>Post options</MenuButton>
      <MenuList aria-label="actions" state={state}>
        <MenuItem icon={<IconImport />}>Download</MenuItem>
        <MenuItem icon={<IconLink />}>Link to</MenuItem>
        <MenuSeparator />
        <MenuItem icon={<IconFavorite />}>Favorite</MenuItem>
      </MenuList>
    </Menu>
  )
}
```

## Composition

| Name          | Description                                                        |
| ------------- | ------------------------------------------------------------------ |
| Menu          | Menu's wrapper                                                     |
| MenuButton    | Button that triggers the menu popover                              |
| MenuList      | Menu's popover                                                     |
| MenuItem      | Represents a button rendered inside the MenuList                   |
| MenuSeparator | Represents an `hr` used to separate the menu popover into sections |

## Examples

### Hide on click

Hide Menu's popover after a MenuItem is clicked.

```jsx
function Example() {
  const state = useMenuState()

  return (
    <Menu state={state} hideOnClick>
      <MenuButton>Post options</MenuButton>
      <MenuList aria-label="actions" state={state}>
        <MenuItem icon={<IconImport />}>Download</MenuItem>
        <MenuItem disabled icon={<IconLink />}>
          Link to
        </MenuItem>
        <MenuItem icon={<IconFavorite />}>Favorite</MenuItem>
      </MenuList>
    </Menu>
  )
}
```

### Action

Set the MenuButton icon by using the `display` property

```jsx
function Example() {
  const state = useMenuState()

  return (
    <Menu state={state} hideOnClick>
      <MenuButton display="actions" variant="adaptative-dark" />
      <MenuList aria-label="actions" state={state}>
        <MenuItem icon={<IconImport />}>Download</MenuItem>
        <MenuItem disabled icon={<IconLink />}>
          Link to
        </MenuItem>
        <MenuItem icon={<IconFavorite />}>Favorite</MenuItem>
      </MenuList>
    </Menu>
  )
}
```

### Placement

Set the position of Menu's popover

```jsx
function Example() {
  const state = useMenuState({ placement: 'right' })

  return (
    <Menu state={state} hideOnClick>
      <MenuButton display="actions" variant="adaptative-dark" />
      <MenuList aria-label="actions" state={state}>
        <MenuItem icon={<IconImport />}>Download</MenuItem>
        <MenuItem disabled icon={<IconLink />}>
          Link to
        </MenuItem>
        <MenuItem icon={<IconFavorite />}>Favorite</MenuItem>
      </MenuList>
    </Menu>
  )
}
```

### Initial Focus

Select a `MenuItem` to be focused when the popover is opened

```jsx
function Example() {
  const state = useMenuState()
  const ref = React.useRef()

  React.useEffect(() => {
    if (state.visible) {
      ref.current.focus()
    }
  }, [state.visible])

  return (
    <Menu state={state}>
      <MenuButton>Post options</MenuButton>
      <MenuList aria-label="actions" state={state}>
        <MenuItem icon={<IconImport />}>Download</MenuItem>
        <MenuItem ref={ref} icon={<IconLink />}>
          Link to
        </MenuItem>
        <MenuItem icon={<IconFavorite />}>Favorite</MenuItem>
      </MenuList>
    </Menu>
  )
}
```

### Accessibility

- You always must set the `aria-label` property in the `MenuList` component.

## Props

### Menu

| Name        | Type              | Description                                                    | Required | Default |
| ----------- | ----------------- | -------------------------------------------------------------- | -------- | ------- |
| state       | `MenuStateReturn` | useMenuState hook return                                       | ✅       | -       |
| children    | `ReactNode`       | Menu's composites                                              | 🚫       | -       |
| hideOnClick | `boolean`         | Whether the Menu popup should hide after a MenuItem is clicked | 🚫       | `false` |

### MenuButton

All props of admin-ui's `Button` component.

| Name    | Type     | Description | Required                                               | Default |
| ------- | -------- | ----------- | ------------------------------------------------------ | ------- | ------ |
| display | `actions | menu'`      | Display dots icon if is actions and caret down if menu | 🚫      | `menu` |

### MenuList

All props of `div` jsx element.

| Name               | Type      | Description                                                          | Required | Default |
| ------------------ | --------- | -------------------------------------------------------------------- | -------- | ------- |
| hideOnClickOutside | `boolean` | Whether the Menu popup should hide after a click outside the popover | 🚫       | `true`  |

### MenuItem

All props of `button` jsx element.

### Separator

All props of `hr` jsx element.

### useMenuState

| Name      | Type      | Description                                                    | Required   | Default |
| --------- | --------- | -------------------------------------------------------------- | ---------- | ------- | ----------- | --------- | ---- | -------------- | --------------------- | --- | -------- |
| loop      | `boolean` | loops from the last item to the first item and vice-versa.     | 🚫         | `false` |
| visible   | `boolean` | Whether is visible or not                                      | 🚫         | `false` |
| placement | `bottom   | bottom-start                                                   | bottom-end | right   | right-start | right-end | auto | auto-start...` | Menu popover position | 🚫  | `bottom` |
| baseId    | `string`  | ID that will serve as a base for all the items IDs.            | 🚫         | -       |
| gutter    | `number`  | Offset between the reference and the popover on the main axis. | 🚫         | `4`     |
