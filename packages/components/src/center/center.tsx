import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const Center = forwardRef<HTMLDivElement, CenterProps>(function Center(
  props,
  ref
) {
  return <div data-sl-center ref={ref} {...props} />
})

export type CenterProps = ComponentPropsWithoutRef<'div'>
