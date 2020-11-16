---
path: /collapsible-tree/
---

# CollapsibleTree

A Component that groups Collapsible components

- version: beta.1

## Behavior

```jsx
import {
  CollapsibleTree,
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
      <CollapsibleTree styleOverrides={{ width: 400 }}>
        <CollapsibleTree.Item state={promos}>
          <CollapsibleTree.Item.Header label="Promos" />
          <CollapsibleTree.Item.Content display="flex" direction="col">
            <Text variant="action">APP BRINDE - 59458 - MOBFIQ R$99</Text>
            <Text variant="action">APP FRETE 99 - MOBFIQ</Text>
            <br />
            <Text variant="action">TMP OFERTA - 899 OIS : CAE SEMANA</Text>
            <Text variant="action">ALEMANA</Text>
            <br />
            <Text variant="action">FLETE GRATIS - CUP : PLAN SOS 28092020</Text>
          </CollapsibleTree.Item.Content>
        </CollapsibleTree.Item>
        <CollapsibleTree.Item state={marketing}>
          <CollapsibleTree.Item.Header label="Marketing" />
          <CollapsibleTree.Item.Content>
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
          </CollapsibleTree.Item.Content>
        </CollapsibleTree.Item>
      </CollapsibleTree>
    </ThemeProvider>
  )
}
```

## Installation

```sh
yarn add @vtex/admin-ui
```

```jsx static
import { CollapsibleTree, useCollapsible } from '@vtex/admin-ui'
```

## Variation

### Basic

```jsx
import {
  CollapsibleTree,
  useCollapsible,
  ThemeProvider,
  Text,
} from '@vtex/admin-ui'

function Example() {
  const promos = useCollapsible()
  const marketing = useCollapsible()

  return (
    <ThemeProvider>
      <CollapsibleTree w={400}>
        <CollapsibleTree.Item state={promos}>
          <CollapsibleTree.Item.Header label="Promos" />
          <CollapsibleTree.Item.Content display="flex" direction="col">
            <Text variant="action">APP BRINDE - 59458 - MOBFIQ R$99</Text>
            <Text variant="action">APP FRETE 99 - MOBFIQ</Text>
            <br />
            <Text variant="action">TMP OFERTA - 899 OIS : CAE SEMANA</Text>
            <Text variant="action">ALEMANA</Text>
            <br />
            <Text variant="action">FLETE GRATIS - CUP : PLAN SOS 28092020</Text>
          </CollapsibleTree.Item.Content>
        </CollapsibleTree.Item>
        <CollapsibleTree.Item state={marketing}>
          <CollapsibleTree.Item.Header label="Marketing" />
          <CollapsibleTree.Item.Content display="flex" direction="col">
            <Text variant="small" c="muted.2" fs="0">
              Partner
            </Text>
            <Text variant="small">app_ios</Text>
            <br />
            <Text variant="small" c="muted.2" fs="0">
              Campaign
            </Text>
            <Text variant="small">Campaign name</Text>
          </CollapsibleTree.Item.Content>
        </CollapsibleTree.Item>
      </CollapsibleTree>
    </ThemeProvider>
  )
}
```

### Nested

```jsx
import {
  Text,
  useCollapsible,
  CollapsibleTree,
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
      <CollapsibleTree>
        <CollapsibleTree.Item state={promos}>
          <CollapsibleTree.Item.Header label="Promos" />
          <CollapsibleTree.Item.Content display="flex" direction="col">
            <PromosContent />
          </CollapsibleTree.Item.Content>
        </CollapsibleTree.Item>
        <CollapsibleTree.Item state={marketing}>
          <CollapsibleTree.Item.Header label="Marketing" />
          <CollapsibleTree.Item.Content display="flex" direction="col">
            <PartnershipsContent />
          </CollapsibleTree.Item.Content>
        </CollapsibleTree.Item>
      </CollapsibleTree>
    )
  }

  function PackagesGroup() {
    return (
      <CollapsibleTree>
        {packages.map((value, index) => {
          return (
            <CollapsibleTree.Item
              state={index ? packageOne : packageTwo}
              key={index}
            >
              <CollapsibleTree.Item.Header label={value} />
              <CollapsibleTree.Item.Content display="flex" direction="col">
                <PackagesContent />
              </CollapsibleTree.Item.Content>
            </CollapsibleTree.Item>
          )
        })}
      </CollapsibleTree>
    )
  }

  return (
    <ThemeProvider>
      <CollapsibleTree w={400}>
        <CollapsibleTree.Item state={promosAndPartner}>
          <CollapsibleTree.Item.Header label="Promos and Partnerships" />
          <CollapsibleTree.Item.Content>
            <PromosGroup />
          </CollapsibleTree.Item.Content>
        </CollapsibleTree.Item>
        <CollapsibleTree.Item state={shipping}>
          <CollapsibleTree.Item.Header label="Shipping" />
          <CollapsibleTree.Item.Content>
            <PackagesGroup />
          </CollapsibleTree.Item.Content>
        </CollapsibleTree.Item>
      </CollapsibleTree>
    </ThemeProvider>
  )
}
```

### Composites

- `<CollapsibleTree.Item>`
- `<CollapsibleTree.Item.Header>`
- `<CollapsibleTree.Item.Content>`

> 💡 Check the Collapsible Component Documentation for detailed info.

### State

- `useCollapsible` hook

Since the `CollapsibleTree.Item` is a Collapsible Component, you should use this hook to add state logic to them.

### Customization

`CollapsibleTree` is a container component, so you can customize it using `Border`, `Space`, `Color`, and `Layout` tokens defined in our theme, or you can do it using the `sx` prop as well.

> 💡 You can check the props table to verify which token you can use.

## Props

<proptypes heading="CollapsibleTree" component="CollapsibleTree" />
