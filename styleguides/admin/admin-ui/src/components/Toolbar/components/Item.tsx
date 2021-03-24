import React, { ReactNode } from 'react'
import { ExtractHTMLAttributes } from 'reakit-utils/ts'
import { useToolbarContext } from '../context'
import { ReakitToolbarItem } from './Aria'

export function ToolbarItem(props: ToolbarItemProps) {
  const { children } = props
  const state = useToolbarContext()

  return (
    <ReakitToolbarItem {...state}>
      {(itemProps) => children(itemProps)}
    </ReakitToolbarItem>
  )
}

interface ToolbarItemProps {
  children: (itemProps: ExtractHTMLAttributes<any>) => ReactNode
}
