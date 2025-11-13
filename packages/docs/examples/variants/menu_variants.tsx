import { Menu, MenuItem } from '@vtex/shoreline'

export function PrimaryMenu() {
  return (
    <Menu label="Primary Menu" variant="primary">
      <MenuItem>Menu Item 1</MenuItem>
      <MenuItem>Menu Item 2</MenuItem>
      <MenuItem>Menu Item 3</MenuItem>
    </Menu>
  )
}

export function SecondaryMenu() {
  return (
    <Menu label="Secondary Menu" variant="secondary">
      <MenuItem>Menu Item 1</MenuItem>
      <MenuItem>Menu Item 2</MenuItem>
      <MenuItem>Menu Item 3</MenuItem>
    </Menu>
  )
}

export function TertiaryMenu() {
  return (
    <Menu label="Tertiary Menu" variant="tertiary">
      <MenuItem>Menu Item 1</MenuItem>
      <MenuItem>Menu Item 2</MenuItem>
      <MenuItem>Menu Item 3</MenuItem>
    </Menu>
  )
}
