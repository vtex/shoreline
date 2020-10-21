import React, { forwardRef, Ref } from 'react'
import { useClassName } from '@vtex/admin-ui-system'

import { unstableInput as Input, InputProps } from '../unstableInput'
import { Label } from '../Label'

export const unstableTextField = forwardRef(function Textfield(
  props: TextFieldProps,
  ref: Ref<HTMLInputElement>
) {
  const { id, label, styleOverrides, ...inputProps } = props
  const className = useClassName({
    props: { styles: styleOverrides },
    themeKey: 'components.textField',
  })

  return (
    <div className={className}>
      <Input id={id} ref={ref} placeholder=" " {...inputProps} />
      <Label htmlFor={id}>{label}</Label>
    </div>
  )
})

interface TextFieldProps extends InputProps {
  /** label text */
  label: string
  /** unique id of the component */
  id: string
}
