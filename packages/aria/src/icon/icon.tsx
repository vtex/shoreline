import type { ReactElement, ReactNode } from 'react'
import React, { Children, cloneElement } from 'react'

import { VisuallyHidden } from '../visually-hidden'

export function Icon(props: IconProps) {
  const { children, label, ...rest } = props
  const child = Children.only(children)

  return (
    <>
      {cloneElement(child as ReactElement, {
        'data-sl-icon': true,
        'aria-hidden': true,
        focusable: false,
        ...rest,
      })}
      <VisuallyHidden>{label}</VisuallyHidden>
    </>
  )
}

// export function useIcon(props: IconProps) {}

export interface IconProps {
  label: string
  children?: ReactNode
}
