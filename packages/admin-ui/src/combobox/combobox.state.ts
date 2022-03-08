import type { ComboboxState, ComboboxStateProps } from 'ariakit/combobox'
import { useComboboxState as useBaseState } from 'ariakit/combobox'

export function useComboboxState(props: Props = {}) {
  const state = useBaseState({ gutter: 4, ...props })

  return state
}

type Props = Omit<ComboboxStateProps, 'gutter'>

export type { ComboboxState }
