import React from 'react'
import { Meta, Story } from '@storybook/react'

import { Label } from '../Label'
import { Checkbox, useCheckboxState } from './index'
import { Text } from '../Text'

export default {
  title: 'admin-ui/Checkbox',
  component: Checkbox,
} as Meta

export const Playground: Story = (args) => {
  const [checked, setChecked] = React.useState(false)

  return (
    <Checkbox
      checked={checked}
      onChange={() => setChecked(!checked)}
      {...args}
    />
  )
}

Playground.args = {
  'aria-label': 'label',
}

export const MultipleCheckboxes = () => {
  const props = useCheckboxState({ state: [] })

  return (
    <>
      <Text>Checkboxes marked: {props.state}</Text>
      <Checkbox state={props} aria-label="label" value="checkbox1" />
      <Checkbox state={props} aria-label="label" value="checkbox2" />
      <Checkbox state={props} aria-label="label" value="checkbox3" />
    </>
  )
}

export const Disabled = () => {
  return (
    <>
      <Checkbox checked disabled />
      <Checkbox state={{ state: 'indeterminate' }} checked disabled />
      <Checkbox disabled />
    </>
  )
}

export const IndeterminateExample = () => {
  function useTreeState({ values }: { values: string[] }) {
    const { state: group, setState: setGroup } = useCheckboxState({ state: [] })
    const { state: items, setState: setItems } = useCheckboxState({ state: [] })

    // updates items when group is toggled
    React.useEffect(() => {
      if (group === true) {
        setItems(values)
      } else if (group === false) {
        setItems([])
      }
    }, [group, setItems, values])

    // updates group when items is toggled
    React.useEffect(() => {
      if (items instanceof Array && items.length === values.length) {
        setGroup(true)
      } else if (items instanceof Array && items.length) {
        setGroup('indeterminate')
      } else {
        setGroup(false)
      }
    }, [items, setGroup, values])

    return { group, items, setItems, setGroup }
  }

  const values = React.useMemo(() => ['Apple', 'Orange', 'Watermelon'], [])
  const { group, setGroup, items, setItems } = useTreeState({ values })

  return (
    <>
      <Label styleOverrides={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox state={{ state: group, setState: setGroup }} />
        Fruits ( Group Control )
      </Label>
      <br />
      {values.map((fruit, key) => {
        return (
          <Label
            key={key}
            styleOverrides={{ display: 'flex', alignItems: 'center' }}
          >
            <Checkbox
              state={{ state: items, setState: setItems }}
              value={fruit}
            />
            {fruit}
          </Label>
        )
      })}
    </>
  )
}
