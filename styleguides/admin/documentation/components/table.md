---
path: /docs/table/
next: true
---

# Table

## Installation

`<Set>` uses the upcoming `@vtex/admin-ui-system` package. This means you need to install the `latest` version:

```bash
yarn add @vtex/admin-ui@latest
---
npm install @vtex/admin-ui@latest
```

## Variation

### StatefulTable

This is the simplest way to use the Table. It handles common table use cases for the developer.

### Table

<blockquote palette="danger">

Still TDB. Suited for advanced usages such as Windowing and Drag n Drop. If that's your case, check the storybook stories for more details in how to acomplish it.

</blockquote>

## Density

```jsx
import { ThemeProvider, StatefulTable } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <StatefulTable
        density="regular"
        columns={[
          {
            id: 'location',
            header: 'Location',
            width: 148,
          },
          {
            id: 'date',
            header: 'Date',
            width: 148,
          },
          {
            id: 'status',
            header: 'Status',
            width: 156,
          },
        ]}
        items={[
          {
            id: 1,
            location: 'São Paulo, SP',
            date: '8/7/2020, 23:29',
            status: `Delivered`,
          },
          {
            id: 2,
            location: 'São Paulo, SP',
            date: '6/7/2020, 21:12',
            status: `Arrived at São Paulo`,
          },
          {
            id: 3,
            location: 'São Paulo, SP',
            date: '5/7/2020, 13:04',
            status: `On its way from Rio de Janeiro to São Paulo`,
          },
          {
            id: 4,
            location: 'Itaquaquecetuba, SP',
            date: '4/7/2020, 14:48',
            status: `Object dispatched at the post office`,
          },
        ]}
      />
    </ThemeProvider>
  )
}
```

## Column API

### id

Defines the property name that the column represents.
This property is required and must be a string.

### header

Controls the title which appears on the table Header.
It can receive either a string or an element.

### acessor

Defines how to access a property

### resolver

