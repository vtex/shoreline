import * as React from 'react'
import { canUseDOM } from './can-use-dom'

/**
 * `React.useLayoutEffect` that fallbacks to `React.useEffect` on server side.
 */
export const useSafeLayoutEffect = canUseDOM
  ? React.useLayoutEffect
  : React.useEffect
