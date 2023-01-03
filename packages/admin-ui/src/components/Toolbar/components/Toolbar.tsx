import React from 'react'
import { Toolbar as ReakitToolbar } from 'reakit/Toolbar'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import { Inline } from '../../../inline'
import type { ToolbarState } from '../state'
import { ToolbarContext } from '../context'

/**
 * Toolbar enables accessible arrow navigation
 *
 * @example
 * const state = useToolbarState()
 * <Toolbar state={state}/>
 */
export const Toolbar = createComponent<typeof ReakitToolbar, ToolbarOptions>(
  (props) => {
    const { state, children, ...restProps } = props

    return useElement(ReakitToolbar, {
      baseStyle: {
        // avoid focus cut-out
        paddingX: '$space-05',
      },
      children: (
        <Inline>
          <ToolbarContext.Provider value={state}>
            {children}
          </ToolbarContext.Provider>
        </Inline>
      ),
      ...restProps,
      ...state,
    })
  }
)

interface ToolbarOptions {
  state: ToolbarState
}
