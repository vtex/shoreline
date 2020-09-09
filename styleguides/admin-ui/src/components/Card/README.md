# Admin UI Card

Used to group various pieces of content into a container.

## Install

```bash
yarn add @vtex/admin-ui
```

## Usage

- Simple usage

```jsx
import { Card } from '@vtex/admin-ui'

function UseCase() {
  return <Card>{content}</Card>
}
```

## Props

| prop | type        | description        | required | default |
| ---- | ----------- | ------------------ | -------- | ------- |
| sx   | SxStyleProp | ThemeUI style prop | 🚫       | {}      |

## Customization

Use `sx` if you want to add any style to your `Card`.

### Example

- Without paddings

```jsx
import { Card, Text } from '@vtex/admin-ui'

function UseCase() {
  return (
    <Card sx={{ padding: 0 }}>
      <Text variation="headline" sx={{ padding: 9 }}>
        Title
      </Text>
      <img />
      <Text as="p" variation="body" sx={{ padding: 9 }}>
        Some text
      </Text>
    </Card>
  )
}
```

You can read more about the `sx` [here](https://theme-ui.com/sx-prop/)
