import type { ReactNode } from 'react'
import type { ActionsState } from './use-actions'
import React from 'react'

export function ActionItem(props: ActionItemProps) {
  const { state, id, children } = props

  if (state.activeItem !== id) return null

  return <>{children}</>
}

interface ActionItemProps {
  state: ActionsState
  id: string
  children: ReactNode
}
