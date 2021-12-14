---
title: FilterBar
path: /filter-bar/
---

# FilterBar

A component that represents a list of statements that when combined it filters a data.

```ts isStatic
interface Filters<T> {
  /** FilterBar statements */
  statements: Statement<T>[]
  /** FilterBar conjunction */
  conjunction: Conjunction
}
```

## Behavior

```jsx live
function Example() {
  const state = useFilterBarState({
    conjunction: { label: 'Or', value: 'or' },
    filters: [
      {
        label: 'Status',
        id: 'status',
        conditions: [
          { label: 'Is', id: '3' },
          { label: 'Is not', id: '4' },
          { label: 'Contains', id: '5' },
          { label: 'Does not contains', id: '5' },
        ],
        resolver: {
          type: 'simple',
          defaultValue: { value: 'Archived' },
          items: [
            { value: 'Archived' },
            { value: 'In stock' },
            { value: 'Out of stock' },
          ],
        },
      },
      {
        label: 'Price',
        id: 'price',
        conditions: [
          { label: 'Is not', id: '3' },
          { label: 'Is empty', id: '4' },
          { label: 'Is equal to', id: '5' },
        ],
        resolver: {
          type: 'simple',
          defaultValue: { value: 1 },
          items: [{ value: 1 }, { value: 50 }, { value: 100 }, { value: 250 }],
        },
      },
    ],
  })

  return (
    <FilterBar
      state={state}
      label="Use a filter to find products, create collections or generate a report"
      onApply={(filters) => {
        console.log(filters)
      }}
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
  )
}
```

## Import

```jsx isStatic
import { FilterBar } from '@vtex/admin-ui'
```

## Statement

The FilterBar statement is a combination of a **filter**, a **condition**, a **value**, and a **conjunction**. Important to note that the conjunction value is shared along with all statements.

```ts isStatic
/**
 * @generic T: Type of statement value
 * @generic R: Type of resolvers
 */
interface Statement<T, R = BaseResolvers<T>> = {
  /** Statement condition */
  condition: Condition
  /** Statement Filter */
  filter: Filter<T, R>
  /** Statement value */
  target: T
}
```

## Conjunction

Represents the Boolean logic that must be applied between the statements

```ts isStatic
type Conjunction = {
  /** Conjunction label */
  label: string
  /** Conjunction value */
  value: 'and' | 'or'
}
```

## Filter

```ts isStatic
interface Filter<T, R = BaseResolvers<T>> {
  /** Filter label */
  label: string
  /** Filter id */
  id: string
  /** Filter conditions */
  conditions: Condition[]
  /** Filter resolver */
  resolver: R
}
```

### Resolvers

You can use this feature to apply predefined filters more easily. For example, you can render a simple select filter without implementing the component from scratch, you just need to pass the requiring properties to our `Simple` resolver. Check the examples below to go further.

#### Simple

Use this when you want to render a simple select filter.

##### Interface

```ts isStatic
interface SimpleResolver<T> {
  /**
   * Resolver type
   */
  type: 'simple'
  /**
   * Defines the path to the select item label
   * @default 'value'
   */
  accessor?: string
  /**
   * Select items
   */
  items: T[]
  /**
   * Filter default value. When the filter is added it will be the first value applied.
   */
  defaultValue: T
  /**
   * Custom filter render props
   */
  render?: (props: ResolverRenderProps<T, JSX.Element>) => ReactNode
}
```

**Check also:**

