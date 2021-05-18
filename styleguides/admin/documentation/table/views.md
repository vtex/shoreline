---
path: /table/views/
---

# View States

The table has a few views that represent determinate state, you can display these views, by passing true to the props `empty`, `error` and `noItemsFound`.
You can also pass an object to the view props with a title and a subtitle or an anchor.
If you don't pass a title to one of the states a general fallback written in English will be used.

## Views prop object

The object that the prop views receives has 3 props: `empty` `error` and `noItemsFound` and all of these props receive another object, this object has a prop title, which should be a string and either a text prop which should be also a string or an anchor prop which receives an object that is able to receive a text, a href and an onClick function.

```jsx
function Views() {
  const [tableState, setTableState] = React.useState()

  return (
    <StatefulTable
      length="5"
      density="compact"
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
          status: 'Object dispatched at the post office',
        },
      ]}
      length={4}
      loading={tableState === 'loading'}
      empty={tableState === 'empty'}
      error={tableState === 'error'}
      itemsNotFound={tableState === 'itemsNotFound'}
      views={{
        itemsNotFound: {
          title: 'No product matches your search criteria',
          text: 'Please, search for a different term',
        },
        empty: {
          title: 'You don’t have a product yet',
          anchor: {
            text: 'Create your first product',
          },
        },
        error: {
          title: 'Try again',
          anchor: {
            text: 'Something went wrong',
          },
        },
      }}
    >
      <StatefulTable.Section>
        <StatefulTable.Toolbar>
          <StatefulTable.Toolbar.Button onClick={() => setTableState('error')}>
            error
          </StatefulTable.Toolbar.Button>
          <StatefulTable.Toolbar.Button
            onClick={() => setTableState('loading')}
          >
            loading
          </StatefulTable.Toolbar.Button>
          <StatefulTable.Toolbar.Button onClick={() => setTableState('empty')}>
            empty
          </StatefulTable.Toolbar.Button>
          <StatefulTable.Toolbar.Button
            onClick={() => setTableState('itemsNotFound')}
          >
            items not found
          </StatefulTable.Toolbar.Button>
        </StatefulTable.Toolbar>
      </StatefulTable.Section>
    </StatefulTable>
  )
}
```
