import type { ReactNode } from 'react'
import React from 'react'
import { ToolbarItem as BaseToolbarItem } from 'reakit/Toolbar'
import type { ExtractHTMLAttributes } from 'reakit-utils/ts'

import { useToolbarContext } from '../context'

/**
 * ToolbarItem wraps elements and supply its accessibility
 * props via render props to the targeted element.
 *
 * @example
 * const state = useToolbarState()
 *
 * <Toolbar state={state}>
 *  <ToolbarItem>
 *   {(itemProps) => <Button {...itemProps}>Render props item</Button>}
 *  </ToolbarItem>
 * </Toolbar>
 */
export function ToolbarItem(props: ToolbarItemProps) {
  const { children } = props
  const state = useToolbarContext()

  return (
    <BaseToolbarItem {...state}>
      {(itemProps) => children(itemProps)}
    </BaseToolbarItem>
  )
}

interface ToolbarItemProps {
  children: (itemProps: ExtractHTMLAttributes<any>) => ReactNode
}
