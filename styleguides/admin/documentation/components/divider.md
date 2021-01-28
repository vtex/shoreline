---
path: /divider/
---

# Divider

It renders an `hr` element and grants accessibility described on the [WAI-ARIA Separator Role](https://www.w3.org/TR/wai-aria-1.1/#separator).

## Behavior

```jsx
<Divider />
```

## Installation

```sh isStatic
yarn add @vtex/admin-ui
```

```jsx isStatic
import { Divider } from '@vtex/admin-ui'
```

## Variation

### Horizontal

By default, the orientation property has a `horizontal` value.

```jsx
<Card width={500}>
  <Set orientation="vertical" spacing={2}>
    <Heading>Tolerance</Heading>
    <Paragraph styleOverrides={{ color: 'mid.primary' }}>
      Allows orders to be placed even if they pass X% of the account`s credit
      limit. Tolerance is set per account.
    </Paragraph>
  </Set>
  <Divider marginY={6} />
  <Set orientation="vertical" spacing={2}>
    <Heading>Automatic account creation</Heading>
    <Paragraph styleOverrides={{ color: 'mid.primary' }}>
      Allows users who have not been previously credited to close a purchase.
    </Paragraph>
  </Set>
</Card>
```

### Vertical

The orientation property can also have a `vertical` value.

```jsx
<Card width={600}>
  <Columns>
    <Columns.Item>
      <Heading>Cards</Heading>
      <Paragraph styleOverrides={{ color: 'mid.primary' }}>
        In Cards, your customer is given autonomy to manage credit cards related
        to his account, and can add, remove or edit credit card data.
      </Paragraph>
    </Columns.Item>

    <Divider orientation="vertical" styleOverrides={{ marginX: 6 }} />

    <Columns.Item>
      <Heading>Personal data</Heading>
      <Paragraph styleOverrides={{ color: 'mid.primary' }}>
        In this section, the user can manage their personal data registered on
        the store site.
      </Paragraph>
    </Columns.Item>
  </Columns>
</Card>
```

## Customization

You can use the [styleOverrides](/theming/inline-styles/#styles--styleoverrides) property to handle different styles, and also [Space Style Props](/theming/css-props/#spacing).

### Example

For example, you can customize the Divider `margin` and `color`. One way to do this is by using `styleOverrides`, check the example below!

```jsx
<Divider styleOverrides={{ margin: 6, borderColor: 'dark.primary' }} />
```

## Props

<proptypes heading="Divider" component="Divider"/>
