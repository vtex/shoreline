import React, { useEffect, useRef } from 'react'
import type { Meta, Story } from '@storybook/react'

// import { Label } from '../Label'
import { Checkbox } from './checkbox'
import { CheckboxGroup } from './checkbox-group'
// import { Text } from '../Text'

export default {
  title: 'admin-ui-review/checkbox',
  component: Checkbox,
} as Meta

export const Playground: Story = (args) => {
  const ref = useRef<HTMLInputElement>(null)
  const ref2 = useRef<HTMLInputElement>(null)
  const ref3 = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ref?.current) {
      ref.current.indeterminate = true
    }

    if (ref2?.current) {
      ref2.current.indeterminate = true
    }

    if (ref3?.current) {
      ref3.current.indeterminate = true
    }
  }, [])

  return (
    <>
      <Checkbox label="Label" helpText="Help text" />
      <Checkbox ref={ref} label="Label" helpText="Help text" />
      <Checkbox label="Label" helpText="Help text" checked />
      <Checkbox
        label="Label"
        helpText="Help text"
        errorText="Error text"
        error
      />
      <Checkbox
        ref={ref3}
        label="Label"
        helpText="Help text"
        errorText="Error text"
        error
      />
      <Checkbox
        label="Label"
        helpText="Help text"
        errorText="Error text"
        error
        checked
      />
      <Checkbox
        label="Label"
        helpText="Help text"
        errorText="Error text"
        error
        disabled
      />
      <Checkbox
        ref={ref2}
        label="Label"
        helpText="Help text"
        errorText="Error text"
        error
        disabled
      />
      <Checkbox
        label="Label"
        helpText="Help text"
        errorText="Error text"
        checked
        error
        disabled
      />
    </>
  )
}

Playground.args = {
  'aria-label': 'label',
}

// export const MultipleCheckboxes = () => {
//   const props = useCheckboxState({ state: [] })

//   return (
//     <>
//       <Text>Checkboxes marked: {props.state}</Text>
//       <Checkbox state={props} aria-label="label" value="checkbox1" />
//       <Checkbox state={props} aria-label="label" value="checkbox2" />
//       <Checkbox state={props} aria-label="label" value="checkbox3" />
//     </>
//   )
// }

export const Disabled = () => {
  const ref = useRef<HTMLInputElement>(null)
  const ref2 = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ref?.current) {
      ref.current.indeterminate = true
    }

    if (ref2?.current) {
      ref2.current.indeterminate = true
    }
  }, [])

  return (
    <>
      <CheckboxGroup
        label="Group label"
        direction="column"
        helpText="Help Text"
        errorText="Error Text"
        error
      >
        <Checkbox label="Label" />
        <Checkbox label="Label" />
        <Checkbox label="Label" />
        <Checkbox label="Label" />
      </CheckboxGroup>
    </>
  )
}

// export const IndeterminateExample = () => {
//   function useTreeState({ values }: { values: string[] }) {
//     const { state: group, setState: setGroup } = useCheckboxState({ state: [] })
//     const { state: items, setState: setItems } = useCheckboxState({ state: [] })

//     // updates items when group is toggled
//     React.useEffect(() => {
//       if (group === true) {
//         setItems(values)
//       } else if (group === false) {
//         setItems([])
//       }
//     }, [group, setItems, values])

//     // updates group when items is toggled
//     React.useEffect(() => {
//       if (items instanceof Array && items.length === values.length) {
//         setGroup(true)
//       } else if (items instanceof Array && items.length) {
//         setGroup('indeterminate')
//       } else {
//         setGroup(false)
//       }
//     }, [items, setGroup, values])

//     return { group, items, setItems, setGroup }
//   }

//   const values = React.useMemo(() => ['Apple', 'Orange', 'Watermelon'], [])
//   const { group, setGroup, items, setItems } = useTreeState({ values })

//   return (
//     <>
//       <Label csx={{ display: 'flex', alignItems: 'center' }}>
//         <Checkbox state={{ state: group, setState: setGroup }} />
//         Fruits ( Group Control )
//       </Label>
//       <br />
//       {values.map((fruit, key) => {
//         return (
//           <Label key={key} csx={{ display: 'flex', alignItems: 'center' }}>
//             <Checkbox
//               state={{ state: items, setState: setItems }}
//               value={fruit}
//             />
//             {fruit}
//           </Label>
//         )
//       })}
//     </>
//   )
// }
