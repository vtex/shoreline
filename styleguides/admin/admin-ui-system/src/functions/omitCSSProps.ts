/* eslint-disable @typescript-eslint/no-explicit-any */

import { omit } from './omit'
import { cssProps } from '../constants'

export function omitCSSProps(props: any) {
  return omit(props, ...Object.keys(cssProps))
}
