import { StyleProp } from '@vtex/admin-ui-system'
import { ReactNode, ReactElement, useRef, Children } from 'react'

import { ModalSize } from './types'

export function isReactElement(
  child: ReactNode
): child is Omit<ReactElement, 'type'> & { type: { displayName: string } } {
  return !!(child as ReactElement).type
}

export function useComponentsExistence(children: ReactNode) {
  const headerExists = useRef(false)
  const footerExists = useRef(false)

  Children.forEach(children, (child) => {
    const displayName = isReactElement(child) && child.type.displayName

    if (displayName === 'Modal.Header' || displayName === 'Stateless.Modal') {
      headerExists.current = true
    }

    if (displayName === 'Modal.Footer' || displayName === 'Stateless.Footer') {
      footerExists.current = true
    }
  })

  const scrollStyle: StyleProp =
    headerExists.current || footerExists.current ? { overflowY: 'hidden' } : {}

  return {
    hasHeader: headerExists.current,
    hasFooter: footerExists.current,
    scrollStyle,
  }
}

export function getScrollAreaSize(
  hasHeader: boolean,
  hasFooter: boolean,
  size: ModalSize
) {
  if (hasHeader && hasFooter) {
    if (size === 'small' || size === 'regular') {
      return '-with-larger-scroll-area'
    }

    return '-with-extra-large-scroll-area'
  }

  if (hasHeader || hasFooter) {
    return `-with-${size}-scroll-area`
  }

  return ''
}
