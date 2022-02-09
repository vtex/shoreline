import React from 'react'

import { jsx } from '@vtex/admin-ui-react'

import { CollapsibleProvider } from '../context'
import { useGroup } from '../../Group'

import type { CollapsibleState } from '..'

/**
 * A Collapsible is a container that allows toggling the display of content. It can be nested as well.
 * @example
 * ```jsx
 * import { Collapsible, useCollapsibleState } from `@vtex/admin-ui`
 * const state = useCollapsibleState()
 * <Collapsible state={state}>
 *   <Collapsible.Header label="Title goes here">
 *     {children}
 *   </Collapsible.Header>
 *   <Collapsible.Content>{content}</Collapsible.Content>
 * </Collapsible>
 * ```
 */
export const Collapsible = jsx('div')(
  {
    bg: '$primary',
    border: '$neutral',
    borderRadius: 'default',
  },
  {
    options: ['disabled', 'state'],
    useOptions(options: CollapsibleOptions, props) {
      const { disabled, state } = options
      const { csx, children, ...collapsibleProps } = props
      const { grouped } = useGroup()

      return {
        ...collapsibleProps,
        csx: {
          borderWidth: grouped ? 0 : 1,
          ...csx,
        },
        children: (
          <CollapsibleProvider disabled={disabled} {...state}>
            {children}
          </CollapsibleProvider>
        ),
      }
    },
  }
)

export interface CollapsibleOptions {
  disabled: boolean
  /** useCollapsibleState hook return */
  state: CollapsibleState
}
