---
path: /divider/
---

# Divider

It renders an `hr` element and grants accessibility described on the [WAI-ARIA Separator Role](https://www.w3.org/TR/wai-aria-1.1/#separator).

## Behavior

```jsx
import { Divider, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Divider />
    </ThemeProvider>
  )
}
```

## Installation

```static
yarn add @vtex/admin-ui
```

```jsx static
import { Divider } from '@vtex/admin-ui'
```

## Variation

### Horizontal

By default, the orientation property has a `horizontal` value.

```jsx
import {
  Divider,
  Paragraph,
  Heading,
  Set,
  ThemeProvider,
  Card,
  Text,
} from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Card width={500}>
        <Set orientation="vertical" spacing={2}>
          <Heading>Tolerance</Heading>
          <Paragraph styleOverrides={{ color: 'muted.0' }}>
            Allows orders to be placed even if they pass X% of the account`s
            credit limit. Tolerance is set per account.
          </Paragraph>
        </Set>
        <Divider marginY={6} />
        <Set orientation="vertical" spacing={2}>
          <Heading>Automatic account creation</Heading>
          <Paragraph styleOverrides={{ color: 'muted.0' }}>
            Allows users who have not been previously credited to close a
            purchase.
          </Paragraph>
        </Set>
      </Card>
    </ThemeProvider>
  )
}
```

### Vertical

The orientation property can also have a `vertical` value.

```jsx
import {
  Divider,
  Heading,
  Paragraph,
  ThemeProvider,
  Card,
  Columns,
  Text,
  Box,
} from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Card width={600}>
        <Columns>
          <Columns.Item>
            <Heading>Cards</Heading>
            <Paragraph styleOverrides={{ color: 'muted.0' }}>
              In Cards, your customer is given autonomy to manage credit cards
              related to his account, and can add, remove or edit credit card
              data.
            </Paragraph>
          </Columns.Item>

          <Divider orientation="vertical" marginX={6} />

          <Columns.Item>
            <Heading>Personal data</Heading>
            <Paragraph styleOverrides={{ color: 'muted.0' }}>
              In this section, the user can manage their personal data
              registered on the store site.
            </Paragraph>
          </Columns.Item>
        </Columns>
      </Card>
    </ThemeProvider>
  )
}
```

## Customization

You can use the [styleOverrides](/theming/inline-styles/#styles--styleoverrides) property to handle different styles, and also [Space Style Props](/theming/css-props/#spacing).

### Example

For example, you can customize the Divider `margin` and `color`. One way to do this is by combining `Space Style Props` and `styleOverrides`, check the example below!

```jsx
import { Divider, ThemeProvider } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Divider margin={6} styleOverrides={{ borderColor: 'text' }} />
    </ThemeProvider>
  )
}
```

## Props

<proptypes heading="Divider" component="Divider"/>
