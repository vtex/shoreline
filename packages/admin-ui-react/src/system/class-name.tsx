import type { ReactNode } from 'react'
import React from 'react'
import type { StyleProp } from '@vtex/admin-ui-core'

import { useSystem } from './context'

/**
 * ClassName as render props
 * @example
 * <ClassName>{(className) => <div className={className} />}</ClassName>
 */
export function ClassName(props: ClassNameProps) {
  const { csx, children } = props
  const { cn } = useSystem()

  return <>{children(cn(csx))}</>
}

export interface ClassNameProps {
  children: (className: string) => ReactNode
  csx: StyleProp
}