- [ResolverRenderProps<T, JSX.Element>](filter-bar/#common-resolver-interfaces)

##### Example

```jsx live
function Example() {
  const state = useFilterBarState({
    conjunction: { label: 'Or', value: 'or' },
    filters: [
      {
        label: 'Status',
        id: 'status',
        conditions: [
          { label: 'Is', id: '1' },
          { label: 'Is not', id: '2' },
          { label: 'Contains', id: '3' },
          { label: 'Does not contains', id: '4' },
        ],
        resolver: {
          type: 'simple',
          defaultValue: { value: { label: 'Archived', value: 0 } },
          accessor: 'label',
          items: [
            { value: { label: 'Archived', value: 0 } },
            { value: { label: 'In stock', value: 1 } },
            { value: { label: 'Out of stock', value: -1 } },
          ],
        },
      },
      {
        label: 'Price',
        id: 'price',
        conditions: [
          { label: 'Is not', id: '1' },
          { label: 'Is empty', id: '2' },
          { label: 'Is equal to', id: '3' },
        ],
        resolver: {
          type: 'simple',
          defaultValue: { value: 100 },
          items: [{ value: 1 }, { value: 50 }, { value: 100 }, { value: 250 }],
        },
      },
    ],
  })

  return (
    <FilterBar
      state={state}
      label="Use a filter to find products, create collections or generate a report"
      onApply={(filters) => {
        console.log(filters)
      }}
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
  )
}
```

#### Root

Use this when you want to create your specific filter that isn't defined in our resolvers.

##### Interface

```ts isStatic
interface RootResolver<T> {
  /**
   * Resolver type
   */
  type: 'root'
  /**
   * Filter default value. When the filter is added it will be the first value applied.
   */
  defaultValue: T
  /**
   * Custom Filter render props
   */
  render: (props: ResolverRenderProps<T, null> => ReactNode
}
```

**Check also:**

- [ResolverRenderProps<T, null>](filter-bar/#common-resolver-interfaces)

##### Example

```jsx live
function Example() {
  const state = useFilterBarState({
    conjunction: { label: 'Or', value: 'or' },
    filters: [
      {
        label: 'Product Name',
        id: 'productName',
        conditions: [
          { label: 'Is equal', id: '1' },
          { label: 'Is not equal', id: '2' },
          { label: 'Contains', id: '3' },
          { label: 'Does not contains', id: '4' },
        ],
        resolver: {
          type: 'root',
          defaultValue: { value: '' },
          render: (props) => {
            const { statement, handleValueChange, index } = props
            const { target = { value: '' } } = statement

            React.useEffect(() => {
              setValue(target.value)
            }, [statement])

            const [value, setValue] = React.useState(target.value)

            return (
              <Flex align="center" csx={{ position: 'relative' }}>
                <AbstractInput
                  id="filter-input"
                  value={value}
                  csx={{
                    bg: 'base',
                    height: 40,
                    marginY: 0,
                    paddingRight: '60px',
                  }}
                  onChange={(e) => setValue(e.target.value)}
                />
                <Button
                  csx={{ position: 'absolute', right: 1 }}
                  onClick={() => handleValueChange({ value }, index)}
                  variant="tertiary"
                  size="small"
                >
                  Apply
                </Button>
              </Flex>
            )
          },
        },
      },
    ],
  })

  return (
    <FilterBar
      state={state}
      label="Use a filter to find products, create collections or generate a report"
      onApply={(filters) => {
        console.log(filters)
      }}
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
  )
}
```

#### Common Resolver Interfaces

```ts isStatic
/**
 * Resolver render props
 * @generic T: Type of statement value
 * @generic D: Type of data
 */
interface ResolverRenderProps<T, D = null> {
  data: D
  /** Respective statement value */
  statement: Statement<T>
  /** Respective statement index position on FilterBar */
  index: number
  /** Function that handles the respective statement value change on FilterBar */
  handleValueChange: (value: T, index: number) => void
}
```

## Condition

It is represented by the filter conditions.

```ts isStatic
interface Condition {
  /** Condition label */
  label: string
  /** Condition id */
  id: string
}
```

## Value

It is represented by the filter resolver.

## Intl

FilterBar component has a lot of internal labels that need to be translated. The way we do this translation, for now, is using properties that add values to these labels.

> IMPORTANT NOTE: This is a workaround and it may change in a near future.

**Properties**

```ts isStatic
interface InternalLabels {
  /**
   * Conjunction dropdown aria-label
   */
  conjunctionLabel: string
  /**
   * Filter dropdown aria-label
   */
  filterLabel: string
  /**
   * Condition dropdown aria-label
   */
  conditionLabel: string
  /**
   * Statement menu aria-label
   */
  statementMenuLabel: string
  /**
   * Add filter button label
   */
  addFilterLabel: string
  /**
   * Apply filter button label
   */
  applyFilterLabel: string
  /**
   * Clear filter button label
   */
  clearFilterLabel: string
  /**
   * Duplicate statement button label
   */
  duplicateStatementLabel: string
  /**
   * Delete statement button label
   */
  deleteStatementLabel: string
  /**
   * First statement conjunction label
   */
  whereStatementLabel: string
}
```

### useFilterBarState

Hook that manages the state logic of the FilterBar component. It receives two parameters that define the component's initial state: `conjunction`, and `statements`.

### Parameters

| Name        | Type                            | Description                                                              | Required | Default |
| ----------- | ------------------------------- | ------------------------------------------------------------------------ | -------- | ------- |
| conjunction | `Conjunction`                   | FilterBar initial conjunction                                            | ✅       | -       |
| onApply     | `(filters: Filters<T>) => void` | Render props function that is called when the user hits the apply button | ✅       | -       |
| statements  | `Statement<T>[]`                | FilterBar initial statements                                             | 🚫       | `[]`    |
| filters     | `Filter<T>[]`                   | FilterBar filters                                                        | 🚫       | `[]`    |

## Prsops

| Name           | Type                             | Description                                              | Required | Default              |
| -------------- | -------------------------------- | -------------------------------------------------------- | -------- | -------------------- |
| label          | `string`                         | FilterBar label. It appears when there are no statements | ✅       | -                    |
| internalLabels | `InternalLabels`                 | Set of FilterBar internal labels                         | ✅       | -                    |
| state          | `UseFilterBarStateReturn<V,T>`   | Object that manages the component state logic            | ✅       | -                    |
| conjunctions   | `Conjunction[]`                  | FilterBar conjunction options                            | ✅       | -                    |
| csx            | `StyleObject`                    | Custom styles                                            | 🚫       | `{}`                 |
| resolvers      | `Record<String, Resolver<V, T>>` | FilterBar resolvers                                      | 🚫       | `baseResolvers<T>()` |
