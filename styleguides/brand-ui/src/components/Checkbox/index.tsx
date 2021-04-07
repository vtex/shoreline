/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, SxStyleProp, Box, Label, Text } from 'theme-ui'
import { Ref } from 'react'
import {
  Checkbox as ReakitCheckbox,
  CheckboxProps as ReakitCheckboxProps,
  useCheckboxState,
} from 'reakit/Checkbox'
import { forwardRef } from '@vtex-components/utils'

const BrandCheckbox = (
  { label, disabled, error, errorMessage, sx, ...restProps }: CheckboxProps,
  ref: Ref<HTMLInputElement>
) => (
  <Box variant="checkbox.container" sx={sx}>
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

export interface CheckboxProps
  extends Pick<
    ReakitCheckboxProps,
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
