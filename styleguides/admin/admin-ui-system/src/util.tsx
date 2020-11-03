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
const isFunction = (param: unknown): param is Function =>
  typeof param === 'function'

/**
 * Whether an object is empty
 */
const isObjectEmpty = (obj: object) =>
  Object.keys(obj).length === 0 && obj.constructor === Object

/**
 * Omit unsafe htmlProps
 * @param {P} props - props that may be unsafe
 * @param {string[]} commonProps - common props within the design system (those will be also omited)
 */
function cleanProps<P>(props: P, commonProps: string[] = []): P {
  const legalProps = pickHTMLProps((props as unknown) as object, commonProps)
  const safeProps = omit(legalProps, ...commonProps)

  return safeProps as P
}

/**
 * Pick safe htmlProps
 * @param {P} props - props that may be unsafe
 * @param {string[]} commonProps - common props within the design system (those will not be picked)
 */
function pickHTMLProps<P extends object>(props: P, commonProps: string[]) {
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
