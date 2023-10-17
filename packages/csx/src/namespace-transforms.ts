import { constants } from '@vtex/shoreline-utils'
import type { CsxObject } from './types'

export function renameKeys(
  keysMap: { [x: string]: any },
  obj: { [x: string]: any }
) {
  return Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: obj[key] },
    }),
    {}
  )
}

const defaultNamespaceTransformCollection: NamespaceTransformCollection = {
  '*': (csxObject) => {
    return csxObject
  },

  '@media': (csxObject) => {
    const collection = {
      tablet: `(min-width: var(--${constants.dsPrefix}-bp-tablet))`,
      desktop: `(min-width: var(--${constants.dsPrefix}-bp-desktop))`,
      widescreen: `(min-width: var(--${constants.dsPrefix}-bp-widescreen))`,
      darkMode: '(prefers-color-scheme: dark)',
    }

    return renameKeys(collection, csxObject)
  },
  '@layer': (csxObject) => {
    const collection = {
      reset: `${constants.dsPrefix}-reset`,
      base: `${constants.dsPrefix}-base`,
      tokens: `${constants.dsPrefix}-tokens`,
      components: `${constants.dsPrefix}-components`,
    }

    return renameKeys(collection, csxObject)
  },
}

/**
 * Find transform for csx property
 * @param {String} prop Prop to look for
 * @param {Object} collection { [prop]: transformFn } Dict
 * @returns {Function} Transform function
 */
export function findNamespaceTransform(
  prop: string,
  collection: NamespaceTransformCollection = defaultNamespaceTransformCollection
): NamespaceTransformFn {
  const defaultTransform = collection['*']

  return collection[prop] ?? defaultTransform
}

export type NamespaceTransformFn = (csxValue: CsxObject) => CsxObject

export type NamespaceTransformCollection = Record<string, NamespaceTransformFn>
