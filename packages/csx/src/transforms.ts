import { constants } from '@vtex/shoreline-utils'
import type { CsxValue } from './csx-value'

export const defaultTransformCollection: TransformCollection = {
  /** Identity */
  '*': (value) => {
    return {
      [value.property]: value.asCssVar(),
    }
  },

  /** Common aliases */
  bg: (value) => ({
    background: value.asCssVar(),
  }),
  fg: (value) => ({
    color: value.asCssVar(),
  }),
  radii: (value) => ({
    borderRadius: value.asCssVar(),
  }),
  z: (value) => ({
    zIndex: value.asCssVar(),
  }),
  text: (value) => ({
    font: `var(--${constants.dsPrefix}-${value.asCleanToken()}-font)`,
    letterSpacing: `var(--${
      constants.dsPrefix
    }-${value.asCleanToken()}-letter-spacing)`,
  }),

  /** DeepSearch values */
  margin: (value) => ({
    margin: value.asCssVar({ deepSearch: true }),
  }),
  padding: (value) => ({
    padding: value.asCssVar({ deepSearch: true }),
  }),
  boxShadow: (value) => ({
    boxShadow: value.asCssVar({ deepSearch: true }),
  }),
  border: (value) => ({
    border: value.asCssVar({ deepSearch: true }),
  }),
  container: (value) => ({
    container: value.asCssVar({ deepSearch: true }),
  }),
  font: (value) => ({
    font: value.asCssVar({ deepSearch: true }),
  }),

  /** Space values */
  marginX: (value) => ({
    marginLeft: value.asCssVar(),
    marginRight: value.asCssVar(),
  }),
  marginY: (value) => ({
    marginTop: value.asCssVar(),
    marginBottom: value.asCssVar(),
  }),
  paddingX: (value) => ({
    paddingLeft: value.asCssVar(),
    paddingRight: value.asCssVar(),
  }),
  paddingY: (value) => ({
    paddingTop: value.asCssVar(),
    paddingBottom: value.asCssVar(),
  }),

  /** Sizes */
  size: (value) => ({
    width: value.asCssVar(),
    height: value.asCssVar(),
  }),
  minSize: (value) => ({
    minWidth: value.asCssVar(),
    minHeight: value.asCssVar(),
  }),
  maxSize: (value) => ({
    maxWidth: value.asCssVar(),
    maxHeight: value.asCssVar(),
  }),
  absoluteSize: (value) => ({
    minWidth: value.asCssVar(),
    minHeight: value.asCssVar(),
    maxWidth: value.asCssVar(),
    maxHeight: value.asCssVar(),
  }),
}

/**
 * Find transform for csx property
 * @param {String} prop Prop to look for
 * @param {Object} collection { [prop]: transformFn } Dict
 * @returns {Function} Transform function
 */
export function findTransform(
  prop: string,
  collection: TransformCollection = defaultTransformCollection
): TransformFn {
  const defaultTransform = collection['*']

  return collection[prop] ?? defaultTransform
}

export type TransformFn = (csxValue: CsxValue) => Object

export type TransformCollection = Record<string, TransformFn>
