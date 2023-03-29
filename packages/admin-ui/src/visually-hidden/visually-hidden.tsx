import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { VisuallyHidden as AriakitVisuallyHidden } from 'ariakit'

export const VisuallyHidden = forwardRef(function VisuallyHidden(
  props: VisuallyHiddenProps,
  ref: Ref<HTMLSpanElement>
) {
  return <AriakitVisuallyHidden ref={ref} {...props} />
})

export type VisuallyHiddenProps = ComponentPropsWithoutRef<'span'>
