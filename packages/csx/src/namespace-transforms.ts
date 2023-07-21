import { DS_PREFIX } from './constants'
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
      tablet: `(min-width: var(--${DS_PREFIX}-bp-tablet))`,
      desktop: `(min-width: var(--${DS_PREFIX}-bp-desktop))`,
      widescreen: `(min-width: var(--${DS_PREFIX}-bp-widescreen))`,
      darkMode: '(prefers-color-scheme: dark)',
    }

    return renameKeys(collection, csxObject)
  },
  '@layer': (csxObject) => {
    const collection = {
      reset: `${DS_PREFIX}-reset`,
      base: `${DS_PREFIX}-base`,
      tokens: `${DS_PREFIX}-tokens`,
      components: `${DS_PREFIX}-components`,
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
