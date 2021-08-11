import type { ReactElement, ReactNode } from 'react'
import React, { cloneElement } from 'react'
import { ToolbarItem as BaseToolbarItem } from 'reakit/Toolbar'
import type { ExtractHTMLAttributes } from 'reakit-utils/ts'
import { isFunction } from '@vtex/onda-util'

import { useToolbarContext } from '../context'

/**
 * ToolbarItem wraps elements and supply its accessibility
 * props via render props to the targeted element.
 *
 * @example
 * const state = useToolbarState()
 *
 * <Toolbar state={state}>
 *  <Toolbar.Item>
 *   <Button>Item</Button>
 *  </Toolbar.Item>
 *  <Toolbar.Item>
 *   {(itemProps) => <Button {...itemProps}>Render props item</Button>}
 *  </Toolbar.Item>
 * </Toolbar>
 */
export function ToolbarItem(props: ToolbarItemProps) {
  const { children } = props
  const state = useToolbarContext()

  return (
    <BaseToolbarItem {...state}>
      {(itemProps) =>
        isFunction(children)
          ? (children as CallableFunction)(itemProps)
          : cloneElement(children as ReactElement, itemProps)
      }
    </BaseToolbarItem>
  )
}

interface ToolbarItemProps {
  children:
    | ReactElement
    | ((itemProps: ExtractHTMLAttributes<any>) => ReactNode)
}
