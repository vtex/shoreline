---
path: /docs/divider/
---

# Divider

It renders an `hr` element and grants accessibility described on the [WAI-ARIA Separator Role](https://www.w3.org/TR/wai-aria-1.1/#separator)

## Usage

```jsx
import { Divider, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Divider orientation="horizontal" />
    </ThemeProvider>
  )
}
```

### Horizontal

```jsx
import { Divider, ThemeProvider, Card, Text } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Card w="6/12">
        <Text variant="headline" mt="0" mb="2">
          Tolerance
        </Text>
        <Text el="p" fs="4" m="0" c="muted.0">
          Allows orders to be placed even if they pass X% of the account`s
          credit limit. Tolerance is set per account.
        </Text>
        <Divider orientation="horizontal" my="6" />
        <Text variant="headline" mt="0" mb="2">
          Automatic account creation
        </Text>
        <Text el="p" fs="4" m="0" c="muted.0">
          Allows users who have not been previously credited to close a
          purchase.
        </Text>
      </Card>
    </ThemeProvider>
  )
}
```

### Vertical

```jsx
import { Divider, ThemeProvider, Card, Text, Box } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Card display="flex" w="6/12" justify="center">
        <Box w="5/12">
          <Text variant="headline" mt="0" mb="2">
            Cards
          </Text>
          <Text el="p" fs="4" m="0" c="muted.0">
            In Cards, your customer is given autonomy to manage credit cards
            related to his account, and can add, remove or edit credit card
            data.
          </Text>
        </Box>
        <Divider orientation="vertical" mx="6" />
        <Box w="5/12">
          <Text variant="headline" mt="0" mb="2">
            Personal data
          </Text>
          <Text el="p" fs="4" m="0" c="muted.0">
            In this section, the user can manage their personal data registered
            on the store site.
          </Text>
        </Box>
      </Card>
    </ThemeProvider>
  )
}
```

## Customization

You can use all margin's `SpaceTokens` to customize your divider, and also you can use the `sx` prop to add any style to your component.

> 💡 You can check the Theme Documentation for detailed info.

### Example

- Increasing vertical margin using `SpaceTokens`

```jsx static
import { Divider } from '@vtex/admin-ui'

function UseCase() {
  return <Divider my="13" orientation="horizontal" />
}
```

- Increasing vertical margin using `sx`

```jsx static
import { Divider } from '@vtex/admin-ui'

function UseCase() {
  return <Divider my="13" orientation="horizontal" />
}
```

## Props

<proptypes heading="Divider" component="Divider" />
