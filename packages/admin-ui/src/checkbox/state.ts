import { useState } from 'react'

export function useCheckboxState(state?: CheckboxStateProps) {
  const [value, setValue] = useState(state?.initialValue ?? false)

  return {
    value,
    setValue,
  }
}

export type CheckboxState = boolean | 'indeterminate' | any[]

export type CheckboxStateProps = {
  initialValue?: CheckboxState
}

export type CheckboxStateReturn = {
  value: CheckboxState
  setValue: React.Dispatch<React.SetStateAction<CheckboxState>>
}
