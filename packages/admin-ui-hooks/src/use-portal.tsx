import {
  useRef,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
  DOMAttributes,
  SyntheticEvent,
  MutableRefObject,
} from 'react'
import { createPortal, findDOMNode } from 'react-dom'

type HTMLElRef = MutableRefObject<HTMLElement>
type CustomEvent = {
  event?: SyntheticEvent<any, Event>
  portal: HTMLElRef
  targetEl: HTMLElRef
} & SyntheticEvent<any, Event>

type CustomEventHandler = (customEvent: CustomEvent) => void
type CustomEventHandlers = {
  [K in keyof DOMAttributes<K>]?: CustomEventHandler
}

export type UsePortalOptions = {
  /**
   * Attach the portal to this node in the DOM
   */
  bindTo?: HTMLElement
} & CustomEventHandlers

export function usePortal({ bindTo }: UsePortalOptions = {}): any {
  const targetEl = useRef() as HTMLElRef
  const portal = useRef(document.createElement('div')) as HTMLElRef

  useEffect(() => {
    if (!portal.current) portal.current = document.createElement('div')
  }, [portal])

  const elToMountTo = useMemo(() => {
    return (bindTo && findDOMNode(bindTo)) || document.body
  }, [bindTo])

  useEffect(() => {
    if (
      !(elToMountTo instanceof HTMLElement) ||
      !(portal.current instanceof HTMLElement)
    )
      return

    const node = portal.current
    elToMountTo.appendChild(portal.current)

    return () => {
      elToMountTo.removeChild(node)
    }
  }, [elToMountTo, portal])

  const Portal = useCallback(
    ({ children }: { children: ReactNode }) => {
      if (portal.current != null) return createPortal(children, portal.current)
      return null
    },
    [portal]
  )

  return Object.assign([Portal, targetEl, portal], {
    ref: targetEl,
    Portal,
    portalRef: portal,
    bind: {
      // used if you want to spread all html attributes onto the target element
      ref: targetEl,
    },
  })
}
