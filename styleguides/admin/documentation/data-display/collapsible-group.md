---
path: /data-display/collapsible-group/
---

# CollapsibleGroup

A Component that groups Collapsible components. It's a container that separates its children with an `<hr>` element.
You may want to check the [Collapsible Documentation](/data-display/collapsible/) before using the CollapsibleGroup component.

## Import

```jsx isStatic
import { CollapsibleGroup, useCollapsible } from '@vtex/admin-ui'
```

## Behavior

```jsx
function Example() {
  const promos = useCollapsible()
  const marketing = useCollapsible()

  return (
    <CollapsibleGroup csx={{ width: 400 }}>
      <Collapsible state={promos}>
        <Collapsible.Header label="Promos" />
        <Collapsible.Content>
          <Text variant="action">
            APP BRINDE 458 - MOBFIQ R$ 99 TMP OFERTA - 899 OIS : CAE SEMANA -
            ALEMANA
          </Text>
        </Collapsible.Content>
      </Collapsible>
      <Collapsible state={marketing}>
        <Collapsible.Header label="Marketing" />
        <Collapsible.Content>
          <Set orientation="vertical">
            <Text variant="small" csx={{ color: 'dark.secondary' }}>
              Partner - app_ios
            </Text>
            <Text variant="small" csx={{ color: 'dark.secondary' }}>
              Campaign - Campaign Name
            </Text>
          </Set>
        </Collapsible.Content>
      </Collapsible>
    </CollapsibleGroup>
  )
}
```

## Variation

### Nested

It is possible to render a `CollapsibleGroup` inside a `Collapsible`, just pass the `CollapsibleGroup` as a child of `Collapsible.Content`. Note that when nesting, each internal collapsible will have different padding from the one on the root. Check [Nested Collapsible Documentation](/collapsible/#nested) for detailed info.

```jsx
function Example() {
  const promosAndPartner = useCollapsible()
  const shipping = useCollapsible()
  const promos = useCollapsible()
  const marketing = useCollapsible()
  const packageOne = useCollapsible()
  const packageTwo = useCollapsible()

  const packages = ['Package #1', 'Package #2']

  const PromosGroup = (
    <CollapsibleGroup>
      <Collapsible state={promos}>
        <Collapsible.Header label="Promos" />
        <Collapsible.Content>
          <Text variant="action">
            APP BRINDE 458 - MOBFIQ R$ 99 TMP OFERTA - 899 OIS : CAE SEMANA -
            ALEMANA
          </Text>
        </Collapsible.Content>
      </Collapsible>
      <Collapsible state={marketing}>
        <Collapsible.Header label="Marketing" />
        <Collapsible.Content>
          <Set orientation="vertical">
            <Text variant="small" csx={{ color: 'dark.secondary' }}>
              Partner - app_ios
            </Text>
            <Text variant="small" csx={{ color: 'dark.secondary' }}>
              Campaign - Campaing Name
            </Text>
          </Set>
        </Collapsible.Content>
      </Collapsible>
    </CollapsibleGroup>
  )

  const PackagesGroup = (
    <CollapsibleGroup>
      {packages.map((value, index) => {
        return (
          <Collapsible state={index ? packageOne : packageTwo} key={index}>
            <Collapsible.Header label={value} />
            <Collapsible.Content>
              <Set orientation="vertical" spacing={2}>
                <Text variant="small" csx={{ color: 'blue' }}>
                  N 00025755809
                </Text>
                <Text variant="small" csx={{ color: 'mid.primary' }}>
                  Total cost of items - 39,00 BRL
                </Text>
                <Text variant="small" csx={{ color: 'mid.primary' }}>
                  Type - Total Express
                </Text>
                <Text csx={{ color: 'blue' }}>Tracking - XSDFE231675</Text>
              </Set>
            </Collapsible.Content>
          </Collapsible>
        )
      })}
    </CollapsibleGroup>
  )

  return (
    <CollapsibleGroup csx={{ width: 400 }}>
      <Collapsible state={promosAndPartner}>
        <Collapsible.Header label="Promos and Partnerships" />
        <Collapsible.Content>{PromosGroup}</Collapsible.Content>
      </Collapsible>
      <Collapsible state={shipping}>
        <Collapsible.Header label="Shipping" />
        <Collapsible.Content>{PackagesGroup}</Collapsible.Content>
      </Collapsible>
    </CollapsibleGroup>
  )
}
```

## Props

Same as [Box](/primitives/box/).
