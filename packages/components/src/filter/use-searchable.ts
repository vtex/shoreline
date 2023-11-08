import { useComboboxContext } from '@ariakit/react'

/**
 * Returns wether the Filter is Searchable
 */
export function useSearchable() {
  const combobox = useComboboxContext()
  const searchable = !!combobox

  return searchable
}
