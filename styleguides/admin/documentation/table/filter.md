---
path: /table/filter-bar/
---

# Table FilterBar

The Table FilterBar component is an implementation of the FilterBar component specific to the Table.

## Behavior

The `Table FilterBar` is a compound component that has the `Table FilterBar` itself and the `Table FilterBar Button`. Both should be passed as children to the `Table`, and the `Table FilterBar Button` should be passed as children to the `Table Toolbar` component.

## Installation

```bash isStatic
yarn add @vtex/admin-ui
```

```jsx isStatic
import { StatefulTable } from '@vtex/admin-ui'
```

## Code Example

```jsx
function Filter() {
  const products = [
    {
      id: 1,
      productName: 'Orange',
      inStock: 380,
      price: 120,
    },
    {
      id: 2,
      productName: 'Lemon',
      inStock: 380,
      price: 120,
    },
    {
      id: 3,
      productName: 'Tomato',
      inStock: 380,
      price: 120,
    },
    {
      id: 4,
      productName: 'Grape',
      inStock: 380,
      price: 120,
    },
    {
      id: 5,
      productName: 'Apple',
      inStock: 380,
      price: 120,
    },
    {
      id: 6,
      productName: 'Banana',
      inStock: 380,
      price: 120,
    },
  ]

  const [items, setItems] = React.useState(products)

  function filterByPrice(statement, item) {
    const { condition, target } = statement

    switch (condition.label) {
      case 'is smaller than': {
        return target && item.price < target.value
      }
      case 'is bigger than': {
        return target && item.price > target.value
      }
      default:
        return true
    }
  }

  const filter = (filters) => {
    const { conjunction, statements } = filters
    const filteredItems = products.filter((item) => {
      const conditions = statements.map((statement) => {
        const {
          filter: { id },
        } = statement

        switch (id) {
          case 'price': {
            return filterByPrice(statement, item)
          }
          default:
            return true
        }
      })

      if (conditions.length === 0) return true

      return conditions.reduce((accumulator, currentValue) =>
        conjunction.value === 'and'
          ? accumulator && currentValue
          : accumulator || currentValue
      )
    })

    setItems(filteredItems)
  }

  const { disclosureState, filterBarState } = useTableFilterBarState({
    filterBarParams: {
      conjunction: { label: 'And', value: 'and' },
      filters: [
        {
          id: 'price',
          label: 'Price',
          conditions: [
            { label: 'is bigger than', id: '3' },
            { label: 'is smaller than', id: '4' },
          ],
          resolver: {
            type: 'simple',
            defaultValue: { value: 100 },
            items: [
              { value: 1 },
              { value: 10 },
              { value: 50 },
              { value: 100 },
              { value: 250 },
              { value: 500 },
            ],
          },
        },
      ],
      onApply: (filters) => {
        filter(filters)
      },
    },
  })

  return (
    <StatefulTable
      columns={[
        {
          id: 'productName',
          header: 'Product Name',
        },
        {
          id: 'inStock',
          header: 'In Stock',
        },
        {
          id: 'price',
          header: 'Price',
        },
      ]}
      items={items}
    >
      <StatefulTable.Section>
        <StatefulTable.Search />
        <StatefulTable.Toolbar>
          <StatefulTable.FilterBar.Disclosure state={disclosureState}>
            Filters
          </StatefulTable.FilterBar.Disclosure>
        </StatefulTable.Toolbar>
      </StatefulTable.Section>
      <StatefulTable.FilterBar
        state={filterBarState}
        label="Use a filter to find products, create collections or generate a report"
        conjunctions={[
          { label: 'And', value: 'and' },
          { label: 'Or', value: 'or' },
        ]}
        internalLabels={{
          conjunctionLabel: 'Conjunction',
          filterLabel: 'Filter',
          conditionLabel: 'Condition',
          statementMenuLabel: 'Statement Menu',
          applyFilterLabel: 'Apply',
          addFilterLabel: 'Add Filter',
          clearFilterLabel: 'Clear Filters',
          deleteStatementLabel: 'Delete',
          duplicateStatementLabel: 'Duplicate',
          whereStatementLabel: 'Where',
        }}
      />
    </StatefulTable>
  )
}
```

## useTableFilterBarState

This hook manages the `Table FilterBar` state. It returns two objects, the `FilterBar` state, and the `Disclosure` state which should be passed to each respective component's state prop.

## Props and Params

Props and Params passed to the Table FilterBar components and hooks

### FilterBar

In addition to the props documented here the other props of the FilterBar component can be found on the [FilterBar](/data-display/filter-bar/)'s page

| Name  | Type                     | Description                                   | Required | Default |
| ----- | ------------------------ | --------------------------------------------- | -------- | ------- |
| state | `TableFilterBarState<V>` | Object that manages the Table FilterBar state | ✅       | -       |

### Disclosure

| Name     | Type                                   | Description                                      | Required | Default |
| -------- | -------------------------------------- | ------------------------------------------------ | -------- | ------- |
| state    | `TableFilterDisclosureState`           | Object that manages the Table Disclosure state   | ✅       | -       |
| children | `ReactNode`                            | Element that will be displayed inside the Button | 🚫       | -       |
| onClick  | `MouseEventHandler<HTMLButtonElement>` | Button onClick handler                           | 🚫       | -       |
| csx      | `StyleObject`                          | Define component styles                          | 🚫       | -       |

### useTableFilterBarState Params

| Name                 | Type                         | Description                                                                                                                                                          | Required | Default |
| -------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| poopoverInitialState | `PopoverInitialState`        | Params that will be passed to the usePopoverState hook call, it has the same props ass the [Reakit/usePopoverState](https://reakit.io/docs/popover/#usepopoverstate) | 🚫       | -       |
| filterBarParams      | `UseFilterBarStateParams<T>` | Params that will be pass to the useFilterBarState, it has the same props ass the [FilterBar](/data-display/filter-bar/#usefilterbarstate)                            | ✅       | -       |
