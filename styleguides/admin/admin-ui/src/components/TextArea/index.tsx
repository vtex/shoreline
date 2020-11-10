import React, { forwardRef, Ref } from 'react'
import { SxStyleProp, useClassName } from '@vtex/admin-ui-system'
import { ThemeDerivedStyles, ThemeUICSSObject } from '@theme-ui/css'

import { Text } from '../Text'
import { Label } from '../Label'
import { Overridable } from '../../types'
import { Columns } from '../Columns'
import { Box } from '../Box'

export const TextArea = forwardRef(function Textarea(
  props: TextAreaProps,
  ref: Ref<HTMLTextAreaElement>
) {
  const {
    id,
    label,
    styleOverrides,
    helperText,
    charLimit,
    state: { value = '', onChange },
    errorMessage,
    ...textareaProps
  } = props

  const labelClassName = useClassName({
    props: {
      styles: {
        paddingTop: 24,
        height: 100,
        resize: 'none',
        ...styleOverrides,
      },
    },
    themeKey: 'components.input.default',
  })

  function renderFeature() {
    const styles = {
      fontSize: 1,
      left: 12,
      paddingTop: 2,
      color: 'muted.1',
      marginBottom: 3,
      position: 'absolute',
      transform: 'translate(0, 16px) scale(1)',
      transformOrigin: 'top left',
      transition: 'all 0.2s ease-out;',
    } as SxStyleProp

    const generateLabel = (
      style: ThemeUICSSObject | ThemeDerivedStyles | undefined
    ) => (
      <Label styleOverrides={style} htmlFor={id}>
        {label}
      </Label>
    )

    return generateLabel?.(styles)
  }

  return (
    <Box themeKey={`components.textArea.${errorMessage ? 'error' : 'default'}`}>
      <textarea
        className={labelClassName}
        themeKey="components.input.default"
        id={id}
        ref={ref}
        placeholder=" "
        maxLength={charLimit}
        value={value}
        onChange={onChange}
        {...textareaProps}
      />
      {renderFeature()}
      {(!!helperText || !!errorMessage || !!charLimit) && (
        <Columns styleOverrides={{ paddingTop: 1 }}>
          {(!!helperText || !!errorMessage) && (
            <Columns.Item
              styleOverrides={{ display: 'flex', justifyContent: 'flex-start' }}
            >
              <Text
                variant="small"
                styleOverrides={{
                  color: errorMessage ? 'danger.base' : 'muted.1',
                }}
              >
                {errorMessage ?? helperText}
              </Text>
            </Columns.Item>
          )}
          {!!charLimit && (
            <Columns.Item
              units={3}
              styleOverrides={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <Text variant="small" styleOverrides={{ color: 'muted.1' }}>
                {`${value.toString().length}/${charLimit}`}
              </Text>
            </Columns.Item>
          )}
        </Columns>
      )}
    </Box>
  )
})

export interface TextAreaProps
  extends Overridable,
    Omit<
      React.ComponentPropsWithoutRef<'textarea'>,
      'value' | 'onChange' | 'maxLength' | 'onClear'
    > {
  /** label text */
  label: string
  /** unique id of the component */
  id: string
  /** Input helper text */
  helperText?: string
  /** Input char limit */
  charLimit?: number
  /**
   * Input state
   */
  state: TextAreaStateProps
  /**
   * TextArea error message
   */
  errorMessage?: string
  /**
   * TextArea element
   */
  as?: string
  /**
   * themeKey
   */
  themeKey?: string
}

export interface TextAreaStateProps {
  /** onChange input value event */
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  /** Input value */
  value: string | number
}
