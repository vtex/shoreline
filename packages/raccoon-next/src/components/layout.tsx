import type { PropsWithChildren } from 'react'
import React from 'react'

import { tokens } from './tokens'

export function Center(
  props: PropsWithChildren<{ style?: React.CSSProperties }>
) {
  const { children, style } = props

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export function Container(props: PropsWithChildren) {
  const { children } = props

  return (
    <Center
      style={{
        height: 'screenHeight',
      }}
    >
      {children}
    </Center>
  )
}

export function Skeleton() {
  return (
    <div>
      <div className="skeleton" />
      <style>
        {`
          .skeleton {
            border-radius: ${tokens.radii.default};
            display: block;
            position: relative;
            background: ${tokens.bg.secondary};
            overflow: hidden;
            height: 100%;
          }
        `}
      </style>
    </div>
  )
}
