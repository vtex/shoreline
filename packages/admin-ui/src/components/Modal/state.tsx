import type { DialogStateReturn, DialogInitialState } from 'reakit'
import { useDialogState } from 'reakit'

function useModalState(
  initialState?: Omit<DialogInitialState, 'animated'> | undefined
) {
  const dialogState = useDialogState({
    animated: true,
    ...initialState,
  })

  return dialogState
}

export { useModalState }
export type {
  DialogStateReturn as ModalStateReturn,
  DialogInitialState as ModalInitialState,
}
