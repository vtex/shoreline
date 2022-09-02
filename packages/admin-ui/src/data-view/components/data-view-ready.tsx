import type { ReactNode } from 'react'
import React from 'react'
import { VisuallyHidden } from '../../visually-hidden'
import { useDataViewContext } from '../context'

export function DataViewReady(props: DataViewReadyProps) {
  const { children } = props
  const { status } = useDataViewContext()

  const shouldRender = status !== 'error' && status !== 'not-found'

  return shouldRender ? (
    <>{children}</>
  ) : (
    <VisuallyHidden>{children}</VisuallyHidden>
  )
}

export interface DataViewReadyProps {
  children: ReactNode
}
