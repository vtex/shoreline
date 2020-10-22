/* eslint-disable @typescript-eslint/no-explicit-any */
import { cssProps } from '../constants'

export const isFunction = (obj: any): obj is Function =>
  typeof obj === 'function'

export const isObjectEmpty = (obj: any) =>
  Object.keys(obj).length === 0 && obj.constructor === Object

export function isCSSProp(prop: string) {
  return Object.keys(cssProps).includes(prop)
}
