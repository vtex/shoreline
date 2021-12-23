import React, { useEffect, cloneElement, useState } from 'react'
import {
  useDataViewState,
  useSearchState,
  useDropdownState,
  DataView,
  DataViewControls,
  Dropdown,
  Grid,
  Search,
  Card,
  Toggle,
  Label,
  Set,
  Text,
  Center,
} from '@vtex/admin-ui'
import type { IconProps } from './icons'

const sizes = ['Normal', 'Small']
const weights = ['Regular', 'Fill']

export function IconsGrid(props: IconsGridProps) {
  const dataView = useDataViewState()

  const [mirrored, setMirrored] = useState(false)

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
    return items.filter((item) => {
      const searchLowerCase = search.debouncedValue.toLocaleLowerCase()

      return item.name.toLowerCase().includes(searchLowerCase)
    })
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

  return (
    <DataView state={dataView}>
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
        {/* <Set spacing={2}>
          <Toggle
            id="toggle-small"
            checked={small}
            onChange={() => setSmall((prev) => !prev)}
          />
          <Label htmlFor="toggle-small" csx={{ display: 'flex' }}>
            Small
          </Label>
        </Set>
        <Set spacing={2}>
          <Toggle
            id="toggle-filled"
            checked={filled}
            onChange={() => setFilled((prev) => !prev)}
          />
          <Label htmlFor="toggle-filled" csx={{ display: 'flex' }}>
            Filled
          </Label>
        </Set> */}
        <Set spacing={2}>
          <Toggle
            id="toggle-mirrored"
            checked={mirrored}
            onChange={() => setMirrored((prev) => !prev)}
          />
          <Label htmlFor="toggle-mirrored" csx={{ display: 'flex' }}>
            Mirrored
          </Label>
        </Set>
      </DataViewControls>
      <Grid templateColumns="repeat(3, 1fr)" gap="4">
        {searchedItems.map((item) => {
          const codeString = `<Icon${item.name} />`

          return (
            <Card csx={{ height: 100 }}>
              <Center>
                <Set
                  spacing={2}
                  orientation="vertical"
                  csx={{ alignItems: 'center' }}
                >
                  {cloneElement(item.icon, {
                    ...props,
                    size: sizeDropdown.selectedItem?.toLowerCase(),
                    mirrored,
                    weight: weightDropdown.selectedItem?.toLowerCase(),
                  })}
                  <Text tone="secondary">{codeString}</Text>
                </Set>
              </Center>
            </Card>
          )
        })}
      </Grid>
    </DataView>
  )
}

interface IconsGridProps {
  items: Array<{
    name: string
    icon: JSX.Element
    type: 'filled' | 'normal' | 'small'
    props: IconProps
  }>
}

export * from './icons'
