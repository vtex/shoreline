import type { AnyObject } from '@vtex/admin-ui'
import { createComponent, useElement } from '@vtex/admin-ui'

import type { FormFieldProps } from '../types'

export const Form = createComponent<'form', FormProps>((props) => {
  const { state, onSubmit, ...formProps } = props

  const { handleSubmit } = state

  return useElement('form', {
    onSubmit: handleSubmit(onSubmit),
    ...formProps,
  })
})

interface FormProps extends FormFieldProps {
  onSubmit: (data: AnyObject) => void
}

Form.displayName = 'Form'
