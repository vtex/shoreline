import type { CsxObject } from '@vtex/shoreline-csx'
import {
  csx as _csx,
  dataAttr,
  clamp,
  calc,
  min,
  max,
} from '@vtex/shoreline-csx'
import { style, keyframes } from '@vanilla-extract/css'

export function csx(object: CsxObject): string {
  const cssObject = _csx(object)
  const className = style(cssObject)

  return className
}

export { dataAttr, clamp, min, max, calc, keyframes }
