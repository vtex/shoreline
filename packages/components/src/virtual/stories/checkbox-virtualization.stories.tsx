import '../../../dist/styles.min.css'
import React, { useMemo, useState } from 'react'

import { Virtual } from '../index'
import { Stack } from '../../stack'
import { Checkbox } from '../../checkbox'
import { Text } from '../../text'

export default {
  title: 'shoreline-components/virtual',
}

export function CheckboxVirtualization() {
  const numberOfItems = useMemo(() => 100000, [])

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
      <Virtual items={items}>
        {({ items, bottom, top, ref }) => (
          <div
            ref={ref}
            style={{
              height: `400px`,
              width: `400px`,
              overflow: 'auto',
            }}
          >
            {top > 0 && <div style={{ height: `${top}px` }} />}
            {items.map((item) => (
              <div key={item.index}>
                <Checkbox
                  checked={checked[item.index]}
                  onChange={() => {
                    setChecked((prev) => {
                      const res = [...prev]

                      res[item.index] = !res[item.index]

                      return res
                    })
                  }}
                >
                  Item {item.index}
                </Checkbox>
              </div>
            ))}
            {bottom > 0 && <div style={{ height: `${bottom}px` }} />}
          </div>
        )}
      </Virtual>
    </Stack>
  )
}
