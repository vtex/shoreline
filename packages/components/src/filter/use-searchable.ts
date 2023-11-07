import { useComboboxContext } from '@ariakit/react'

export function useSearchable() {
  const combobox = useComboboxContext()
  const searchable = !!combobox

  return searchable
}
