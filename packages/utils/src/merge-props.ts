import { chain } from './chain'
import { cx } from './cx'
import { isFunction, isString } from './is-types'
import type {
  TupleTypes,
  UnionToIntersection,
  AnyObject,
} from './utility-types'
import { isNativeHandler } from './is-native-handler'

type MergePropsArgs = AnyObject | null | undefined

/**
 * Merges multiple props objects together combining classNames and chaining events.
 * @example
 * const propsA = {}
 * const propsB = {}
 * mergeProps(propsA, propsB)
 */
export function mergeProps<T extends MergePropsArgs[]>(
  ...args: T
): UnionToIntersection<TupleTypes<T>> {
  const mergedProps: AnyObject = { ...args[0] }

  for (let i = 1; i < args.length; i++) {
    const props = args[i]

    for (const prop in props) {
      const a = mergedProps[prop]
      const b = props[prop]

      if (isFunction(a) && isFunction(b) && isNativeHandler(prop)) {
        mergedProps[prop] = chain(a, b) // chain events
      } else if (prop === 'className' && isString(a) && isString(b)) {
        mergedProps[prop] = cx(a, b) // merge classNames
      } else {
        mergedProps[prop] = b !== undefined ? b : a // override previous props
      }
    }
  }

  return mergedProps as UnionToIntersection<TupleTypes<T>>
}
