import React from 'react'
import { Meta, Story } from '@storybook/react'

import { Label } from '../Label'
import { Checkbox, useCheckbox, CheckboxProps } from './index'
import { Text } from '../Text'

export default {
  title: 'beta/Checkbox',
  component: Checkbox,
} as Meta

const Template: Story<Omit<CheckboxProps, 'checked'>> = (args) => {
  const [checked, setChecked] = React.useState(false)

  return (
    <Checkbox
      {...args}
      checked={checked}
      onChange={() => setChecked(!checked)}
    />
  )
}

export const Playground = Template.bind({})
Playground.args = {
  'aria-label': 'label',
}
Playground.parameters = {
  playroom: {
    code: `
<Play.ToggleState>
  {({ toggle, setToggle }) => (
    <Checkbox
      aria-label="label"
      checked={toggle}
      onChange={() => setToggle(!toggle)}
    />
  )}
</Play.ToggleState>
    `,
  },
}

export const MultipleCheckboxes = () => {
  const props = useCheckbox({ state: [] })

  return (
    <>
      <Text>Checkboxes marked: {props.state}</Text>
      <Checkbox {...props} aria-label="label" value="checkbox1" />
      <Checkbox {...props} aria-label="label" value="checkbox2" />
      <Checkbox {...props} aria-label="label" value="checkbox3" />
    </>
  )
}

MultipleCheckboxes.parameters = {
  playroom: {
    code: `
<Play.CheckboxState state={[]}>
    {({ state, setState }) => (
      <>
        <Text>State: {state}</Text>
        <br />
        <Checkbox
          state={state}
          setState={setState}
          aria-label="label1"
          value="toggle1"
        />
        <Checkbox
          state={state}
          setState={setState}
          aria-label="label2"
          value="toggle2"
        />
        <Checkbox
          state={state}
          setState={setState}
          aria-label="label3"
          value="toggle3"
        />
      </>
    )}
  </Play.CheckboxState>
    `,
  },
}

export const Disabled = () => {
  return (
    <>
      <Checkbox checked disabled />
      <Checkbox state="indeterminate" checked disabled />
      <Checkbox disabled />
    </>
  )
}

export const IndeterminateExample = () => {
  function useTreeState({ values }: { values: string[] }) {
    const { state: group, setState: setGroup } = useCheckbox({ state: [] })
    const { state: items, setState: setItems } = useCheckbox({ state: [] })

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
      <Label display="flex" items="center">
        <Checkbox state={group} setState={setGroup} />
        Fruits ( Group Control )
      </Label>
      <br />
      {values.map((fruit, key) => {
        return (
          <Label key={key} display="flex" items="center">
            <Checkbox state={items} setState={setItems} value={fruit} />
            {fruit}
          </Label>
        )
      })}
    </>
  )
}

IndeterminateExample.parameters = {
  previewTabs: {
    'storybook/playroom/panel': {
      hidden: true,
    },
  },
}