[Resolvers](/docs/components/table/#resolvers-api) api
Will select the [plain resolver](/docs/components/table/#plain) by default

### width

Defines a fixed width for the specific column.
Receives either a string or number.
By default, the column's width is defined to fit the available space without breaking the content.

## Resolvers API

### Plain

```jsx
import { ThemeProvider, StatefulTable, Box } from '@vtex/admin-ui'

function Example() {
  const fruits = [
    {
      id: 1,
      productName: 'Orange',
      inStock: 380,
      skus: 0,
      price: 120,
    },
    {
      id: 2,
      productName: 'Lemon',
      inStock: 380,
      skus: 26,
      price: 120,
    },
    {
      id: 3,
      productName: 'Tomato',
      inStock: 380,
      skus: 26,
      price: 120,
    },
  ]

  return (
    <ThemeProvider>
      <StatefulTable
        columns={[
          {
            id: 'product-name',
            header: 'ProductName',
            acessor: 'productName',
          },
          {
            id: 'inStock',
            header: 'In Stock',
            resolver: {
              type: 'plain',
            },
          },
          {
            id: 'skus',
            header: 'SKUs',
            resolver: {
              type: 'plain',
              render: function Render({ data }) {
                return (
                  <Box
                    text="highlight"
                    styles={{
                      color: Number(data) > 0 ? 'primary.base' : 'danger.base',
                    }}
                  >
                    {data}
                  </Box>
                )
              },
            },
          },
          {
            id: 'price',
            header: 'Price',
          },
        ]}
        items={fruits}
      />
    </ThemeProvider>
  )
}
```

### Currency

```jsx
import { ThemeProvider, StatefulTable } from '@vtex/admin-ui'

function Example() {
  const currencies = [
    {
      id: 1,
      brl: 120,
      usd: 24,
      cny: 100,
    },
  ]

  return (
    <ThemeProvider>
      <StatefulTable
        columns={[
          {
            id: 'brl',
            header: 'Preço',
            resolver: {
              type: 'currency',
              locale: 'pt-BR',
              currency: 'BRL',
            },
          },
          {
            id: 'usd',
            header: 'Price',
            resolver: {
              type: 'currency',
              locale: 'en-US',
              currency: 'USD',
            },
          },
          {
            id: 'cny',
            header: '价格',
            resolver: {
              type: 'currency',
              locale: 'zh-CN',
              currency: 'CNY',
            },
          },
        ]}
        items={currencies}
      />
    </ThemeProvider>
  )
}
```

### Date

```jsx
import { ThemeProvider, StatefulTable } from '@vtex/admin-ui'

function Example() {
  const dates = [
    {
      id: 1,
      pt: '5/7/2020, 13:04',
      ar: '5/7/2020, 13:04',
      en: '5/7/2020, 13:04',
      cn: '5/7/2020, 13:04',
    },
  ]

  return (
    <ThemeProvider>
      <StatefulTable
        columns={[
          {
            id: 'pt',
            header: 'Data',
            resolver: {
              type: 'date',
              locale: 'pt-BR',
              options: {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              },
            },
          },
          {
            id: 'ar',
            header: 'تاريخ',
            resolver: {
              type: 'date',
              locale: 'ar-AE',
              options: {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              },
            },
          },
          {
            id: 'en',
            header: 'Date',
            resolver: {
              type: 'date',
              locale: 'en-US',
              options: {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              },
            },
          },
          {
            id: 'cn',
            header: '日期',
            resolver: {
              type: 'date',
              locale: 'zh-CN',
              options: {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              },
            },
          },
        ]}
        items={dates}
      />
    </ThemeProvider>
  )
}
```

### Image

| prop    | type                      | description                    | default |
| ------- | ------------------------- | ------------------------------ | ------- |
| display | boolean                   | if should preview on hover     | true    |
| size    | `small, regular or large` | size of the preview            | regular |
| delay   | number                    | delay of preview display in ms | 0       |

```jsx
import { ThemeProvider, StatefulTable } from '@vtex/admin-ui'

function Example() {
  const fruits = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80',
      productName: 'Orange',
      stock: 26900,
      price: 120,
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/flagged/photo-1587302164675-820fe61bbd55?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
      productName: 'Lemon',
      stock: 12905,
      price: 120,
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1587486938113-d6d38d424efa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
      productName: 'Tomato',
      stock: 199001,
      price: 120,
    },
  ]

  return (
    <ThemeProvider>
      <StatefulTable
        dir="ltr"
        columns={[
          {
            id: 'image',
            header: 'Image',
            resolver: {
              type: 'image',
              preview: {
                display: true,
                size: 'regular',
                delay: 0,
              },
            },
          },
          {
            id: 'productName',
            header: 'Name',
          },
          {
            id: 'stock',
            header: 'Stock',
          },
          {
            id: 'price',
            header: 'Stock',
            resolver: {
              type: 'currency',
              locale: 'en-US',
              currency: 'USD',
            },
          },
        ]}
        items={fruits}
      />
    </ThemeProvider>
  )
}
```

### Root

```jsx
import {
  ThemeProvider,
  StatefulTable,
  Skeleton,
  Set,
  Box,
} from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <StatefulTable
        columns={[
          {
            id: 'image',
            header: 'Image',
            resolver: {
              type: 'image',
            },
          },
          {
            id: 'description',
            header: 'Description',
            resolver: {
              type: 'root',
              render: function Description({ item, context }) {
                if (context.loading) {
                  return <Skeleton sx={{ height: 24 }} />
                }

                return (
                  <Set orientation="vertical">
                    <Box text="highlight">{item.productName}</Box>
                    <Box text="body">{item.category}</Box>
                  </Set>
                )
              },
            },
          },
          {
            id: 'inStock',
            header: 'In Stock',
          },
        ]}
        items={[
          {
            id: 1,
            image:
              'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80',
            productName: 'Orange',
            category: 'fruit',
            inStock: 380,
          },
          {
            id: 2,
            image:
              'https://images.unsplash.com/flagged/photo-1587302164675-820fe61bbd55?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
            productName: 'Lemon',
            category: 'fruit',
            inStock: 380,
          },
        ]}
      />
    </ThemeProvider>
  )
}
```

## Customization

###

## Limitations

This component is unstable beacause is also missing some (quite crucial) features, such as:

- Empty states
- Checkboxes resolvers

## Props

### Stateful

<propdetails heading="StatefulTable" component="StatefulTable">
</propdetails>

### Table

<propdetails heading="Table" component="Table">
</propdetails>

<propdetails heading="Table.Head" component="TableHead">
</propdetails>

<propdetails heading="Table.Body" component="TableBody">
</propdetails>

<propdetails heading="Table.Row" component="TableRow">
</propdetails>

<propdetails heading="Table.Cell" component="TableCell">
</propdetails>
