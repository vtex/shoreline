import React, { useState } from 'react'
import type { Meta } from '@storybook/react'

import { useMaskedInput, useFormatter } from '../index'
import { Input } from '../../components/Input'
import { Box } from '../../components/Box'

export default {
  title: 'admin-ui/use-masked-input',
} as Meta

export function CPFMask() {
  const [value, setValue] = useState('')

  const cpfFormatter = useFormatter({
    mask: '___.___.___-__',
    accept: /[\d]/gi,
  })

  const inputProps = useMaskedInput({
    value,
    onChange: setValue,
    format: cpfFormatter,
  })

  return (
    <Box
      csx={{
        width: 256,
      }}
    >
      <Input id="cpf" label="CPF" helperText="___.___.___-__" {...inputProps} />
    </Box>
  )
}

export function PhoneMask() {
  const [value, setValue] = useState('')

  const phoneFormatter = useFormatter({
    mask: '+__ (___) _____-____',
    accept: /[\d]/gi,
  })

  const inputProps = useMaskedInput({
    value,
    onChange: setValue,
    format: phoneFormatter,
  })

  return (
    <Box
      csx={{
        width: 256,
      }}
    >
      <Input
        id="phone"
        label="Phone"
        type="tel"
        helperText="+__ (___) _____-____"
        {...inputProps}
      />
    </Box>
  )
}

export function DateMask() {
  const [value, setValue] = useState('')

  const dateFormatter = useFormatter({
    mask: '__/__/____',
    accept: /[\d]/gi,
  })

  const inputProps = useMaskedInput({
    value,
    onChange: setValue,
    format: dateFormatter,
  })

  return (
    <Box
      csx={{
        width: 256,
      }}
    >
      <Input id="date" label="Date" helperText="dd/MM/aaaa" {...inputProps} />
    </Box>
  )
}

export function DateTimeMask() {
  const [value, setValue] = useState('')

  const dateTimeFormatter = useFormatter({
    mask: '__/__/____ : __:__:__',
    accept: /[\d]/gi,
  })

  const inputProps = useMaskedInput({
    value,
    onChange: setValue,
    format: dateTimeFormatter,
  })

  return (
    <Box
      csx={{
        width: 256,
      }}
    >
      <Input
        id="date"
        label="Date"
        helperText="dd/MM/aaaa : hh:mm:ss"
        {...inputProps}
      />
    </Box>
  )
}
