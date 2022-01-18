// credits to chakra-ui https://github.com/chakra-ui/chakra-ui/blob/main/packages/utils/src/function.ts

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
