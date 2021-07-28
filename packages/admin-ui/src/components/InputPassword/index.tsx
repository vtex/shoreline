import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import { Box } from '@vtex/admin-primitives'
import { useSystem } from '@vtex/admin-core'

import type { AbstractInputPasswordProps } from '../AbstractInput'
import { AbstractInputPassword } from '../AbstractInput'
import { Text } from '../Text'
import { Label } from '../Label'
import type { SystemComponentProps } from '../../types'

export const InputPassword = forwardRef(function InputPassword(
  props: InputPasswordProps,
  ref: Ref<HTMLInputElement>
) {
  const {
    csx = {},
    value = '',
    error = false,
    id,
    label,
    helperText,
    charLimit,
    errorMessage,
    ...inputProps
  } = props

  const { stylesOf } = useSystem()

  const message = error ? errorMessage : helperText

  return (
    <Box csx={{ themeKey: 'components.input.container' }}>
      <AbstractInputPassword
        value={value}
        id={id}
        ref={ref}
        placeholder=" "
        maxLength={charLimit}
        csx={{ paddingTop: 4, ...csx }}
        error={error}
        labelElement={
          <Label csx={stylesOf('components.input.floating-label')} htmlFor={id}>
            {label}
          </Label>
        }
        {...inputProps}
      />
      {(message || !!charLimit) && (
        <Box csx={{ themeKey: 'components.input.text-container' }}>
          {message ? (
            <Text variant="small" feedback={error ? 'danger' : 'secondary'}>
              {message}
            </Text>
          ) : (
            <div>{/** spacer element */}</div>
          )}
          {!!charLimit && (
            <Text variant="small" feedback="secondary">
              {`${value.toString().length}/${charLimit}`}
            </Text>
          )}
        </Box>
      )}
    </Box>
  )
})

export type InputPasswordOwnProps = Omit<
  AbstractInputPasswordProps,
  'maxLength' | 'placeholder' | 'id' | 'type'
>

export interface InputPasswordProps
  extends SystemComponentProps<InputPasswordOwnProps> {
  /** label text */
  label: string
  /** unique id of the component */
  id: string
  /** Input helper text */
  helperText?: string
  /** Input char limit */
  charLimit?: number
  /** Input error message */
  errorMessage?: string
}
