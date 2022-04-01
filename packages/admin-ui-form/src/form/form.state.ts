import {
  useForm as useFormState,
  useWatch as useWatchBase,
} from 'react-hook-form'

export interface UseWatchProps {
  /** Target form */
  form: any
  /**  Name of the field */
  name: string
  /** Default value for useWatch to return before the initial render */
  defaultValue?: unknown
  /**
   * Option to disable the subscription
   * @default false
   * */
  disabled?: boolean
  /**
   * Enables an exact match for input name subscriptions
   * @default false
   */
  exact?: boolean
}

/**
 * React Hook for subscribe to input changes
 * @example
 * const form = useFormState()
 * const subscribedValue = useWatch({
 *   form,
 *   name: "fieldName"
 * })
 */
function useWatch(props: UseWatchProps) {
  const { form, name, defaultValue, disabled } = props

  return useWatchBase({
    control: form.control,
    name,
    defaultValue,
    disabled,
  })
}

export { useFormState, useWatch }
