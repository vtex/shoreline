import {
  EmptyState,
  Text,
  EmptyStateIllustration,
  Filter,
  FilterItem,
  Heading,
  IconMagnifyingGlass,
} from '@vtex/shoreline'
import { startTransition, useMemo, useState } from 'react'

export default function Example() {
  const [searchValue, setSearchValue] = useState('')

  const matches = useMemo<string[]>(() => {
    return fruits
      .filter((fruit) =>
        fruit.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
      )
      .sort()
  }, [searchValue])

  return (
    <Filter
      label="Fruit"
      defaultValue={[]}
      setSearchValue={(value) => {
        startTransition(() => {
          setSearchValue(value)
        })
      }}
    >
      {matches.length ? (
        matches.map((fruit) => (
          <FilterItem key={fruit} value={fruit}>
            {fruit}
          </FilterItem>
        ))
      ) : (
        <EmptyState size="small" style={{ height: '15rem' }}>
          <EmptyStateIllustration>
            <IconMagnifyingGlass color="var(--sl-color-gray-8)" />
          </EmptyStateIllustration>
          <Heading>No results found</Heading>
          <Text variant="body">Try using different terms.</Text>
        </EmptyState>
      )}
    </Filter>
  )
}

const fruits = [
  'Apple',
  'Banana',
  'Grape',
  'Orange',
  'Strawberry',
  'Pineapple',
  'Coconut',
  'Cherry',
  'Blueberry',
  'Lemon',
  'Watermelon',
  'Papaya',
  'Kiwi',
  'Mango',
  'Pear',
  'Peach',
  'Date',
  'Apricot',
  'Grapefruit',
  'Clementine',
  'Avocado',
  'Cantaloupe',
  'Fig',
  'Blackberry',
  'Durian',
]
