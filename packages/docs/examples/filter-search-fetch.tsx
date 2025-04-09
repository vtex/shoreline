import {
  EmptyState,
  Text,
  EmptyStateIllustration,
  Filter,
  FilterItem,
  Heading,
  IconMagnifyingGlass,
  FilterListSkeleton,
  Button,
  EmptyStateActions,
  IconWarningCircle,
} from '@vtex/shoreline'
import { startTransition, useEffect, useState } from 'react'

function fetchFruits(query: string): Promise<string[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = fruits
        .filter((fruit) =>
          fruit.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        )
        .sort()
        .slice(0, 10)
      resolve(results)
    }, 500) // simulating API delay
  })
}

export default function Example() {
  const [searchValue, setSearchValue] = useState('')
  const [matches, setMatches] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const resultAvailable = !loading && !error

  useEffect(() => {
    setLoading(true)
    setError(false)

    fetchFruits(searchValue).then((results) => {
      // simulating error
      if (searchValue.toLocaleLowerCase() === 'error') {
        setError(true)
      }

      setMatches(results)

      setLoading(false)
    })
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
      {loading ? <FilterListSkeleton /> : null}
      {error ? (
        <EmptyState size="small" style={{ height: '15rem' }}>
          <EmptyStateIllustration>
            <IconWarningCircle color="var(--sl-color-red-8)" />
          </EmptyStateIllustration>
          <Heading>Something went wrong</Heading>
          <EmptyStateActions>
            <Button>Try again</Button>
          </EmptyStateActions>
        </EmptyState>
      ) : null}
      {resultAvailable && matches.length ? (
        matches.map((fruit) => (
          <FilterItem key={fruit} value={fruit}>
            {fruit}
          </FilterItem>
        ))
      ) : resultAvailable ? (
        <EmptyState size="small" style={{ height: '15rem' }}>
          <EmptyStateIllustration>
            <IconMagnifyingGlass color="var(--sl-color-gray-8)" />
          </EmptyStateIllustration>
          <Heading>No results found</Heading>
          <Text variant="body">Try using different terms.</Text>
        </EmptyState>
      ) : null}
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
