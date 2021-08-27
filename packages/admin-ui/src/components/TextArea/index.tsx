import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import { Box } from '@vtex/admin-primitives'
import { tag } from '@vtex/admin-ui-react'

import { Text } from '../Text'
import { Label } from '../Label'
import type { SystemComponentProps } from '../../types'

export const TextArea = forwardRef(function Textarea(
  props: TextAreaProps,
  ref: Ref<HTMLTextAreaElement>
) {
  const {
    id,
    label,
    csx,
    helperText,
    charLimit,
    value = '',
    error = false,
    onChange,
    errorMessage,
    ...textareaProps
  } = props

  const message = error ? errorMessage : helperText

  return (
    <Box
      csx={{
        display: 'flex',
        position: 'relative',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        width: 'full',
        textarea: error
          ? {
              borderColor: 'red',
              ':focus': {
                borderColor: 'red',
                boxShadow: 'inputFocusError',
              },
              ':hover': {
                borderColor: 'red.hover',
              },
            }
          : {},
      }}
    >
      <tag.textarea
        csx={{
          fontFamily: 'sans',
          paddingTop: 24,
          height: 100,
          resize: 'none',
          fontSettings: 'regular',
          width: 'full',
          borderStyle: 'solid',
          borderWidth: 1,
          paddingLeft: 3,
          paddingRight: 4,
          borderColor: 'mid.secondary',
          borderRadius: 'default',
          bg: 'inherit',
          marginY: 1,
          fontSize: 1,
          color: 'dark.primary',
          outline: 0,
          transition: 'snap',
          ':hover': {
            borderColor: 'dark.primary',
          },
          ':focus': {
            borderColor: 'blue',
            boxShadow: 'inputFocus',
          },
          ':disabled': {
            bg: 'light.secondary',
            color: 'mid.primary',
          },
          // Label styles
          ':focus + label': {
            transform: 'translate(1px, 4px) scale(0.875)',
          },
          ':placeholder-shown:not(:focus) + label': {
            paddingTop: 1,
          },
          ':not(:placeholder-shown) + label': {
            transform: 'translate(1px, 4px) scale(0.875)',
          },
          ...csx,
        }}
        id={id}
        ref={ref}
        placeholder=" "
        maxLength={charLimit}
        value={value}
        onChange={onChange}
        {...textareaProps}
      />
      <Label
        htmlFor={id}
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
      >
        {label}
      </Label>
      {(message || !!charLimit) && (
        <Box
          csx={{
            display: 'flex',
            justifyContent: 'space-between',
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
          {charLimit && (
            <Text variant="small" csx={{ color: 'mid.primary' }}>
              {`${value.toString().length}/${charLimit}`}
            </Text>
          )}
        </Box>
      )}
    </Box>
  )
})

export type TextAreaOwnProps = Omit<
  React.ComponentPropsWithoutRef<'textarea'>,
  'value' | 'onChange' | 'maxLength' | 'onClear'
>

export interface TextAreaProps extends SystemComponentProps<TextAreaOwnProps> {
  /** TextArea label */
  label: string
  /** Unique id of the component */
  id: string
  /** TextArea helper text */
  helperText?: string
  /** TextArea char limit */
  charLimit?: number
  /** onChange TextArea value event */
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  /** TextArea value */
  value: string | number
  /** TextArea with error */
  error?: boolean
  /**
   * TextArea error message
   */
  errorMessage?: string
}
