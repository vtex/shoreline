/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import isPropValid from '@emotion/is-prop-valid'

import { cssProps } from './mappings'

export const isFunction = (obj: any): obj is Function =>
  typeof obj === 'function'
export const isObjectEmpty = (obj: any) =>
  Object.keys(obj).length === 0 && obj.constructor === Object

const omitProps = [
  'focusable',
  'spacing',
  'size',
  'kind',
  'variant',
  'orientation',
  'wrap',
  'colorMode',
]

export function compose(params: any) {
  const { use, ...props } = params

  if (!use || typeof use === 'string' || !use.useProps) {
    return props
  }

  const enhancedProps = use.useProps({ ...props, use: undefined })

  return { ...props, ...enhancedProps }
}

export function pickHTMLProps<P extends object>(props: P) {
  const filteredProps: Partial<P> = {}

  for (const prop in props) {
    if (isPropValid(prop) && !omitProps.includes(prop)) {
      filteredProps[prop] = props[prop]
    }
  }

  return filteredProps
}

export const omit = (obj: { [x: string]: any }, ...keys: string[]) => {
  return Object.keys(obj).reduce((newObject, key) => {
    if (keys.indexOf(key) === -1) (newObject as any)[key] = obj[key]

    return newObject
  }, {})
}

export const pick = (obj: { [x: string]: any }, ...props: string[]) => {
  const object = {}

  props.forEach((prop) => {
    if (prop in obj) {
      ;(object as any)[prop] = obj[prop]
    }
  })

  return object
}

export function isCSSProp(prop: string) {
  return Object.keys(cssProps).includes(prop)
}

export function pickCSSProps(props: any) {
  return pick(props, ...Object.keys(cssProps))
}

export function omitCSSProps(props: any) {
  return omit(props, ...Object.keys(cssProps))
}

export function mergeRefs(...refs: Array<React.Ref<any> | undefined>) {
  const filteredRefs = refs.filter(Boolean)

  if (!filteredRefs.length) return null
  if (filteredRefs.length === 0) return filteredRefs[0]

  return (instance: any) => {
    for (const ref of filteredRefs) {
      if (typeof ref === 'function') {
        ref(instance)
      } else if (ref) {
        ;(ref as React.MutableRefObject<any>).current = instance
      }
    }
  }
}

export const renameKeys = (
  keysMap: { [x: string]: any },
  obj: { [x: string]: any }
) =>
  Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: obj[key] },
    }),
    {}
  )
