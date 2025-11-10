import { Menu, MenuItem, MenuSeparator, Stack, Text } from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack horizontal>
      <div>
        <Text variant="caption1">Primary</Text>
        <Menu label="Open" variant="primary">
          <MenuItem>New Tab</MenuItem>
          <MenuItem>New Item</MenuItem>
          <MenuSeparator />
          <MenuItem>Downloads</MenuItem>
        </Menu>
      </div>

      <div>
        <Text variant="caption1">Secondary</Text>
        <Menu label="Open" variant="secondary">
          <MenuItem>New Tab</MenuItem>
          <MenuItem>New Item</MenuItem>
          <MenuSeparator />
          <MenuItem>Downloads</MenuItem>
        </Menu>
      </div>

      <div>
        <Text variant="caption1">Tertiary</Text>
        <Menu label="Open" variant="tertiary">
          <MenuItem>New Tab</MenuItem>
          <MenuItem>New Item</MenuItem>
          <MenuSeparator />
          <MenuItem>Downloads</MenuItem>
        </Menu>
      </div>
    </Stack>
  )
}
