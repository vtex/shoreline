import React, { useEffect, cloneElement } from 'react'
import type { IconProps } from '@vtex/admin-ui'
import {
  useDataViewState,
  useSearchState,
  useDropdownState,
  DataView,
  DataViewControls,
  Dropdown,
  Grid,
  Search,
  Set,
  Text,
  Alert,
  Center,
  Anchor,
} from '@vtex/admin-ui'
import { small, filled } from './icons'

const sizes = ['Regular', 'Small']
const weights = ['Outline', 'Fill']

function sort(items: IconItem[], filter: string[]) {
  items.sort((a, _) => {
    if (filter.includes(a.name)) return -1
    if (!filter.includes(a.name)) return 1

    return 0
  })
}

export function IconsGrid(props: IconsGridProps) {
  const dataView = useDataViewState()

  const search = useSearchState()
  const { items = [] } = props

  const sizeDropdown = useDropdownState({
    items: sizes,
    initialSelectedItem: sizes[0],
  })

  const weightDropdown = useDropdownState({
    items: weights,
    initialSelectedItem: weights[0],
  })

  const searchedItems = React.useMemo(() => {
    const filtered = items.filter((item) => {
      const searchLowerCase = search.debouncedValue.toLocaleLowerCase()

      return item.name.toLowerCase().includes(searchLowerCase)
    })

    if (weightDropdown.selectedItem === 'Fill') {
      sort(filtered, filled)
    }

    if (sizeDropdown.selectedItem === 'Small') {
      sort(filtered, small)
    }

    return filtered
  }, [search])

  useEffect(() => {
    if (!searchedItems.length) {
      dataView.setStatus({
        type: 'not-found',
        message: 'The icon you are looking for does not exist',
      })
    } else {
      dataView.setStatus({
        type: 'ready',
      })
    }
  }, [searchedItems.length])

  const { selectedItem: selectedSize } = sizeDropdown
  const { selectedItem: selectedWeight } = weightDropdown

  return (
    <DataView state={dataView} csx={{ marginX: 2 }}>
      <DataViewControls>
        <Search id="search" placeholder="Search" state={search} />
        <Dropdown
          label="Sizes"
          state={sizeDropdown}
          items={sizes}
          variant="adaptative-dark"
        />
        <Dropdown
          label="Weight"
          state={weightDropdown}
          items={weights}
          variant="adaptative-dark"
        />
      </DataViewControls>
      {selectedWeight === 'Fill' || selectedSize === 'Small' ? (
        <Alert visible csx={{ marginBottom: 4 }}>
          Some icons below are opaque because they still don’t have a use case
          mapped. If you need to use one of them, please{' '}
          <Anchor href="https://github.com/vtex/onda/issues/new/choose">
            let us know through a Github issue.
          </Anchor>
        </Alert>
      ) : null}
      <Grid templateColumns="repeat(3, 1fr)" gap="3">
        {searchedItems.map((item) => {
          const smallFilter =
            selectedSize === 'Small' && !small.includes(item.name)

          const filledFilter =
            selectedWeight === 'Fill' && !filled.includes(item.name)

          const notMapped = smallFilter || filledFilter

          return (
            <Center
              csx={{
                height: 100,
                maxWidth: 250,
                borderRadius: 'default',
                border: '$neutral',
              }}
            >
              <IconPreview
                item={item}
                weight={selectedWeight?.toLowerCase() as 'fill' | 'outline'}
                size={selectedSize?.toLowerCase() as 'regular' | 'small'}
                opacity={notMapped ? 0.2 : 1}
              />
            </Center>
          )
        })}
      </Grid>
    </DataView>
  )
}

interface IconPreviewProps extends Pick<IconProps, 'weight' | 'size'> {
  item: IconItem
  opacity: number
}

function IconPreview(props: IconPreviewProps) {
  const { item, weight, size, opacity } = props

  return (
    <Set spacing={4} orientation="vertical" csx={{ alignItems: 'center' }}>
      {cloneElement(item.icon, {
        ...props,
        size,
        weight,
        csx: {
          opacity,
        },
      })}
      <Text tone="secondary" csx={{ opacity }}>
        {`<Icon${item.name} />`}
      </Text>
    </Set>
  )
}

interface IconsGridProps {
  items: IconItem[]
}

interface IconItem {
  name: string
  icon: JSX.Element
}

export * from './icons'
