import React, { forwardRef, ReactNode, Ref } from 'react'
import { Input as ReakitInput, InputProps as ReakitInputProps } from 'reakit'
import { IconCancel, IconContainer } from '@vtex/admin-ui-icons'

import { Button } from '../Button'
import { Overridable } from '../../types'
import { Box } from '../Box'
import { stylesOf, cn } from '../../system'

const inlineVariant = (sequence: Array<[boolean, string]>) =>
  sequence.reduce((acc, item) => {
    const [invariant, modifier] = item

    return invariant ? `${acc}${modifier}` : acc
  }, '')

export const AbstractInput = forwardRef(function AbstractInput(
  props: AbstractInputProps,
  ref: Ref<HTMLInputElement>
) {
  const {
    value = '',
    styleOverrides = {},
    error = false,
    icon,
    suffix,
    onClear,
    labelElement,
    buttonElements,
    ...inputProps
  } = props

  const showClear = !!onClear && value.toString().length > 0
  const showButtons = !!suffix || !!buttonElements || onClear

  const inputClassName = cn({
    themeKey: `components.abstractInput.input${inlineVariant([
      [error, '-error'],
      [!!icon, '-icon'],
      [!!suffix, '-suffix'],
      [!!onClear, '-clear'],
    ])}`,
    ...styleOverrides,
  })

  return (
    <Box
      themeKey={`components.abstractInput.container${inlineVariant([
        [!!icon, '-icon'],
      ])}`}
    >
      {icon && (
        <IconContainer
          space="regular"
          styles={stylesOf('components.abstractInput.icon')}
        >
          {icon}
        </IconContainer>
      )}
      <ReakitInput
        value={value}
        ref={ref}
        className={inputClassName}
        {...inputProps}
      />
      {labelElement}
      {showButtons && (
        <Box themeKey="components.abstractInput.buttons">
          {showClear && (
            <Button
              icon={<IconCancel />}
              aria-label={`clear ${inputProps.id} text`}
              onClick={onClear}
              size="small"
              variant="adaptative-dark"
              styleOverrides={{
                marginTop: 2,
                marginRight: 1,
              }}
            />
          )}
          {buttonElements}
          {suffix && (
            <Box element="span" themeKey="components.abstractInput.suffix">
              {suffix}
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
})

export type AbstractInputOwnProps = Omit<
  ReakitInputProps,
  'sx' | 'ref' | 'as' | 'onChange'
>

export interface AbstractInputProps
  extends OmitNotAllowedProps<AbstractInputOwnProps>,
    Overridable {
  /** Input Icon */
  icon?: ReactNode
  /** Input Suffix */
  suffix?: string
  /** onClear input */
  onClear?: () => void
  /** Render an optional label */
  labelElement?: ReactNode
  /** Button elements */
  buttonElements?: ReactNode
  /** onChange event */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  /** Input error state */
  error?: boolean
}
