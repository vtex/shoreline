/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Flex, Text, Box, Label } from 'theme-ui'
import { ChangeEvent, PropsWithChildren, useRef } from 'react'

import { IconCaret } from '../../icons'
import { InputProps } from '../Input'
import useInputState from '../Input/useInputState'

const Option = (props: PropsWithChildren<OptionProps>) => (
  <option sx={{ variant: 'select.option' }} {...props} />
)

interface OptionProps {
  value: string | number
  disabled?: boolean
}

export const Select = (props: PropsWithChildren<SelectProps>) => {
  const {
    id,
    label,
    readOnly = false,
    children,
    helpMessage,
    size = 'regular',
    error,
    value,
    sx = {},
    darkMode,
    disabled = false,
    ...restProps
  } = props

  const ref = useRef<HTMLSelectElement>(null)
  const redirectFocus = () => ref.current?.focus()

  const { state, setFocused, transform } = useInputState({
    disabled,
    readOnly,
    error,
    value,
  })

  const labelVariant = `input.label.${size}-${
    transform && value ? 'translate' : 'default'
  }`
  const helpMessageVariant = `input.helpMessage${
    darkMode ? '.dark' : ''
  }.${state}`

  const isDisabled = disabled || readOnly

  return (
    <Box variant="select.container" sx={sx}>
      <Flex
        variant={`input.${size}-${state}${darkMode ? '-dark' : ''}`}
        sx={{ minWidth: ['100%', '100%', '22rem'], px: 0 }}
        onFocus={redirectFocus}
      >
        <select
          id={id}
          ref={ref}
          value={value}
          sx={{
            variant: `select${isDisabled ? '.disabled' : ''}`,
            color: darkMode && !readOnly ? 'white' : 'black',
            fontSize: size === 'regular' ? '18px' : '22px',
            pt: size === 'regular' ? 4 : 5,
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={isDisabled}
          {...restProps}
        >
          {children}
        </select>
        <IconCaret
          sx={{
            variant: 'select.arrow',
            color: darkMode && !readOnly ? 'white' : 'black',
          }}
          size={30}
          direction="down"
        />
        <Label
          htmlFor={id}
          variant={labelVariant}
          sx={{ pl: 5, pt: transform && value ? 3 : 0 }}
        >
          {label}
        </Label>
      </Flex>
      <Flex variant={helpMessageVariant}>
        <Text>{helpMessage}</Text>
      </Flex>
    </Box>
  )
}

export interface SelectProps
  extends Omit<InputProps, 'charLimit' | 'prefix' | 'suffix'> {
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
}

Select.Option = Option
