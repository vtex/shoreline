import { chain } from './chain'
import { cx } from './cx'
import { isString } from './string'
import type {
  TupleTypes,
  UnionToIntersection,
  AnyObject,
} from './utility-types'
import { isNativeHandler } from './is-native-handler'

type MergePropsArgs = AnyObject | null | undefined

/**
 * Merges multiple props objects together. Event handlers are chained,
 * classNames are combined, and ids are deduplicated - different ids
 * will trigger a side-effect and re-render components hooked up with `useId`.
 * For all other props, the last prop object overrides all previous ones.
 * @param args - Multiple sets of props to merge together.
 */
export function mergeProps<T extends MergePropsArgs[]>(
  ...args: T
): UnionToIntersection<TupleTypes<T>> {
  // Start with a base clone of the first argument. This is a lot faster than starting
  // with an empty object and adding properties as we go.
  const mergedProps: AnyObject = { ...args[0] }

  for (let i = 1; i < args.length; i++) {
    const props = args[i]

    for (const prop in props) {
      const a = mergedProps[prop]
      const b = props[prop]

      // Chain events
      if (
        typeof a === 'function' &&
        typeof b === 'function' &&
        isNativeHandler(prop)
      ) {
        mergedProps[prop] = chain(a, b)

        // Merge classnames, sometimes classNames are empty string which eval to false, so we just need to do a type check
      } else if (prop === 'className' && isString(a) && isString(b)) {
        mergedProps[prop] = cx(a, b)
      } else {
        mergedProps[prop] = b !== undefined ? b : a
      }
    }
  }

  return mergedProps as UnionToIntersection<TupleTypes<T>>
}
