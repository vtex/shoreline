import type { AnyObject } from '@vtex/admin-ui'
import { createComponent, useElement } from '@vtex/admin-ui'

import type { FormState } from './form.state'

export const Form = createComponent<'form', FormProps>((props) => {
  const { state, onSubmit, ...formProps } = props

  const { handleSubmit } = state

  return useElement('form', {
    onSubmit: handleSubmit(onSubmit),
    ...formProps,
  })
})

Form.displayName = 'Form'

export interface FormProps {
  state: FormState
  onSubmit: (data: AnyObject) => void
}
