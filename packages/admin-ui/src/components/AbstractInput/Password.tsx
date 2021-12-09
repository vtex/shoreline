import type { Ref } from 'react'
import React, { forwardRef, useState } from 'react'
import { IconHide, IconPreview } from '@vtex/admin-ui-icons'

import { Button } from '../Button'
import type { AbstractInputProps } from './Text'
import { AbstractInput } from './Text'

export const AbstractInputPassword = forwardRef(function AbstractInputPassword(
  props: AbstractInputPasswordProps,
  ref: Ref<HTMLInputElement>
) {
  const { csx = {}, ...inputProps } = props
  const [textVisible, setTextVisible] = useState(false)

  return (
    <AbstractInput
      ref={ref}
      type={textVisible ? 'text' : 'password'}
      csx={{
        paddingRight: 44,
        ...csx,
      }}
      {...inputProps}
      buttonElements={
        <Button
          variant="adaptative-dark"
          icon={textVisible ? <IconHide /> : <IconPreview />}
          aria-label={`${textVisible ? 'hide' : 'show'} ${props.id} content`}
          onClick={() => setTextVisible((visible) => !visible)}
          size="small"
          csx={{
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
