import type { ReactNode } from 'react'
import type { TopbarOptionsState } from './use-options'
import React from 'react'

export function OptionItem(props: OptionItemProps) {
  const { state, id, children } = props

  if (state.activeItem !== id) return null

  return <>{children}</>
}

interface OptionItemProps {
  state: TopbarOptionsState
  id: string
  children: ReactNode
}
