/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ForwardRefRenderFunction } from 'react'
import get from 'lodash.get'
import pick from 'lodash.pick'
import omit from 'lodash.omit'
import lodashMerge from 'lodash.merge'
import isPropValid from '@emotion/is-prop-valid'

/**
 * merges n objects into one
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const merge = (...params: any) => lodashMerge({}, ...params)

/**
 * Whether a value is a function
 */
const isFunction = (param: unknown): param is CallableFunction =>
  typeof param === 'function'

/**
 * Whether an Record<string, unknown> is empty
 */
const isObjectEmpty = (obj: Record<string, unknown>) =>
  Object.keys(obj).length === 0 && obj.constructor === Object

/**
 * Omit unsafe htmlProps
 * @param {P} props - props that may be unsafe
 * @param {string[]} commonProps - common props within the design system (those will be also omited)
 */
function cleanProps<P>(props: P, commonProps: string[] = []): P {
  const legalProps = pickHTMLProps(
    (props as unknown) as Record<string, unknown>,
    commonProps
  )

  const safeProps = omit(legalProps, ...commonProps)

  return safeProps as P
}

/**
 * Pick safe htmlProps
 * @param {P} props - props that may be unsafe
 * @param {string[]} commonProps - common props within the design system (those will not be picked)
 */
function pickHTMLProps<P extends Record<string, unknown>>(
  props: P,
  commonProps: string[]
) {
  const filteredProps: Partial<P> = {}

  for (const prop in props) {
    if (isPropValid(prop) && !commonProps.includes(prop)) {
      filteredProps[prop] = props[prop]
    }
  }

  return filteredProps
}

/**
 * Credits to reakit
 * https://github.com/reakit/reakit/blob/master/packages/reakit-system/src/__utils/forwardRef.ts
 */
function forwardRef<T extends ForwardRefRenderFunction<any, any>>(
  component: T
) {
  return (React.forwardRef(component) as unknown) as T
}

export {
  get,
  pick,
  omit,
  isFunction,
  isObjectEmpty,
  merge,
  cleanProps,
  pickHTMLProps,
  isPropValid,
  forwardRef,
}

export const transformScale = (acc: Record<string, any>, curr: string) => ({
  ...acc,
  /** Transform negative values */
  [curr]: (scale: Record<string, unknown>, value: string | number) => {
    if (typeof value !== 'number' || value >= 0) {
      if (typeof value === 'string' && value.startsWith('-')) {
        const valueWithoutMinus = value.substring(1)
        const n = get(scale, valueWithoutMinus, valueWithoutMinus)

        return `-${n}`
      }

      return get(scale, value, value)
    }

    const absolute = Math.abs(value)
    const n = get(scale, absolute, absolute)

    if (typeof n === 'string') return `-${n}`

    return Number(n) * -1
  },
})

/**
 * Function that helps in the creation of a themeKey with conditional variants
 * @param sequence Array<[conditional variant, themeKey accessor]>
 */
export const inlineVariant = (sequence: Array<[boolean, string]>) =>
  sequence.reduce((acc, item) => {
    const [invariant, modifier] = item

    return invariant ? `${acc}${modifier}` : acc
  }, '')
