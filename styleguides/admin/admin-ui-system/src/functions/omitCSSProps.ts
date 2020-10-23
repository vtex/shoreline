/* eslint-disable @typescript-eslint/no-explicit-any */

import { omit } from './omit'
import { cssProps } from '../constants'

/**
 * omit all css props within a object
 */
export function omitCSSProps(props: any) {
  return omit(props, ...Object.keys(cssProps))
}
