import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

/**
 * Place its children on the center of the frame
 * @example
 * <Center>
 *  <div />
 * </Center>
 */
export const Center = forwardRef<HTMLDivElement, CenterProps>(function Center(
  props,
  ref
) {
  return <div data-kc-center ref={ref} {...props} />
})

export type CenterProps = ComponentPropsWithoutRef<'div'>
