import React, { useRef, PropsWithChildren, ReactNode } from 'react'
import { Box, Flex, Input, Label, Text } from 'theme-ui'
import { useInput } from 'reakit/Input'

import { forwardRef } from '@vtex-components/utils'
import { useComponentSx } from '@vtex-components/theme'

const BrandInput = (props: PropsWithChildren<InputProps>) => {
  const {
    size = 'regular',
    label,
    helpMessage,
    prefix,
    suffix,
    ...restProps
  } = props
  const ref = useRef<HTMLInputElement>(null)
  const redirectFocus = () => ref.current?.focus()
  const { children, ...inputProps } = useInput({}, restProps)
  const styles = useComponentSx('input', {
    size,
  })

  return (
    <Box m={2} onFocus={() => redirectFocus()} onClick={() => redirectFocus()}>
      <Flex
        sx={{
          ...styles,
          'input:focus ~ label': {
            lineHeight: 'small',
            px: 2,
            py: 0,
            top: -3,
            left: '16px',
            backgroundColor: 'white',
            fontSize: 0,
          },
        }}
        {...inputProps}
      >
        {prefix && (
          <Flex
            sx={{
              alignItems: 'center',
              mr: 3,
            }}
          >
            {prefix}
          </Flex>
        )}
        <Input
          onChange={(e) => console.log(e.target.value)}
          ref={ref}
          sx={{
            border: 'none',
            width: 'fit-content',
            p: 0,
            lineHeight: 'action',
            ':focus': {
              outline: 'none',
            },
          }}
        />
        <Label
          sx={{
            color: 'muted.0',
            width: 'fit-content',
            position: 'absolute',
            pointerEvents: 'none',
            fontSize: 2,
            left: prefix ? '44px' : 'auto',
            lineHeight: 'action',
            transition: 'all 0.2s ease-in-out',
          }}
        >
          {label}
        </Label>
        {suffix && (
          <Flex
            sx={{
              alignItems: 'center',
              ml: 3,
            }}
          >
            {suffix}
          </Flex>
        )}
      </Flex>
    <Text sx={{ mt: 2, fontSize: 0, color: 'muted.1' }}>{helpMessage}</Text>
    </Box>
  )
}

export type Size = 'small' | 'regular' | 'large'

export interface InputProps {
  helpMessage: string
  label: string
  prefix?: ReactNode
  size?: Size
  suffix?: ReactNode
}

export default forwardRef(BrandInput)
