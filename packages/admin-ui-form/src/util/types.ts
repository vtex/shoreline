import type { FormState, RegisterOptions } from '../form'

export interface FormFieldProps {
  /**
   * Input required state
   */
  name: string
  /**
   * Form state
   */
  state: FormState
  /**
   * Field validation
   */
  validation?: RegisterOptions
}
