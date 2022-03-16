import type { LooseBoolean } from './types'
import { get } from './object'

export const dataAttr = (condition: boolean | undefined) =>
  (condition ? '' : undefined) as LooseBoolean

export const ariaAttr = (condition: boolean | undefined) =>
  condition ? true : undefined

export function canUseDOM(): boolean {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  )
}

export const isBrowser = canUseDOM()

export function isTouch() {
  if (!canUseDOM()) return false

  return Boolean(
    'ontouchstart' in window ||
      window.navigator.maxTouchPoints > 0 ||
      // windows 8 + chrome
      get(window.navigator, 'msMaxTouchPoints', 0) > 0
  )
}

/**
 * Returns `element.ownerDocument || document`.
 * credits to ariakit: https://github.com/ariakit/ariakit/blob/f1168b6603/packages/ariakit-utils/src/focus.ts
 */
export function getDocument(node?: Node | null): Document {
  return node ? node.ownerDocument || (node as Document) : document
}

/**
 * Checks whether `element` is a frame element.
 * credits to ariakit: https://github.com/ariakit/ariakit/blob/f1168b6603/packages/ariakit-utils/src/focus.ts
 */
export function isFrame(element: Element): element is HTMLIFrameElement {
  return element.tagName === 'IFRAME'
}

/**
 * Returns `element.ownerDocument.activeElement`.
 * credits to ariakit: https://github.com/ariakit/ariakit/blob/f1168b6603/packages/ariakit-utils/src/focus.ts
 */
export function getActiveElement(
  node?: Node | null,
  activeDescendant = false
): HTMLElement | null {
  const { activeElement } = getDocument(node)

  if (!activeElement?.nodeName) {
    // In IE11, activeElement might be an empty object if we're interacting
    // with elements inside of an iframe.
    return null
  }

  if (isFrame(activeElement) && activeElement.contentDocument) {
    return getActiveElement(
      activeElement.contentDocument.body,
      activeDescendant
    )
  }

  if (activeDescendant) {
    const id = activeElement.getAttribute('aria-activedescendant')

    if (id) {
      const element = getDocument(activeElement).getElementById(id)

      if (element) {
        return element
      }
    }
  }

  return activeElement as HTMLElement | null
}

/**
 * Checks if `element` has focus. Elements that are referenced by
 * `aria-activedescendant` are also considered.
 * credits to ariakit: https://github.com/ariakit/ariakit/blob/f1168b6603/packages/ariakit-utils/src/focus.ts
 * @example
 * hasFocus(document.getElementById("id"));
 *
 */
export function hasFocus(element: Element) {
  const activeElement = getActiveElement(element)

  if (!activeElement) return false
  if (activeElement === element) return true
  const activeDescendant = activeElement.getAttribute('aria-activedescendant')

  if (!activeDescendant) return false

  return activeDescendant === element.id
}

/**
 * Ensures `element` will receive focus if it's not already.
 * credits to ariakit: https://github.com/ariakit/ariakit/blob/f1168b6603/packages/ariakit-utils/src/focus.ts
 * @example
 * ensureFocus(document.activeElement); // does nothing
 *
 * const element = document.querySelector("input");
 *
 * ensureFocus(element); // focuses element
 * ensureFocus(element, { preventScroll: true }); // focuses element preventing scroll jump
 *
 * function isActive(el) {
 *   return el.dataset.active === "true";
 * }
 *
 * ensureFocus(document.querySelector("[data-active='true']"), { isActive }); // does nothing
 *
 * @returns {number} `requestAnimationFrame` call ID so it can be passed to `cancelAnimationFrame` if needed.
 */
export function ensureFocus(
  element: HTMLElement,
  { preventScroll, isActive = hasFocus }: EnsureFocusOptions = {}
) {
  // TODO: Try to use queueMicrotask before requestAnimationFrame and dispatch
  // focus events if the element is not focusable?
  if (isActive(element)) return -1

  element.focus({ preventScroll })

  if (isActive(element)) return -1

  return requestAnimationFrame(() => {
    element.focus({ preventScroll })
  })
}

type EnsureFocusOptions = FocusOptions & {
  isActive?: typeof hasFocus
}
