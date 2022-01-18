import { canUseDOM } from './isBrowser'
import { get } from './lodash'

export function isTouch() {
  if (!canUseDOM()) return false

  return Boolean(
    'ontouchstart' in window ||
      window.navigator.maxTouchPoints > 0 ||
      // windows 8 + chrome
      get(window.navigator, 'msMaxTouchPoints', 0) > 0
  )
}
