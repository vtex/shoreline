/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ForwardRefRenderFunction } from 'react'
import React from 'react'
import pick from 'lodash.pick'
import omit from 'lodash.omit'

export { pick, omit }

/**
 * Whether an Record<string, unknown> is empty
 */
export const isObjectEmpty = (obj: Record<string, unknown>) =>
  Object.keys(obj).length === 0 && obj.constructor === Object

/**
 * Credits to reakit
 * https://github.com/reakit/reakit/blob/master/packages/reakit-system/src/__utils/forwardRef.ts
 */
export function forwardRef<T extends ForwardRefRenderFunction<any, any>>(
  component: T
) {
  return React.forwardRef(component) as unknown as T
}

/**
 * Function that helps in the creation of a themeKey with conditional variants
 * @param sequence Array<[conditional variant, themeKey accessor]>
 */
export const inlineVariant = (
  prefix: string,
  sequence: Array<[boolean, string]>
) => {
  const conditionalSuffix = sequence.reduce((acc, item) => {
    const [invariant, modifier] = item

    return invariant ? `${acc}${modifier}` : acc
  }, '')

  return `${prefix}${conditionalSuffix}`
}
