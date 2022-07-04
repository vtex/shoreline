import type {
  ReactNode,
  DOMAttributes,
  SyntheticEvent,
  MutableRefObject,
} from 'react'
import { useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'

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

export function usePortal(): any {
  const targetEl = useRef() as HTMLElRef
  const portal = useRef(document.createElement('div')) as HTMLElRef
  const elToMountTo = document.body

  useEffect(() => {
    if (!portal.current) {
      portal.current = document.createElement('div')
    }
  }, [portal])

  useEffect(() => {
    if (
      !(elToMountTo instanceof HTMLElement) ||
      !(portal.current instanceof HTMLElement)
    ) {
      return
    }

    const node = portal.current

    elToMountTo.appendChild(portal.current)

    return () => {
      elToMountTo.removeChild(node)
    }
  }, [elToMountTo, portal])

  const Portal = useCallback(
    ({ children }: { children: ReactNode }) => {
      if (portal.current != null) {
        return createPortal(children, portal.current)
      }

      return null
    },
    [portal]
  )

  return Object.assign([Portal, targetEl, portal], {
    ref: targetEl,
    Portal,
    portalRef: portal,
  })
}
