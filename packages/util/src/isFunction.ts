// credits to chakra-ui https://github.com/chakra-ui/chakra-ui/blob/main/packages/utils/src/assertion.ts

/**
 * Whether a value is a function
 */
export function isFunction<T extends Function = Function>(
  value: any
): value is T {
  return typeof value === 'function'
}
