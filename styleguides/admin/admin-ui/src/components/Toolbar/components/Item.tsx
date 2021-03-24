import React, { ReactNode } from 'react'
import { ExtractHTMLAttributes } from 'reakit-utils/ts'
import { ReakitToolbarItem, ToolbarState } from './Aria'

export function ToolbarItem(props: ToolbarItemProps) {
  const { state, children } = props

  return (
    <ReakitToolbarItem {...state}>
      {(itemProps) => children(itemProps)}
    </ReakitToolbarItem>
  )
}

interface ToolbarItemProps {
  state: ToolbarState
  children: (itemProps: ExtractHTMLAttributes<any>) => ReactNode
}
