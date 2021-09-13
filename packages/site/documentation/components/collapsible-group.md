---
path: /collapsible-group/
---

# CollapsibleGroup

A Component that groups Collapsible components. It's a container that separates its children with an `<hr>` element.
You may want to check the [Collapsible Documentation](/data-display/collapsible/) before using the CollapsibleGroup component.

## Import

```jsx isStatic
import { CollapsibleGroup, useCollapsibleState } from '@vtex/admin-ui'
```

## Behavior

```jsx
function Example() {
  const promos = useCollapsibleState()
  const marketing = useCollapsibleState()

  return (
    <CollapsibleGroup csx={{ width: 400 }}>
      <Collapsible state={promos}>
        <CollapsibleHeader label="Promos" />
        <CollapsibleContent>
          <Text variant="action">
            APP BRINDE 458 - MOBFIQ R$ 99 TMP OFERTA - 899 OIS : CAE SEMANA -
            ALEMANA
          </Text>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible state={marketing}>
        <CollapsibleHeader label="Marketing" />
        <CollapsibleContent>
          <Set orientation="vertical">
            <Text variant="small" csx={{ color: 'dark.secondary' }}>
              Partner - app_ios
            </Text>
            <Text variant="small" csx={{ color: 'dark.secondary' }}>
              Campaign - Campaign Name
            </Text>
          </Set>
        </CollapsibleContent>
      </Collapsible>
    </CollapsibleGroup>
  )
}
```

## Variation

### Nested

It is possible to render a `CollapsibleGroup` inside a `Collapsible`, just pass the `CollapsibleGroup` as a child of `CollapsibleContent`. Note that when nesting, each internal collapsible will have different padding from the one on the root. Check [Nested Collapsible Documentation](/collapsible/#nested) for detailed info.

```jsx
function Example() {
  const promosAndPartner = useCollapsibleState()
  const shipping = useCollapsibleState()
  const promos = useCollapsibleState()
  const marketing = useCollapsibleState()
  const packageOne = useCollapsibleState()
  const packageTwo = useCollapsibleState()

  const packages = ['Package #1', 'Package #2']

  const PromosGroup = (
    <CollapsibleGroup>
      <Collapsible state={promos}>
        <CollapsibleHeader label="Promos" />
        <CollapsibleContent>
          <Text variant="action">
            APP BRINDE 458 - MOBFIQ R$ 99 TMP OFERTA - 899 OIS : CAE SEMANA -
            ALEMANA
          </Text>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible state={marketing}>
        <CollapsibleHeader label="Marketing" />
        <CollapsibleContent>
          <Set orientation="vertical">
            <Text variant="small" csx={{ color: 'dark.secondary' }}>
              Partner - app_ios
            </Text>
            <Text variant="small" csx={{ color: 'dark.secondary' }}>
              Campaign - Campaing Name
            </Text>
          </Set>
        </CollapsibleContent>
      </Collapsible>
    </CollapsibleGroup>
  )

  const PackagesGroup = (
    <CollapsibleGroup>
      {packages.map((value, index) => {
        return (
          <Collapsible state={index ? packageOne : packageTwo} key={index}>
            <CollapsibleHeader label={value} />
            <CollapsibleContent>
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
            </CollapsibleContent>
          </Collapsible>
        )
      })}
    </CollapsibleGroup>
  )

  return (
    <CollapsibleGroup csx={{ width: 400 }}>
      <Collapsible state={promosAndPartner}>
        <CollapsibleHeader label="Promos and Partnerships" />
        <CollapsibleContent>{PromosGroup}</CollapsibleContent>
      </Collapsible>
      <Collapsible state={shipping}>
        <CollapsibleHeader label="Shipping" />
        <CollapsibleContent>{PackagesGroup}</CollapsibleContent>
      </Collapsible>
    </CollapsibleGroup>
  )
}
```

## Props

Same as [Box](/primitives/box/).
