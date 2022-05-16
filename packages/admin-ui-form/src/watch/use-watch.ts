import { useWatch as useWatchBase } from 'react-hook-form'
import type { FormState } from '../form'

/**
 * React Hook for subscribe to input changes
 * @example
 * const form = useFormState()
 * const subscribedValue = useWatch({
 *   form,
 *   name: "fieldName"
 * })
 */
export function useWatch(props: UseWatchProps) {
  const { form, name, defaultValue, disabled } = props

  return useWatchBase({
    control: form.control,
    name,
    defaultValue,
    disabled,
  })
}

export interface UseWatchProps {
  /** Target form */
  form: FormState
  /**  Name of the field */
  name: string
  /** Default value for useWatch to return before the initial render */
  defaultValue?: unknown
  /**
   * Option to disable the subscription
   * @default false
   * */
  disabled?: boolean
}

export type WatchState = ReturnType<typeof useWatch>
