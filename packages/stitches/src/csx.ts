import type { CsxObject } from '@vtex/shoreline-csx'
import {
  csx as _csx,
  dataAttr,
  clamp,
  calc,
  min,
  max,
} from '@vtex/shoreline-csx'
import { css } from './create-stitches'
import { stackNamespaces } from './stack-namespaces'

export function csx(object: CsxObject): string {
  const cssObject = _csx(object)
  const stackedCssObject = stackNamespaces(cssObject)
  const getClassName = css(stackedCssObject)
  const className = getClassName().toString()

  return className
}

export { dataAttr, clamp, min, max, calc }
