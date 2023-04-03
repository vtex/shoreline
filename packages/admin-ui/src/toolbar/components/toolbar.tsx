import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { Toolbar as ReakitToolbar } from 'reakit/Toolbar'

import { Inline } from '../../inline'
import type { ToolbarState } from '../state'
import { ToolbarContext } from '../context'
import { cx } from '@vtex/admin-ui-core'
import { toolbarTheme } from './toolbar.css'

/**
 * Toolbar enables accessible arrow navigation
 *
 * @example
 * const state = useToolbarState()
 * <Toolbar state={state}/>
 */

export const Toolbar = forwardRef(function Toolbar(
  props: ToolbarProps,
  ref: Ref<HTMLDivElement>
) {
  const { state, children, className = '', ...htmlProps } = props

  return (
    <ReakitToolbar
      ref={ref}
      state={state}
      className={cx(toolbarTheme, className)}
      {...htmlProps}
    >
      <Inline>
        <ToolbarContext.Provider value={state}>
          {children}
        </ToolbarContext.Provider>
      </Inline>
    </ReakitToolbar>
  )
})

export interface ToolbarProps extends ComponentPropsWithoutRef<'div'> {
  state: ToolbarState
}
