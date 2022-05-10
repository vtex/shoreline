import {
  useDialogState,
  DialogStateReturn,
  DialogInitialState,
} from 'reakit/Dialog'

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
