import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { Checkbox } from '../checkbox'
import { Box } from '../components/Box'

import { FormControl, FormControlLabel, FormControlMessage } from './index'
import type { FormControlProps } from './index'
import { I18nProvider } from '../i18n'

export default {
  title: 'admin-ui-review/form-control',
  component: FormControl,
} as Meta

interface FormControlPlaygroundProps extends FormControlProps {
  hasLabel: boolean
  label: string
  helpText: string
  errorText: string
}

export const FormControlPlayground: Story<FormControlPlaygroundProps> = (
  args
) => {
  const { label, helpText, errorText, hasLabel, ...remainingProps } = args

  return (
    <I18nProvider locale="en-US">
      <Box csx={{ margin: '$xs' }}>
        <FormControl {...remainingProps}>
          {hasLabel && <FormControlLabel>{label}</FormControlLabel>}
          <Checkbox label="Checkbox 1" />
          <Checkbox label="Checkbox 2" />
          <FormControlMessage helpText={helpText} errorText={errorText} />
        </FormControl>
      </Box>
    </I18nProvider>
  )
}

FormControlPlayground.args = {
  label: 'Group Label',
  hasLabel: true,
  optional: false,
  error: false,
  errorText: 'Error Text',
  helpText: 'Help Text',
}
