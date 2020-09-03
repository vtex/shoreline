/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ForwardRefRenderFunction } from 'react'

/**
 * Credits to reakit
 * https://github.com/reakit/reakit/blob/master/packages/reakit-system/src/__utils/forwardRef.ts
 */
export function forwardRef<T extends ForwardRefRenderFunction<any, any>>(
  component: T
) {
  return (React.forwardRef(component) as unknown) as T
}
