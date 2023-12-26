import React, { useMemo, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { FixedSizeList } from 'react-window'

import { Checkbox } from '../index'

import { Stack } from '../../stack'
import { Button } from '../../button'
import { Text } from '../../text'
import { Field, FieldDescription } from '../../field'

export default {
  title: 'shoreline-components/checkbox/integrations',
}

export function ReactHookForm() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      terms: true,
    },
  })

  return (
    <form onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}>
      <Stack>
        <Controller
          control={control}
          name="terms"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Field>
              <Checkbox
                checked={value}
                onBlur={onBlur}
                onChange={onChange}
                ref={ref}
              >
                I agree with the terms of service
              </Checkbox>
              <FieldDescription>Some short description</FieldDescription>
            </Field>
          )}
        />
        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  )
}

export function ReactHookFormGroup() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      terms: true,
    },
  })

  return (
    <form onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}>
      <Stack>
        <Controller
          control={control}
          name="terms"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Checkbox
              checked={value}
              onBlur={onBlur}
              onChange={onChange}
              ref={ref}
            >
              I agree with the terms of service
            </Checkbox>
          )}
        />
        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  )
}

export function ReactWindow() {
  const numberOfItems = useMemo(() => 100000, [])

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
      <FixedSizeList
        height={300}
        itemCount={numberOfItems}
        itemSize={40}
        width={300}
        style={{
          border: 'var(--sl-border)',
        }}
      >
        {({ index, style }) => (
          <div key={index} style={style}>
            <Checkbox
              key={index}
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
          </div>
        )}
      </FixedSizeList>
    </Stack>
  )
}
