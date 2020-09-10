import React, { useRef, PropsWithChildren, ReactNode } from 'react'
import { Box, Flex, Input, Label, Text } from 'theme-ui'
import { useInput } from 'reakit/Input'

import { forwardRef } from '@vtex-components/utils'

const pickPadding = (size: Size) => {
  const variants = {
    regular: {
      px: 13,
      py: 9,
    },
    large: {
      px: 13,
      py: 13,
    },
  }

  return variants?.[size] ?? variants.regular
}

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

  return (
    <Box onFocus={() => redirectFocus()} onClick={() => redirectFocus()}>
      <Flex
        sx={{
          position: 'relative',
          width: 'fit-content',
          'input:focus ~ label': {
            padding: '0 4px',
            transition: 'all 0.2s ease-in-out',
            top: '-8px',
            left: '8px',
            backgroundColor: 'white',
            width: 'fit-content',
            fontSize: '14px',
            transform: 'scale(.8)',
            color: '#1976d2',
          },
        }}
        {...inputProps}
      >
        {prefix && (
          <Flex sx={{
            left: 0,
            margin: ".5em",
            position: "absolute",
            top: 1, alignItems: 'center'
          }} pl={5}>
            {prefix}
          </Flex>
        )}
        <Input
          onChange={(e) => console.log(e.target.value)}
          ref={ref}
          sx={{
            ...pickPadding(size),
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'muted.2',
            borderRadius: 6,
            width: 'fit-content',
            ':focus': {
              outline: 'none',
            },
          }}
        />
        <Label
          sx={{
            width: 'fit-content',
            display: 'inline-block',
            position: 'absolute',
            top: '20px',
            left: '40px',
            pointerEvents: 'none',
            color: 'rgba(0, 0, 0, 0.5)',
            transition: 'all 0.2s ease-in-out',
          }}
        >
          {label}
        </Label>
        {suffix && (
          <Flex sx={{
            right: 0,
            margin: ".5em",
            position: "absolute",
            top: 1, alignItems: 'center'
          }} pl={5}>
            {suffix}
          </Flex>
        )}
      </Flex>
      <div>{helpMessage && <HelpMessage text={helpMessage} />}</div>
    </Box>
  )
}

type HelpMessageProps = {
  text: string
}
const HelpMessage = ({ text }: HelpMessageProps) => (
  <Text sx={{ mt: 5, fontSize: 0, color: 'muted.1' }}>{text}</Text>
)

export type Size = 'regular' | 'large'

export interface InputProps {
  size?: Size
  helpMessage?: string
  label: string
  suffix?: ReactNode
  prefix?: ReactNode
}

export default forwardRef(BrandInput)
