import type { AnyObject } from '@vtex/admin-ui-util'
import { get } from '@vtex/admin-ui-util'
import { palette, resolveCssValue } from './helpers'
import type { Palette } from './types'

export const utils: Record<string, (value: any) => AnyObject> = {
  /** Space */
  marginX: (value: string | number) => ({
    marginLeft: resolveCssValue(value, 'marginLeft'),
    marginRight: resolveCssValue(value, 'marginRight'),
  }),
  marginY: (value: string | number) => ({
    marginTop: resolveCssValue(value, 'marginTop'),
    marginBottom: resolveCssValue(value, 'marginBottom'),
  }),
  paddingX: (value: string | number) => ({
    paddingLeft: resolveCssValue(value, 'paddingLeft'),
    paddingRight: resolveCssValue(value, 'paddingRight'),
  }),
  paddingY: (value: string | number) => ({
    paddingTop: resolveCssValue(value, 'paddingTop'),
    paddingBottom: resolveCssValue(value, 'paddingBottom'),
  }),

  /** Size */
  size: (value: string | number) => ({
    width: resolveCssValue(value, 'width'),
    height: resolveCssValue(value, 'height'),
  }),
  minSize: (value: string | number) => ({
    minWidth: resolveCssValue(value, 'minWidth'),
    minHeight: resolveCssValue(value, 'minHeight'),
  }),
  maxSize: (value: string | number) => ({
    maxWidth: resolveCssValue(value, 'maxWidth'),
    maxHeight: resolveCssValue(value, 'maxHeight'),
  }),
  absoluteSize: (value: string | number) => ({
    minWidth: resolveCssValue(value, 'minWidth'),
    minHeight: resolveCssValue(value, 'minHeight'),
    maxWidth: resolveCssValue(value, 'maxWidth'),
    maxHeight: resolveCssValue(value, 'maxHeight'),
  }),

  // Text
  text: (value: string) => ({
    fontFamily: resolveCssValue(value, 'fontFamily'),
    fontVariationSettings: resolveCssValue(value, 'fontVariationSettings'),
    fontSize: resolveCssValue(value, 'fontSize'),
    lineHeight: resolveCssValue(value, 'lineHeight'),
    letterSpacing: resolveCssValue(value, 'letterSpacing'),
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
