import { useState } from 'react'

type CheckboxStateType = {
  initialValue?: CheckboxState
}

export function useCheckboxState(state?: CheckboxStateType) {
  const [value, setValue] = useState(state?.initialValue ?? false)

  return {
    value,
    setValue,
  } as CheckboxStateReturn
}

export type CheckboxState = boolean | 'indeterminate' | any[] | undefined

export type CheckboxStateReturn = {
  value: boolean | any[] | 'indeterminate'
  setValue: React.Dispatch<
    React.SetStateAction<boolean | any[] | 'indeterminate'>
  >
}
