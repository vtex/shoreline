import type { AnyObject } from '@vtex/admin-ui-util'
import { canUseDOM } from '@vtex/admin-ui-util'

export function applyCSSVars(cssVars: AnyObject) {
  if (canUseDOM()) {
    Object.keys(cssVars).forEach((key) => {
      document.documentElement.style.setProperty(key, cssVars[key])
    })
  }
}
