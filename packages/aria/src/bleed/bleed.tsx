import type { CSSProperties, ComponentPropsWithoutRef, ReactNode } from 'react'
import React from 'react'

import './bleed.css'

export function Bleed(props: BleedProps) {
  const bleedProps = useBleed(props)

  return <div data-sl-bleed {...bleedProps} />
}

function useBleed(props: BleedProps): DivProps {
  const {
    top = '0rem',
    right = '0rem',
    bottom = '0rem',
    left = '0rem',
    style,
    ...divProps
  } = props

  return {
    style: {
      '--top': top,
      '--right': right,
      '--bottom': bottom,
      '--left': left,
      ...style,
    } as CSSProperties,
    ...divProps,
  }
}

type DivProps = ComponentPropsWithoutRef<'div'>

export interface BleedProps extends DivProps {
  children?: ReactNode
  top?: string
  bottom?: string
  left?: string
  right?: string
}
