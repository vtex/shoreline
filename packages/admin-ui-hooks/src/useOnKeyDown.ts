import type { KeyboardEvent } from 'react'
import { useCallback } from 'react'
import { isFunction } from '@vtex/admin-ui-util'

import { useEventCallback } from './useEventCallback'

type KeyMap = {
  [key: string]: (event: KeyboardEvent<any>) => any
}

interface Props {
  keyMap: (event: KeyboardEvent) => KeyMap
  htmlOnKeyDown?: (event: any) => any
  preventDefault?: boolean
  stopPropagation?: boolean
}

export function useOnKeyDown(props: Props) {
  const {
    keyMap,
    htmlOnKeyDown = () => null,
    preventDefault = true,
    stopPropagation = false,
  } = props

  const memoizedHtmlOnKeyDown = useEventCallback(htmlOnKeyDown)

  return useCallback(
    (event: KeyboardEvent<any>) => {
      const actions = keyMap(event)
      const action = actions[event.key]

      if (!action || !isFunction(action)) return
      if (preventDefault) event.preventDefault()
      if (stopPropagation) event.stopPropagation()

      memoizedHtmlOnKeyDown(event)
      action(event)
    },
    [memoizedHtmlOnKeyDown]
  )
}
