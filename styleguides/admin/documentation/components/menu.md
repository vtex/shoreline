---
path: /docs/menu/
next: true
---

# Menu

## Usage

```jsx
import {
  Menu,
  IconDownload,
  IconLink,
  IconFavorite,
  IconDelete,
  ThemeProvider,
  ActionButton,
  Box,
} from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Menu
        hideOnClick
        aria-label="menu label"
        disclosure={<ActionButton display="menu" />}
      >
        <Menu.Item icon={<IconDownload />}>Download</Menu.Item>
        <Menu.Item icon={<IconLink />}>Link to</Menu.Item>
        <Menu.Item icon={<IconFavorite />}>Favorite</Menu.Item>
        <Menu.Separator />
        <Menu.Item icon={<IconDelete />}>Delete</Menu.Item>
      </Menu>
    </ThemeProvider>
  )
}
```
