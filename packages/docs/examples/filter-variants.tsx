import { Filter, FilterItem, Stack, Text } from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack horizontal>
      <div>
        <Text variant="caption1">Standard</Text>
        <Filter label="Status">
          <FilterItem value="Stable">Stable</FilterItem>
          <FilterItem value="Experimental">Experimental</FilterItem>
          <FilterItem value="Deprecated">Deprecated</FilterItem>
        </Filter>
      </div>

      <div>
        <Text variant="caption1">With Multiple Items</Text>
        <Filter label="Category">
          <FilterItem value="Electronics">Electronics</FilterItem>
          <FilterItem value="Clothing">Clothing</FilterItem>
          <FilterItem value="Food">Food</FilterItem>
          <FilterItem value="Books">Books</FilterItem>
          <FilterItem value="Toys">Toys</FilterItem>
        </Filter>
      </div>

      <div>
        <Text variant="caption1">Small List</Text>
        <Filter label="Priority">
          <FilterItem value="High">High</FilterItem>
          <FilterItem value="Low">Low</FilterItem>
        </Filter>
      </div>
    </Stack>
  )
}
