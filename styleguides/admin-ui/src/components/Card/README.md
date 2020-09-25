# Admin UI Card

Used to group various pieces of content into a container.

## Usage

```jsx
import { Card, CardProps } from '@vtex/admin-ui'

function UseCase() {
  return <Card>{content}</Card>
}
```

## Props

It has the same props as the `Box` component.

## Customization

You can use all the theme tokens to make customizations, and you can also use the `sx` prop.

> 💡 You can check the [Theme Documentation](https://admin-ui.vercel.app/?path=/story/design-system-theme--page) for detailed info.

### Example

- Without paddings

```jsx
import { Card, Text } from '@vtex/admin-ui'

function UseCase() {
  return (
    <Card p="0">
      <Text variation="headline" sx={{ padding: 13 }}>
        Title
      </Text>
      <img />
      <Text as="p" variation="body" sx={{ padding: 13 }}>
        Some text
      </Text>
    </Card>
  )
}
```
