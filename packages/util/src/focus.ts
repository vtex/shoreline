// credits to ariakit: https://github.com/ariakit/ariakit/blob/f1168b6603/packages/ariakit-utils/src/focus.ts

/**
 * Returns `element.ownerDocument || document`.
 */
export function getDocument(node?: Node | null): Document {
  return node ? node.ownerDocument || (node as Document) : document
}

/**
 * Checks whether `element` is a frame element.
 */
export function isFrame(element: Element): element is HTMLIFrameElement {
  return element.tagName === 'IFRAME'
}

/**
 * Returns `element.ownerDocument.activeElement`.
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
 * @example
 * hasFocus(document.getElementById("id"));
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
