import React, { forwardRef } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import type { RenderProps } from '@vtex/shoreline-utils'
import { composeElement } from '@vtex/shoreline-utils'

export const Particle = forwardRef<any, ParticleProps>(function Particle(
  props,
  ref
) {
  const { children, renderChildren, ...rootProps } = props

  return (
    <>
      {composeElement({
        element: children,
        props: rootProps,
        ref,
        renderChildren,
      })}
    </>
  )
})

export interface ParticleProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode
  renderChildren?: RenderProps
}
