import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import { Box } from '@vtex/admin-primitives'

import type { AbstractInputProps } from '../AbstractInput'
import { AbstractInput } from '../AbstractInput'
import { Text } from '../Text'
import { Label } from '../Label'
import type { SystemComponentProps } from '../../types'

export const Input = forwardRef(function Input(
  props: InputProps,
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

  const message = error ? errorMessage : helperText

  return (
    <Box
      csx={{
        display: 'flex',
        position: 'relative',
        justifyContent: 'flex-start',
        flexDirection: 'column',
      }}
    >
      <AbstractInput
        value={value}
        id={id}
        ref={ref}
        placeholder=" "
        maxLength={charLimit}
        csx={{ paddingTop: 4, ...csx }}
        error={error}
        labelElement={
          <Label
            csx={{
              fontSize: 1,
              left: 12,
              paddingTop: 2,
              color: 'mid.primary',
              marginBottom: 3,
              position: 'absolute',
              transform: 'translate(0, 16px) scale(1)',
              transformOrigin: 'top left',
              transition: 'all 0.2s ease-out;',
            }}
            htmlFor={id}
          >
            {label}
          </Label>
        }
        {...inputProps}
      />
      {(message || !!charLimit) && (
        <Box
          csx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: '',
            paddingTop: 1,
          }}
        >
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

export type InputType = 'text' | 'email' | 'url' | 'tel'

export type InputOwnProps = Omit<
  AbstractInputProps,
  'maxLength' | 'placeholder' | 'id' | 'type'
>

export interface InputProps extends SystemComponentProps<InputOwnProps> {
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
  /** Input type */
  type?: InputType
}
