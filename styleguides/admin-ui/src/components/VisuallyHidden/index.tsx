import React from 'react'
import { VisuallyHidden as ReakitHidden, VisuallyHiddenProps } from 'reakit'

export function VisuallyHidden({ children, ...props }: VisuallyHiddenProps) {
  return <ReakitHidden {...props}>{children}</ReakitHidden>
}

export { VisuallyHiddenProps }
