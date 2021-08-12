import React from 'react'
import { Toolbar as BaseToolbar } from 'reakit/Toolbar'
import { jsx } from '@vtex/onda-react'

import { Set } from '../../Set'
import type { ToolbarState } from '../state'
import { ToolbarContext } from '../context'

/**
 * Toolbar enables accessible arrow navigation
 *
 * @example
 * const state = useToolbarState()
 * <Toolbar state={state}/>
 */
export const Toolbar = jsx(BaseToolbar)(
  {
    // avoid focus cut-out
    paddingX: '2px',
  },
  {
    options: ['state'],
    useOptions(options: ToolbarOptions, props) {
      const { state } = options
      const { children, ...toolbarProps } = props

      return {
        ...state,
        ...toolbarProps,
        children: (
          <Set spacing={3}>
            <ToolbarContext.Provider value={state}>
              {children}
            </ToolbarContext.Provider>
          </Set>
        ),
      }
    },
  }
)

interface ToolbarOptions {
  state: ToolbarState
}
