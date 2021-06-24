import { isFunction } from './isFunction'

/**
 * Call if fucntion or return if value
 * @param value
 * @param param
 * @example
 * callOrReturn((v) => console.log(v), 'duck') // prints duck
 * callOrReturn({ duck: 'quack' }, 'duck') // returns { duck: 'quack' }
 */
export function callOrReturn<T, P>(value: T, param: P) {
  return isFunction(value) ? value(param) : value
}
