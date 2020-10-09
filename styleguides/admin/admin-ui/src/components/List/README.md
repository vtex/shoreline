---
path: /docs/list/
redirect_from:
  - /components/box/
  - /components/block/
  - /components/flex/
  - /components/grid/
  - /components/inline/
  - /components/inlineblock/
  - /components/inlineflex/
  - /components/avatar/
  - /components/blockquote/
  - /components/card/
  - /components/card/cardfit/
  - /components/code/
  - /components/heading/
  - /components/image/
  - /components/link/
  - /components/list/
  - /components/navigation/
  - /components/table/
  - /components/table/tablewrapper/
---

# List

Component to display consistently, in sequence, items that contain the same kind of data.

## Installation

```sh
yarn add @vtex/admin-ui
```

Learn more in [Get started](/docs/get-started/).

## Usage

```jsx
import { ThemeProvider, List, Text, Toggle } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <List
        sx={{ div: { justifyContent: 'space-between' } }}
        density="compact"
        label="General"
      >
        <List.Item>
          <Text>Default markup for external integration</Text>
          <Text c="muted.1">100%</Text>
        </List.Item>
        <List.Item>
          <Text>Use price variation limit</Text>
          <Toggle state />
        </List.Item>
        <List.Item>
          <Text>Inherit prices from parent account</Text>
          <Toggle state />
        </List.Item>
        <List.Item>
          <Text>Overwrite seller prices</Text>
          <Toggle state />
        </List.Item>
      </List>
    </ThemeProvider>
  )
}
```
