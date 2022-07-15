import type { AnyObject } from '@vtex/admin-ui-util'
import { get } from '@vtex/admin-ui-util'
import { palette } from './helpers'
import type { Palette } from './types'

export const utils: Record<string, (value: any) => AnyObject> = {
  /** Space */
  marginX: (value: string | number) => ({
    marginLeft: value,
    marginRight: value,
  }),
  marginY: (value: string | number) => ({
    marginTop: value,
    marginBottom: value,
  }),
  paddingX: (value: string | number) => ({
    paddingLeft: value,
    paddingRight: value,
  }),
  paddingY: (value: string | number) => ({
    paddingTop: value,
    paddingBottom: value,
  }),

  /** Size */
  size: (value: string | number) => ({
    width: value,
    height: value,
  }),
  minSize: (value: string | number) => ({
    minWidth: value,
    minHeight: value,
  }),
  maxSize: (value: string | number) => ({
    maxWidth: value,
    maxHeight: value,
  }),
  absoluteSize: (value: string | number) => ({
    minWidth: value,
    minHeight: value,
    maxWidth: value,
    maxHeight: value,
  }),

  // Color
  colorTheme: (value: Palette) => palette(value),
}

export function isUtil(prop: string) {
  return prop in utils
}

export function callUtil(prop: string, value: any): AnyObject {
  const util = get(utils, prop, () => {})

  return util(value)
}
