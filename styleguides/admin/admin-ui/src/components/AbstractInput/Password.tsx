import React, { forwardRef, Ref, useState } from 'react'
import { IconHide, IconPreview } from '@vtex/admin-ui-icons'

import { Button } from '../Button'
import { AbstractInput, AbstractInputProps } from './Text'

export const AbstractInputPassword = forwardRef(function AbstractInputPassword(
  props: AbstractInputPasswordProps,
  ref: Ref<HTMLInputElement>
) {
  const { styleOverrides = {}, ...inputProps } = props
  const [textVisible, setTextVisible] = useState(false)

  return (
    <AbstractInput
      ref={ref}
      type={textVisible ? 'text' : 'password'}
      styleOverrides={{
        paddingRight: 44,
        ...styleOverrides,
      }}
      {...inputProps}
      buttonElements={
        <Button
          icon={textVisible ? <IconHide /> : <IconPreview />}
          aria-label={`${textVisible ? 'hide' : 'show'} ${props.id} content`}
          onClick={() => setTextVisible((visible) => !visible)}
          size="small"
          variant="adaptative-dark"
          styleOverrides={{
            marginTop: 2,
          }}
        />
      }
    />
  )
})

export type AbstractInputPasswordProps = Omit<
  AbstractInputProps,
  'suffix' | 'type' | 'onClear'
>
