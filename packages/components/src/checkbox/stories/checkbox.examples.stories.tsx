import React, { useMemo, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { FixedSizeList } from 'react-window'

import { Checkbox } from '../index'

import { Stack } from '../../stack'
import { Button } from '../../button'
import { Text } from '../../text'
import { Field, FieldDescription, FieldError } from '../../field'
import { Virtual, VirtualItem } from '@vtex/shoreline-primitives'

export default {
  title: 'components/checkbox/examples',
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
}

export function AsField() {
  return (
    <Stack space="$space-10">
      <Field error>
        <Checkbox>Terms and conditions</Checkbox>
        <FieldError>Something wrong</FieldError>
      </Field>
      <Field>
        <Checkbox>Terms and conditions</Checkbox>
        <FieldDescription>
          By clicking you agree with terms and conditions
        </FieldDescription>
      </Field>
      <Field error>
        <Checkbox>Terms and conditions</Checkbox>
        <FieldDescription>
          By clicking you agree with terms and conditions
        </FieldDescription>
        <FieldError>Something wrong</FieldError>
      </Field>
      <Field>
        <Checkbox defaultChecked disabled>
          Disabled
        </Checkbox>
        <FieldDescription>
          By clicking you agree with terms and conditions
        </FieldDescription>
      </Field>
    </Stack>
  )
}

export function Controlled() {
  const [checked, setChecked] = useState(true)

  return (
    <Stack>
      <Text variant="body">{checked ? 'Checked' : 'Unchecked'}</Text>
      <Button onClick={() => setChecked((c) => !c)}>Toggle</Button>
      <Checkbox
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      >
        Controlled
      </Checkbox>
    </Stack>
  )
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
      <Text variant="body"> Number of Checkboxes: {numberOfItems}</Text>

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
          border: 'var(--sl-border-base)',
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

export function VirtualPrimitive() {
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
