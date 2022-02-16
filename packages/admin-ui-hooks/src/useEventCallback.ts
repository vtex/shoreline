import type { AnyFunction } from '@vtex/admin-ui-util'
import { useCallback, useRef } from 'react'

import { useSafeLayoutEffect } from './useSafeLayoutEffect'

export function useEventCallback<T extends AnyFunction>(callback?: T) {
  const ref = useRef<T | undefined>((() => {
    throw new Error('Cannot call an event handler while rendering.')
  }) as any)

  useSafeLayoutEffect(() => {
    ref.current = callback
  })

  return useCallback(
    (...args: Parameters<T>): ReturnType<T> => ref.current?.(...(args as any)),
    []
  )
}
