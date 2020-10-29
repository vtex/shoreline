import React from 'react'
import { Meta, Story } from '@storybook/react'

import { Label } from '../Label'
import { Checkbox, useCheckboxState, CheckboxProps } from './index'
import { unstableThemeProvider as ThemeProvider } from '../unstableThemeProvider'
import { Text } from '../Text'

export default {
  title: 'beta/forms/Checkbox',
  component: Checkbox,
} as Meta

const Template: Story<Omit<CheckboxProps, 'checked'>> = (args) => {
  const [checked, setChecked] = React.useState(false)

  return (
    <ThemeProvider>
      <Checkbox
        {...args}
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
    </ThemeProvider>
  )
}

export const Playground = Template.bind({})
Playground.args = {
  'aria-label': 'label',
}

export const MultipleCheckboxes = () => {
  const props = useCheckboxState({ state: [] })

  return (
    <ThemeProvider>
      <Text>Checkboxes marked: {props.state}</Text>
      <Checkbox state={props} aria-label="label" value="checkbox1" />
      <Checkbox state={props} aria-label="label" value="checkbox2" />
      <Checkbox state={props} aria-label="label" value="checkbox3" />
    </ThemeProvider>
  )
}

export const Disabled = () => {
  return (
    <ThemeProvider>
      <Checkbox checked disabled />
      <Checkbox state={{ state: 'indeterminate' }} checked disabled />
      <Checkbox disabled />
    </ThemeProvider>
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
    <ThemeProvider>
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
    </ThemeProvider>
  )
}
