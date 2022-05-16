import React, { useEffect } from 'react'
import type { Meta, Story } from '@storybook/react'

import { Checkbox, useCheckboxState } from './checkbox'
import { CheckboxGroup } from './checkbox-group'
import { Box } from '../box'

import type { CheckboxProps } from './checkbox'
import type { CheckboxGroupProps } from './checkbox-group'

export default {
  title: 'admin-ui-review/checkbox',
  component: Checkbox,
  argTypes: {
    direction: {
      options: ['row', 'column'],
      control: { type: 'radio' },
      defaultValue: 'column',
    },
  },
} as Meta

interface CheckboxPlaygroundProps extends Omit<CheckboxProps, 'state'> {
  indeterminate: boolean
}

export const CheckboxPlayground: Story<CheckboxPlaygroundProps> = (args) => {
  const { indeterminate, ...remainingProps } = args
  const checkbox = useCheckboxState({
    initialValue: indeterminate ? 'indeterminate' : false,
  })

  useEffect(() => {
    checkbox.setValue(indeterminate ? 'indeterminate' : false)
  }, [indeterminate])

  return (
    <Box csx={{ margin: '$xs' }}>
      <Checkbox state={checkbox} {...remainingProps} />
    </Box>
  )
}

CheckboxPlayground.args = {
  label: 'Label',
  helpText: 'Help Text',
  indeterminate: false,
  disabled: false,
  error: false,
  errorText: 'Error Text',
}

export const CheckboxExample = () => {
  return (
    <Box csx={{ margin: '$xs' }}>
      <Checkbox
        label="I agree to the Terms of Service"
        helpText="You must select this option to use our services"
      />
    </Box>
  )
}

interface CheckboxGroupPlaygroundProps
  extends Omit<CheckboxGroupProps, 'state'> {
  checkboxCount: number
}

export const CheckboxGroupPlayground: Story<CheckboxGroupPlaygroundProps> = (
  args
) => {
  const { checkboxCount, ...remainingProps } = args

  return (
    <Box csx={{ margin: '$xs' }}>
      <CheckboxGroup {...remainingProps}>
        {[...Array(checkboxCount)].map((_, index) => (
          <Checkbox label={`Checkbox ${index}`} />
        ))}
      </CheckboxGroup>
    </Box>
  )
}

CheckboxGroupPlayground.args = {
  label: 'Group Label',
  helpText: 'Help Text',
  direction: 'column',
  error: false,
  errorText: 'Error Text',
  optional: false,
  optionalText: 'optional',
  checkboxCount: 4,
}

export const CheckboxGroupExample: Story<CheckboxGroupPlaygroundProps> = (
  args
) => {
  return (
    <Box csx={{ margin: '$xs' }}>
      <CheckboxGroup
        label="Contact Info"
        direction={args.direction}
        optionalText="optional"
        optional
      >
        <Checkbox label="Phone" helpText="All contacts will be made by call" />
        <Checkbox
          label="Cell Phone"
          helpText="All contacts will be  made via SMS"
        />
        <Checkbox
          label="Email"
          helpText="You will be subscribed to our newsletter"
        />
      </CheckboxGroup>
    </Box>
  )
}
