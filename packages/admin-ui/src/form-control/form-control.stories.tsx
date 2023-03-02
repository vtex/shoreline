import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { Checkbox } from '../checkbox'
import { Box } from '../box'
import { FormControl, FormControlLabel, FormControlMessage } from './index'
import { I18nProvider } from '../i18n'

export default {
  title: 'admin-ui-review/form-control',
  component: FormControl,
} as Meta

interface FormControlPlaygroundProps {
  hasLabel: boolean
  label: string
  helpText: string
  errorText: string
  optional: boolean
  error: boolean
}

export const FormControlPlayground: Story<FormControlPlaygroundProps> = (
  args
) => {
  const { label, helpText, errorText, hasLabel, optional, error } = args

  return (
    <I18nProvider locale="en-US">
      <Box csx={{ margin: '$space-1 $space-2' }}>
        <FormControl>
          {hasLabel && (
            <FormControlLabel optional={optional}>{label}</FormControlLabel>
          )}
          <Checkbox label="Checkbox 1" />
          <Checkbox label="Checkbox 2" />
          <FormControlMessage
            error={error}
            helpText={helpText}
            errorText={errorText}
          />
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
