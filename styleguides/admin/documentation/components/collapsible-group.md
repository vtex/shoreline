---
path: /collapsible-group/
---

# CollapsibleGroup

A Component that groups Collapsible components. It's a container that separates its children with an `<hr>` element.

<blockquote palette="primary">

You may want to check the [Collapsible Documentation](/collapsible/) before using the CollapsibleGroup component.

</blockquote>

## Behavior

```jsx
import {
  CollapsibleGroup,
  useCollapsible,
  ThemeProvider,
  Text,
  Set,
} from '@vtex/admin-ui'

function Example() {
  const promos = useCollapsible()
  const marketing = useCollapsible()

  return (
    <ThemeProvider>
      <CollapsibleGroup styleOverrides={{ width: 400 }}>
        <CollapsibleGroup.Item state={promos}>
          <CollapsibleGroup.Item.Header label="Promos" />
          <CollapsibleGroup.Item.Content>
            <Text variant="action">
              APP BRINDE 458 - MOBFIQ R$ 99 TMP OFERTA - 899 OIS : CAE SEMANA -
              ALEMANA
            </Text>
          </CollapsibleGroup.Item.Content>
        </CollapsibleGroup.Item>
        <CollapsibleGroup.Item state={marketing}>
          <CollapsibleGroup.Item.Header label="Marketing" />
          <CollapsibleGroup.Item.Content>
            <Set orientation="vertical">
              <Text
                variant="small"
                styleOverrides={{ color: 'text.secondary' }}
              >
                Partner - app_ios
              </Text>
              <Text
                variant="small"
                styleOverrides={{ color: 'text.secondary' }}
              >
                Campaign - Campaign Name
              </Text>
            </Set>
          </CollapsibleGroup.Item.Content>
        </CollapsibleGroup.Item>
      </CollapsibleGroup>
    </ThemeProvider>
  )
}
```

## Installation

```sh
yarn add @vtex/admin-ui
```

```jsx static
import { CollapsibleGroup, useCollapsible } from '@vtex/admin-ui'
```

## Variation

### Nested

It is possible to render a `CollapsibleGroup` inside a `CollapsibleGroup.Item`, just pass the `CollapsibleGroup` as a child of `CollapsibleGroup.Item.Content`. Note that when nesting, each internal collapsible will have different padding from the one on the root. Check [Nested Collapsible Documentation](/collapsible/#nested) for detailed info.

```jsx
import {
  Text,
  useCollapsible,
  CollapsibleGroup,
  ThemeProvider,
  Set,
} from '@vtex/admin-ui'

function Example() {
  const promosAndPartner = useCollapsible()
  const shipping = useCollapsible()
  const promos = useCollapsible()
  const marketing = useCollapsible()
  const packageOne = useCollapsible()
  const packageTwo = useCollapsible()

  const packages = ['Package #1', 'Package #2']

  function PromosContent() {
    return (
      <Text variant="action">
        APP BRINDE 458 - MOBFIQ R$ 99 TMP OFERTA - 899 OIS : CAE SEMANA -
        ALEMANA
      </Text>
    )
  }

  function PartnershipsContent() {
    return (
      <Set orientation="vertical">
        <Text variant="small" styleOverrides={{ color: 'text.secondary' }}>
          Partner - app_ios
        </Text>
        <Text variant="small" styleOverrides={{ color: 'text.secondary' }}>
          Campaign - Campaing Name
        </Text>
      </Set>
    )
  }

  function PackagesContent() {
    return (
      <Set orientation="vertical" spacing={2}>
        <Text variant="small" styleOverrides={{ color: 'primary.base' }}>
          N 00025755809
        </Text>
        <Text variant="small" styleOverrides={{ color: 'muted.0' }}>
          Total cost of items - 39,00 BRL
        </Text>
        <Text variant="small" styleOverrides={{ color: 'muted.0' }}>
          Type - Total Express
        </Text>
        <Text styleOverrides={{ color: 'primary.base' }}>
          Tracking - XSDFE231675
        </Text>
      </Set>
    )
  }

  function PromosGroup() {
    return (
      <CollapsibleGroup>
        <CollapsibleGroup.Item state={promos}>
          <CollapsibleGroup.Item.Header label="Promos" />
          <CollapsibleGroup.Item.Content>
            <PromosContent />
          </CollapsibleGroup.Item.Content>
        </CollapsibleGroup.Item>
        <CollapsibleGroup.Item state={marketing}>
          <CollapsibleGroup.Item.Header label="Marketing" />
          <CollapsibleGroup.Item.Content>
            <PartnershipsContent />
          </CollapsibleGroup.Item.Content>
        </CollapsibleGroup.Item>
      </CollapsibleGroup>
    )
  }

  function PackagesGroup() {
    return (
      <CollapsibleGroup>
        {packages.map((value, index) => {
          return (
            <CollapsibleGroup.Item
              state={index ? packageOne : packageTwo}
              key={index}
            >
              <CollapsibleGroup.Item.Header label={value} />
              <CollapsibleGroup.Item.Content>
                <PackagesContent />
              </CollapsibleGroup.Item.Content>
            </CollapsibleGroup.Item>
          )
        })}
      </CollapsibleGroup>
    )
  }

  return (
    <ThemeProvider>
      <CollapsibleGroup styleOverrides={{ width: 400 }}>
        <CollapsibleGroup.Item state={promosAndPartner}>
          <CollapsibleGroup.Item.Header label="Promos and Partnerships" />
          <CollapsibleGroup.Item.Content>
            <PromosGroup />
          </CollapsibleGroup.Item.Content>
        </CollapsibleGroup.Item>
        <CollapsibleGroup.Item state={shipping}>
          <CollapsibleGroup.Item.Header label="Shipping" />
          <CollapsibleGroup.Item.Content>
            <PackagesGroup />
          </CollapsibleGroup.Item.Content>
        </CollapsibleGroup.Item>
      </CollapsibleGroup>
    </ThemeProvider>
  )
}
```

## Composites

`<CollapsibleGroup.Item>` -> Same as [Collapsible](/collapsible/)

`<CollapsibleGroup.Item.Header>` -> Same as [Collapsible.Header](/collapsible/#header)

`<CollapsibleGroup.Item.Content>` -> Same as [Collapsible.Content](/collapsible/#content)

## State

As the `CollapsibleGroup.Item` is a Collapsible component, you will need to handle state logic for them. You can check [useCollapsible Documentation](/collapsible/#usecollapsible-hook) for detailed info.

## Customization

You can use the [styleOverrides](/theming/inline-styles/#styles--styleoverrides) property to handle different styles. The `CollapsibleGroup` and its composites accepts this property.

## Props

<propdetails heading="CollapsibleGroup" component="CollapsibleGroup"></propdetails>

<propdetails heading="CollapsibleGroup.Item" component="Collapsible"></propdetails>

<propdetails heading="CollapsibleGroup.Item.Header" component="Header"></propdetails>

<propdetails heading="CollapsibleGroup.Item.Content" component="Content"></propdetails>
