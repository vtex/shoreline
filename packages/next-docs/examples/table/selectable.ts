export const files = {
  '/App.js': `import { 
  createColumns,
  Table,
  THead,
  THeadCell,
  TBody,
  TBodyRow,
  TBodyCell,
  useTableState,
  IconEye,
  csx,
  Tag,
  SelectionTree,
  useSelectionTreeState,
} from '@vtex/admin-ui'

const columns = createColumns([
{
id: 'id',
resolver: {
type: 'selection',
mapId: (item) => item.id,
},
},
{
id: 'name',
header: 'Name',
width: '2fr',
resolver: {
type: 'text',
columnType: 'name',
mapText: (item) => item.name,
render: ({ data }) => (

<div className={csx({ minWidth: '10rem' })}>{data}</div>
),
},
},
{
id: 'brand',
header: 'Brand',
width: '1fr',
resolver: {
type: 'root',
render: ({ item }) => {
return <div className={csx({ minWidth: '5rem' })}>{item.brand}</div>
},
},
},
{
id: 'price',
header: 'Price',
width: '1fr',
resolver: {
type: 'currency',
locale: 'en-US',
currency: 'USD',
},
},
{
id: 'status',
header: 'Status',
width: '1fr',
resolver: {
type: 'root',
render: ({ item }) => {
return <Tag label={item.status} size="normal" />
},
},
},
{
resolver: {
type: 'menu',
actions: [
{
label: 'View details',
icon: <IconEye />,
},
],
},
},
])

const items = [
{
id: 495953,
name: 'Wooden Eyeglasses',
status: 'Inactive',
brand: 'Revolution',
price: 42.14,
},
{
id: 429048,
name: 'Brazil Straw Hat',
status: 'Inactive',
brand: 'Pathway',
price: 38.52,
},
{
id: 495954,
name: 'Striped Beach Short',
status: 'Inactive',
brand: 'Desire Spirit',
price: 23.49,
},
]

export default function App() {
  const { data, getBodyCell, getHeadCell, getTable } = useTableState({
    columns,
    length: 3,
    items,
  })

const selection = useSelectionTreeState({
items: data,
mapId: (item) => item.id,
})

return (

<SelectionTree state={selection}>
  <Table {...getTable()}>
    <THead>
      {columns.map((column) => (
        <THeadCell {...getHeadCell(column)} />
      ))}
    </THead>
    <TBody>
      {data.map((item) => {
        return (
          <TBodyRow key={item.id} onClick={() => alert('Item: item.name')}>
            {columns.map((column) => {
              return <TBodyCell {...getBodyCell(column, item)} />
            })}
          </TBodyRow>
        )
      })}
    </TBody>
  </Table>
</SelectionTree>
) } `,
}