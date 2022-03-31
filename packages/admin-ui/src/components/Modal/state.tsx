import { useMemo } from 'react'
import type { DialogInitialState, DialogStateReturn } from 'reakit/Dialog'
import { useDialogState } from 'reakit/Dialog'
import type { ModalStateListeners } from './state.internals'
import { kListeners } from './state.internals'

export type ModalInitialState = Omit<DialogInitialState, 'animated'>

export type ModalStateReturn = DialogStateReturn & {
  [kListeners]: ModalStateListeners
}

function useModalState(initialState?: ModalInitialState | undefined) {
  const dialogState = useDialogState({
    animated: true,
    ...initialState,
  })

  const listeners: ModalStateListeners = useMemo(
    () => ({
      close: new Set(),
    }),
    []
  )

  const state: ModalStateReturn = useMemo(() => {
    const hide = () => {
      const { visible } = dialogState

      dialogState.hide()

      if (visible) {
        listeners.close.forEach((callback) => {
          callback()
        })
      }
    }

    return {
      ...dialogState,
      [kListeners]: listeners,
      hide,
    }
  }, [dialogState])

  return state
}

export { useModalState }
