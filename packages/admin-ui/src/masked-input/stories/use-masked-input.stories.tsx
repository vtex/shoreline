import React, { useState } from 'react'
import type { Meta } from '@storybook/react'

import { useMaskedInput, useFormatter } from '../index'
import { TextInput } from '../../text-input'
import { Box } from '../../box'

export default {
  title: 'admin-ui/use-masked-input',
} as Meta

export function CPFMask() {
  const [value, setValue] = useState('')

  const cpfFormatter = useFormatter({
    mask: '___.___.___-__',
  })

  const inputProps = useMaskedInput({
    value,
    onChange: setValue,
    formatter: cpfFormatter,
  })

  return (
    <Box
      csx={{
        width: 256,
      }}
    >
      <TextInput
        id="cpf"
        label="CPF"
        helpText="___.___.___-__"
        {...inputProps}
      />
    </Box>
  )
}

export function PhoneMask() {
  const [value, setValue] = useState('')

  const phoneFormatter = useFormatter({
    mask: '+__ (___) _____-____',
  })

  const inputProps = useMaskedInput({
    value,
    onChange: setValue,
    formatter: phoneFormatter,
  })

  return (
    <Box
      csx={{
        width: 256,
      }}
    >
      <TextInput
        id="phone"
        label="Phone"
        type="tel"
        helpText="+__ (___) _____-____"
        {...inputProps}
      />
    </Box>
  )
}

export function DateMask() {
  const [value, setValue] = useState('')

  const dateFormatter = useFormatter({
    mask: '__/__/____',
  })

  const inputProps = useMaskedInput({
    value,
    onChange: setValue,
    formatter: dateFormatter,
  })

  return (
    <Box
      csx={{
        width: 256,
      }}
    >
      <TextInput id="date" label="Date" helpText="dd/MM/aaaa" {...inputProps} />
    </Box>
  )
}

export function DateTimeMask() {
  const [value, setValue] = useState('')

  const dateTimeFormatter = useFormatter({
    mask: '__/__/____ : __:__:__',
  })

  const inputProps = useMaskedInput({
    value,
    onChange: setValue,
    formatter: dateTimeFormatter,
  })

  return (
    <Box
      csx={{
        width: 256,
      }}
    >
      <TextInput
        id="date"
        label="Date"
        helpText="dd/MM/aaaa : hh:mm:ss"
        {...inputProps}
      />
    </Box>
  )
}
