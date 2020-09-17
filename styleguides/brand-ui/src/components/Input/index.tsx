import React, { useState, useRef, PropsWithChildren, ReactNode } from 'react'
import { Box, Flex, Label, Input, Text, SxStyleProp } from 'theme-ui'
import { Input as ReakitInput, InputProps as BaseProps } from 'reakit/Input'

import { forwardRef } from '@vtex-components/utils'
import { useComponentSx, mergeSx } from '@vtex-components/theme'

const getLabelStyles = ({
  isIdle = true,
  size = 'regular',
  prefix = null,
}: {
  isIdle?: boolean
  size?: Size
  prefix?: ReactNode
}) => {
  const transitionY = {
    small: -18,
    regular: -24,
    large: -28
  }

  return mergeSx<SxStyleProp>(
    {
      color: 'muted.0',
      width: 'fit-content',
      position: 'absolute',
      pointerEvents: 'none',
      fontSize: 2,
      left: prefix ? 48 : 'auto',
      lineHeight: 'action',
      transition: 'transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
    },
    !isIdle
      ? {
          paddingX: 2,
          paddingY: 0,
          lineHeight: 'small',
          backgroundColor: 'white',
          transform: `translate(${prefix ? -44 : -12}px, ${transitionY[size]}px) scale(0.75)`,
        }
      : {}
  )
}

const BrandInput = (props: PropsWithChildren<InputProps>) => {
  const {
    size = 'regular',
    label,
    id,
    charLimit,
    helpMessage,
    prefix,
    suffix,
    sx = {},
    ...inputProps
  } = props
  const ref = useRef<HTMLInputElement>(null)
  const redirectFocus = () => ref.current?.focus()

  const styles = useComponentSx('input', {
    size,
  })
  const [charCount, setCharCount] = useState(0)

  return (
    <Box
      sx={{ margin: 2, width: 'fit-content' }}
      onFocus={() => redirectFocus()}
    >
      <ReakitInput {...inputProps}>
        {(enhancedProps) => {
          return (
            <Flex
              sx={{
                ...mergeSx<SxStyleProp>(styles, sx),
                'input:focus ~ label': getLabelStyles({
                  isIdle: false,
                  size,
                  prefix,
                }),
              }}
              {...enhancedProps}
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
                id={id}
                onChange={(e) => setCharCount(e.target.value.length)}
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
                htmlFor={id}
                sx={
                  charCount > 0
                    ? getLabelStyles({ isIdle: false, size, prefix })
                    : getLabelStyles({ isIdle: true, size, prefix })
                }
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
          )
        }}
      </ReakitInput>
      <Flex
        sx={{
          mt: 2,
          fontSize: 0,
          color: 'muted.1',
          justifyContent: 'space-between',
        }}
      >
        <Text>{helpMessage}</Text>
        {charLimit && (
          <Text>
            {charCount}/{charLimit}
          </Text>
        )}
      </Flex>
    </Box>
  )
}

export type Size = 'small' | 'regular' | 'large'

export interface InputProps extends Pick<BaseProps, 'sx'> {
  id: string
  helpMessage: string
  label: string
  charLimit?: number
  prefix?: ReactNode
  size?: Size
  suffix?: ReactNode
}

export default forwardRef(BrandInput)
