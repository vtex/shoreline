/** @jsx jsx */
import { jsx, SxStyleProp } from 'theme-ui'
import { Ref } from 'react'
import {
  Checkbox as ReakitCheckbox,
  CheckboxProps as BaseProps,
  useCheckboxState,
} from 'reakit'
import { Box, Label, Text } from 'theme-ui'
import { forwardRef } from '@vtex-components/utils'

const BrandCheckbox = (props: CheckboxProps, ref: Ref<HTMLInputElement>) => {
  const { label, disabled, error, errorMessage, ...restProps } = props

  return (
    <Box>
      <Label variant={`checkbox.label${disabled ? '.disabled' : ''}`}>
        <ReakitCheckbox
          disabled={disabled}
          ref={ref}
          sx={{ variant: `checkbox${error ? '.error' : ''}` }}
          {...restProps}
        />
        {label}
      </Label>
      {error && errorMessage && (
        <Text variant="checkbox.errorMessage">{errorMessage}</Text>
      )}
    </Box>
  )
}

export interface CheckboxProps
  extends Pick<
    BaseProps,
    | 'checked'
    | 'disabled'
    | 'onChange'
    | 'onClick'
    | 'required'
    | 'state'
    | 'setState'
    | 'value'
  > {
  label: string
  error?: boolean
  errorMessage?: string
  sx?: SxStyleProp
}

export const Checkbox = forwardRef(BrandCheckbox)
export { useCheckboxState }
