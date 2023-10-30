import { canUseDOM } from './can-use-dom'

/**
 * Returns true if the user is selecting some text
 */
export function hasSomeTextSelected(): boolean {
  if (!canUseDOM) return false

  return !!window?.getSelection?.()?.toString()
}
