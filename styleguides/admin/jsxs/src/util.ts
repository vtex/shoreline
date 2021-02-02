/**
 * Whether a value is a function
 */
export const isFunction = (param: unknown): param is CallableFunction =>
  typeof param === 'function'
