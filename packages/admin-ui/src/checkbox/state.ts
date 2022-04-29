import { useState } from 'react'

type CheckboxStateType = {
  initialValue?: CheckboxState
}

export function useCheckboxState(state: CheckboxStateType) {
  const [value, setValue] = useState(state?.initialValue ?? false)

  return {
    value,
    setValue,
  }
}

export type CheckboxState = boolean | 'indeterminate' | any[] | undefined
