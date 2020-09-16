import React, { useState, useRef, PropsWithChildren, ReactNode } from 'react'
import { Box, Flex, Label, Input, Text, SxStyleProp } from 'theme-ui'
import { Input as ReakitInput, InputProps as BaseProps } from 'reakit/Input'

import { forwardRef } from '@vtex-components/utils'
import { useTheme, get, useComponentSx, mergeSx } from '@vtex-components/theme'

const getFocusStyles = () => {
  const theme = useTheme()
  return {
    borderColor: 'secondary.hover',
    boxShadow: `0 0 0 ${get(theme, 'borderWidths.2')}px ${get(
      theme,
      'colors.focus'
    )}`,
  }
}

const getLabelStyles = ({
  isIdle = true,
  prefix = null,
}: {
  isIdle?: boolean
  prefix?: ReactNode
}) => {
  return mergeSx<SxStyleProp>(
    {
      color: 'muted.0',
      width: 'fit-content',
      position: 'absolute',
      pointerEvents: 'none',
      fontSize: 2,
      left: prefix ? 48 : 'auto',
      lineHeight: 'action',
      transition: 'all 0.2s ease-in-out',
    },
    !isIdle
      ? {
          paddingX: 2,
          paddingY: 0,
          top: -3,
          left: 4,
          lineHeight: 'small',
          fontSize: 0,
          backgroundColor: 'white',
        }
      : {}
  )
}

const BrandInput = (props: PropsWithChildren<InputProps>) => {
  const {
    size = 'regular',
    label,
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
                  prefix,
                }),
                ':focus-within': getFocusStyles(),
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
                sx={
                  charCount > 0
                    ? getLabelStyles({ isIdle: false, prefix })
                    : getLabelStyles({ isIdle: true, prefix })
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
            {charCount} / {charLimit}
          </Text>
        )}
      </Flex>
    </Box>
  )
}

export type Size = 'small' | 'regular' | 'large'

export interface InputProps extends Pick<BaseProps, 'sx'> {
  helpMessage: string
  label: string
  charLimit?: number
  prefix?: ReactNode
  size?: Size
  suffix?: ReactNode
}

export default forwardRef(BrandInput)
