/* eslint-disable @typescript-eslint/no-explicit-any */
import { pick } from './pick'
import { cssProps } from '../constants'

/**
 * Pick all css props within a passed object
 */
export function pickCSSProps(props: any) {
  return pick(props, ...Object.keys(cssProps))
}
