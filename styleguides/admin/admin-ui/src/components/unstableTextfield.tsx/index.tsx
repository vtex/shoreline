import React, { forwardRef, Ref } from 'react'

import { useCx } from '../../system-next'
import { unstableInput as Input, InputProps } from '../unstableInput'
import { Label } from '../Label'

export const unstableTextfield = forwardRef(function Textfield(
  props: TextfieldProps,
  ref: Ref<HTMLInputElement>
) {
  const { id, label, styles, ...inputProps } = props
  const className = useCx({ styles }, 'forms.text-field')

  return (
    <div className={className}>
      <Input id={id} ref={ref} placeholder=" " {...inputProps} />
      <Label htmlFor={id}>{label}</Label>
    </div>
  )
})

interface TextfieldProps extends InputProps {
  /** label text */
  label: string
  /** unique id of the component */
  id: string
}
