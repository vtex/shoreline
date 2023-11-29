import '../virtual.css'

import React, { useMemo, useState } from 'react'
import { Virtual, VirtualItem } from '../index'
import { Stack } from '../../stack'
import { Checkbox } from '../../checkbox'
import { Text } from '../../text'

export default {
  title: 'shoreline-components/virtual',
}

export function CheckboxVirtualization() {
  const numberOfItems = useMemo(() => 50000, [])

  const items = new Array(numberOfItems).fill(true)

  const trueArray = useMemo(
    () => new Array(numberOfItems).fill(true),
    [numberOfItems]
  )

  const falseArray = useMemo(
    () => new Array(numberOfItems).fill(false),
    [numberOfItems]
  )

  const [checked, setChecked] = useState<boolean[]>(falseArray)

  const someChecked = checked.some((i) => i)
  const allChecked = checked.every((i) => i)

  return (
    <Stack>
      <Text> Number of Checkboxes: {numberOfItems}</Text>

      <Checkbox
        indeterminate={someChecked && !allChecked}
        checked={allChecked}
        onChange={() => {
          if (allChecked) {
            setChecked(falseArray)
          } else {
            setChecked(trueArray)
          }
        }}
      >
        Root
      </Checkbox>
      <Virtual count={items.length} dynamic>
        <VirtualItem asChild>
          {({ index }) => (
            <Checkbox
              checked={checked[index]}
              onChange={() => {
                setChecked((prev) => {
                  const res = [...prev]

                  res[index] = !res[index]

                  return res
                })
              }}
            >
              Item {index}
            </Checkbox>
          )}
        </VirtualItem>
      </Virtual>
    </Stack>
  )
}