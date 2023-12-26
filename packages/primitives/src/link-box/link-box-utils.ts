import { canUseDOM } from '@vtex/shoreline-utils'

/**
 * Navigate to a link using javascript
 * @param href The URL that the hyperlink points to.
 * @param target Where to display the linked URL
 * @returns
 */
export function navigate(
  href: string,
  target: NavigationTarget = '_parent'
): void {
  if (!canUseDOM) return

  const features = target === '_blank' ? 'noreferrer=true' : undefined

  window.open(href, target, features)
}

export type NavigationTarget = '_blank' | '_self' | '_parent' | '_top'
