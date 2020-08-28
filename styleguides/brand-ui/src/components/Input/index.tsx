import React, { useRef, PropsWithChildren, ReactNode } from 'react'
import { Box, Flex, Input, Label, Text } from 'theme-ui'
import { useInput } from 'reakit/Input'

import { forwardRef } from '@vtex-components/utils'

const pickPadding = (size: Size, focus: boolean) => {
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
  if (focus) {
    variants.regular.py = 5
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
    focus,
    ...restProps
  } = props
  const ref = useRef<HTMLInputElement>(null)
  const redirectFocus = () => ref.current?.focus()
  const { children, ...inputProps } = useInput({}, restProps)

  return (
    <Box
      onFocus={() => redirectFocus()}
      onClick={() => redirectFocus()}
    >
      <Flex
        sx={{
          ...pickPadding(size, focus),
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'muted.2',
          borderRadius: 6,
          width: 'fit-content',
          ':focus-within': {
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'secondary.base',
            outline: 'none',
          },
        }}
        {...inputProps}
      >
        {prefix && <Prefix prefix={prefix} />}
        <span>
          {focus && (
            <Label sx={{ fontSize: 0, lineHeight: '1rem' }}>
              {label}
            </Label>
          )}
          <Input
            ref={ref}
            sx={{
              border: 'none',
              padding: 0,
              ':focus': {
                outline: 'none',
                ":placeholder-shown": {

                }
              },
            }}
            placeholder={label}
          />
        </span>
        {suffix && <Suffix suffix={suffix} />}
      </Flex>
      {helpMessage && <HelpMessage text={helpMessage} />}
    </Box>
  )
}

type PrefixProps = {
  prefix: ReactNode
}

const Prefix = ({ prefix }: PrefixProps) => (
  <Flex sx={{ alignItems: 'center' }} pl={5}>
    {prefix}
  </Flex>
)

type SuffixProps = {
  suffix: ReactNode
}

const Suffix = ({ suffix }: SuffixProps) => (
  <Flex sx={{ alignItems: 'center' }} pl={5}>
    {suffix}
  </Flex>
)

type HelpMessageProps = {
  text: string
}
const HelpMessage = ({ text }: HelpMessageProps) => (
  <Text sx={{ mt: 5, fontSize: 0, color: 'muted.1' }}>
    {text}
  </Text>
)

export type Size = 'regular' | 'large'

export interface InputProps {
  size?: Size
  helpMessage?: string
  label: string
  suffix?: ReactNode
  prefix?: ReactNode
  focus?: boolean // Temporary (should be the actual state)
}

export default forwardRef(BrandInput)
