import React, { forwardRef, ReactNode, Ref, useCallback, useState } from 'react'
import { useClassName, SxStyleProp } from '@vtex/admin-ui-system'
import { Input as ReakitInput, InputProps as ReakitInputProps } from 'reakit'

import { Overridable } from '../../types'
import { IconRemove } from '../../icons'
import { Box } from '../Box'

export const unstableInput = forwardRef(function Input(
  props: InputProps,
  ref: Ref<HTMLInputElement>
) {
  const {
    icon,
    suffix,
    onClear,
    styleOverrides,
    id,
    optionalFeature,
    ...htmlProps
  } = props

  const { value = '' } = props

  const resolvedThemeKey = `components.input.${getVariants({
    icon,
    suffix,
    onClear,
  })}`

  const inputClassName = useClassName({
    props: {
      styles: { ...styleOverrides },
    },
    themeKey: resolvedThemeKey,
  })

  function renderFeature() {
    const styles = {
      fontSize: 1,
      left: 9,
      paddingTop: 2,
      color: 'muted.1',
      marginBottom: 3,
      position: 'absolute',
      transform: 'translate(0, 16px) scale(1)',
      transformOrigin: 'top left',
      transition: 'all 0.2s ease-out;',
    } as SxStyleProp

    return optionalFeature?.(styles)
  }

  return (
    <Box themeKey={`components.input.container${icon ? '-with-icon' : ''}`}>
      {icon && (
        <Box element="span" themeKey="components.input.icon-style">
          {icon}
        </Box>
      )}
      <ReakitInput
        ref={ref}
        className={inputClassName}
        id={id}
        {...htmlProps}
      />
      {renderFeature()}
      {(!!suffix || onClear) && (
        <Box
          styles={{
            right: 0,
            top: 1,
            height: 46,
            paddingRight: 3,
            position: 'absolute',
            display: 'flex',
          }}
        >
          {!!onClear && value.toString().length > 0 && (
            <Box
              element="button"
              themeKey="components.input.clear-button-style"
              aria-label={`${id}-clear-button`}
              onClick={onClear}
            >
              <Box>
                <IconRemove size={15} />
              </Box>
            </Box>
          )}
          {!!suffix && (
            <Box element="span" themeKey="components.input.suffix-style">
              {suffix}
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
})

function getVariants({
  icon,
  suffix,
  onClear,
}: Pick<InputProps, 'icon' | 'suffix' | 'onClear'>) {
  if (!icon && !suffix && !onClear) {
    return 'default'
  }

  return `with${icon ? '-icon' : ''}${suffix ? '-suffix' : ''}${
    onClear ? '-clear' : ''
  }`
}

export function useInputState(): InputStateReturn {
  const [value, setValue] = useState('')

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    []
  )

  const onClear = useCallback(() => setValue(''), [])

  return { value, setValue, onChange, onClear }
}

export interface InputStateReturn {
  /** onClear input */
  onClear: () => void
  /** onChange input event */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  /** Input value */
  value: string
  /** Set input value state function */
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export interface InputProps extends Omit<ReakitInputProps, 'ref'>, Overridable {
  /** Input Icon */
  icon?: ReactNode
  /** Input Suffix */
  suffix?: string
  /** onClear input */
  onClear?: () => void
  /**
   * Render an optional feature
   */
  optionalFeature?: (styles: SxStyleProp) => void
}
