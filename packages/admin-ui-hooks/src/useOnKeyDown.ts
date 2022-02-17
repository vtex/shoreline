import type { KeyboardEvent, RefObject, KeyboardEventHandler } from 'react'
import { isFunction } from '@vtex/admin-ui-util'

type KeyMap = {
  [key: string]: (event: KeyboardEvent<any>) => any
}

interface Props<T extends HTMLElement> {
  keyMap: (event: KeyboardEvent<T>) => KeyMap
  onKey?: any
  preventDefault?: boolean
  stopPropagation?: boolean
  onKeyDown?: KeyboardEventHandler<T> | RefObject<KeyboardEventHandler<T>>
}

function isRef<T>(
  type: KeyboardEventHandler<T> | RefObject<KeyboardEventHandler<T>>
): type is RefObject<KeyboardEventHandler<T>> {
  return 'current' in type
}

export function useOnKeyDown<T extends HTMLElement>({
  keyMap,
  onKey,
  stopPropagation,
  onKeyDown,
  preventDefault = true,
}: Props<T>): React.KeyboardEventHandler<T> {
  return (event) => {
    if (!keyMap) return

    const actions = keyMap(event)

    if (event.key in actions) {
      const action = actions[event.key]

      if (isFunction(action)) {
        if (preventDefault) event.preventDefault()
        if (stopPropagation) event.stopPropagation()
        if (onKey) onKey(event)
        action(event)

        // Prevent onKeyDown from being called twice for the same keys
        return
      }
    }

    if (onKeyDown && isRef(onKeyDown)) {
      onKeyDown.current?.(event)
    } else {
      onKeyDown?.(event)
    }
  }
}
