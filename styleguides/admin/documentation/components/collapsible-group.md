---
path: /docs/collapsible-group/
---

# CollapsibleGroup

A Component that groups Collapsible components

- version: beta.1

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
          <CollapsibleGroup.Item.Content display="flex" direction="col">
            <Text variant="action">APP BRINDE - 59458 - MOBFIQ R$99</Text>
            <Text variant="action">APP FRETE 99 - MOBFIQ</Text>
            <br />
            <Text variant="action">TMP OFERTA - 899 OIS : CAE SEMANA</Text>
            <Text variant="action">ALEMANA</Text>
            <br />
            <Text variant="action">FLETE GRATIS - CUP : PLAN SOS 28092020</Text>
          </CollapsibleGroup.Item.Content>
        </CollapsibleGroup.Item>
        <CollapsibleGroup.Item state={marketing}>
          <CollapsibleGroup.Item.Header label="Marketing" />
          <CollapsibleGroup.Item.Content>
            <Set orientation="verical">
              <Text variant="small" c="muted.2" fs="0">
                Partner
              </Text>
              <Text variant="small">app_ios</Text>
              <br />
              <Text variant="small" c="muted.2" fs="0">
                Campaign
              </Text>
              <Text variant="small">Campaign name</Text>
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
### Basic

```jsx
import {
  CollapsibleGroup,
  useCollapsible,
  ThemeProvider,
  Text,
} from '@vtex/admin-ui'

function Example() {
  const promos = useCollapsible()
  const marketing = useCollapsible()

  return (
    <ThemeProvider>
      <CollapsibleGroup w={400}>
        <CollapsibleGroup.Item state={promos}>
          <CollapsibleGroup.Item.Header label="Promos" />
          <CollapsibleGroup.Item.Content display="flex" direction="col">
            <Text variant="action">APP BRINDE - 59458 - MOBFIQ R$99</Text>
            <Text variant="action">APP FRETE 99 - MOBFIQ</Text>
            <br />
            <Text variant="action">TMP OFERTA - 899 OIS : CAE SEMANA</Text>
            <Text variant="action">ALEMANA</Text>
            <br />
            <Text variant="action">FLETE GRATIS - CUP : PLAN SOS 28092020</Text>
          </CollapsibleGroup.Item.Content>
        </CollapsibleGroup.Item>
        <CollapsibleGroup.Item state={marketing}>
          <CollapsibleGroup.Item.Header label="Marketing" />
          <CollapsibleGroup.Item.Content display="flex" direction="col">
            <Text variant="small" c="muted.2" fs="0">
              Partner
            </Text>
            <Text variant="small">app_ios</Text>
            <br />
            <Text variant="small" c="muted.2" fs="0">
              Campaign
            </Text>
            <Text variant="small">Campaign name</Text>
          </CollapsibleGroup.Item.Content>
        </CollapsibleGroup.Item>
      </CollapsibleGroup>
    </ThemeProvider>
  )
}
```

### Nested

```jsx
import {
  Text,
  useCollapsible,
  CollapsibleGroup,
  ThemeProvider,
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
      <>
        <Text variant="action">APP BRINDE - 59458 - MOBFIQ R$99</Text>
        <Text variant="action">APP FRETE 99 - MOBFIQ</Text>
        <br />
        <Text variant="action">TMP OFERTA - 899 OIS : CAE SEMANA</Text>
        <Text variant="action">ALEMANA</Text>
        <br />
        <Text variant="action">FLETE GRATIS - CUP : PLAN SOS 28092020</Text>
      </>
    )
  }

  function PartnershipsContent() {
    return (
      <>
        <Text variant="small" c="muted.2" fs="0">
          Partner
        </Text>
        <Text variant="small">app_ios</Text>
        <br />
        <Text variant="small" c="muted.2" fs="0">
          Campaign
        </Text>
        <Text variant="small">Campaign name</Text>
      </>
    )
  }

  function PackagesContent() {
    return (
      <>
        <Text variant="small" c="muted.2" fs="0">
          Bill
        </Text>
        <Text c="primary.base">N 00025755809</Text>
        <br />
        <Text variant="small" c="muted.2" fs="0">
          Total cost of items
        </Text>
        <Text c="text">39,00 BRL</Text>
        <br />
        <Text variant="small" c="muted.2" fs="0">
          Type
        </Text>
        <Text>Total Express</Text>
        <br />
        <Text variant="small" c="muted.2" fs="0">
          Tracking
        </Text>
        <Text c="primary.base">XSDFE231675</Text>{' '}
      </>
    )
  }

  function PromosGroup() {
    return (
      <CollapsibleGroup>
        <CollapsibleGroup.Item state={promos}>
          <CollapsibleGroup.Item.Header label="Promos" />
          <CollapsibleGroup.Item.Content display="flex" direction="col">
            <PromosContent />
          </CollapsibleGroup.Item.Content>
        </CollapsibleGroup.Item>
        <CollapsibleGroup.Item state={marketing}>
          <CollapsibleGroup.Item.Header label="Marketing" />
          <CollapsibleGroup.Item.Content display="flex" direction="col">
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
              <CollapsibleGroup.Item.Content display="flex" direction="col">
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
      <CollapsibleGroup w={400}>
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

### Composites

- `<CollapsibleGroup.Item>`
- `<CollapsibleGroup.Item.Header>`
- `<CollapsibleGroup.Item.Content>`

> 💡 Check the Collapsible Component Documentation for detailed info.

### State

- `useCollapsible` hook

Since the `CollapsibleGroup.Item` is a Collapsible Component, you should use this hook to add state logic to them.

### Customization

`CollapsibleGroup` is a container component, so you can customize it using `Border`, `Space`, `Color`, and `Layout` tokens defined in our theme, or you can do it using the `sx` prop as well.

> 💡 You can check the props table to verify which token you can use.

## Props

<proptypes heading="CollapsibleGroup" component="CollapsibleGroup" />
