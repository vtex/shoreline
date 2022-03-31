import { useEffect } from 'react'
import { useCallbackRef } from '@vtex/admin-ui-hooks'
import type { ModalStateReturn } from './state'

export const kListeners = Symbol('useModalState#listeners')

export type ModalStateListeners = {
  close: Set<() => void>
}

export type ModalStateEventNames = keyof ModalStateListeners

export const useModalStateListener = (
  state: ModalStateReturn,
  eventName: ModalStateEventNames,
  callback: () => void
) => {
  const callbackRef = useCallbackRef(callback)
  const listeners = state[kListeners][eventName]

  useEffect(() => {
    listeners.add(callbackRef)

    return () => {
      listeners.delete(callbackRef)
    }
  }, [])
}
