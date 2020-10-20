/* eslint-disable @typescript-eslint/no-explicit-any */
import { pick } from './pick'
import { cssProps } from '../constants'

export function pickCSSProps(props: any) {
  return pick(props, ...Object.keys(cssProps))
}
