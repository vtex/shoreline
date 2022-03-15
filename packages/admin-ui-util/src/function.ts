import type { FunctionArguments } from './types'

export function callAllHandlers<T extends (event: any) => void>(
  ...fns: Array<T | undefined>
) {
  return function func(event: FunctionArguments<T>[0]) {
    fns.some((fn) => {
      fn?.(event)

      return event?.defaultPrevented
    })
  }
}

/**
 * Whether a value is a function
 */
export function isFunction<T extends Function = Function>(
  value: any
): value is T {
  return typeof value === 'function'
}

export function runIfFunction<T, U>(
  valueOrFn: T | ((...fnArgs: U[]) => T),
  ...args: U[]
): T {
  return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn
}
