import React from 'react'
import { ToolbarItem as BaseToolbarItem } from 'reakit/Toolbar'
import type { ButtonProps } from '../../Button'
import { Button } from '../../Button'

import { useToolbarContext } from '../context'

/**
 * Button as a ToolbarItem
 * @example
 * const state = useToolbarState()
 *
 * <Toolbar state={state}>
 *  <ToolbarButton>Item</ToolbarButton>
 * </Toolbar>
 */
export function ToolbarButton(props: ButtonProps) {
  const state = useToolbarContext()

  return <BaseToolbarItem as={Button} {...state} {...props} />
}
