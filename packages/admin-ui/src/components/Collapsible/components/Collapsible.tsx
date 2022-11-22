import React from 'react'

import { createComponent, useElement } from '@vtex/admin-ui-react'

import { CollapsibleProvider } from '../context'
import { useGroup } from '../../Group'

import type { CollapsibleState } from '../hooks/useCollapsibleState'

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
export const Collapsible = createComponent<'div', CollapsibleOptions>(
  (props) => {
    const {
      csx,
      children,
      disabled = false,
      state,
      ...collapsibleProps
    } = props

    const { grouped } = useGroup()

    return useElement('div', {
      ...collapsibleProps,
      baseStyle: {
        bg: '$primary',
        border: '$neutral',
        borderRadius: '$border-radius-base',
        borderWidth: grouped ? 0 : 1,
      },
      children: (
        <CollapsibleProvider disabled={disabled} {...state}>
          {children}
        </CollapsibleProvider>
      ),
    })
  }
)

export interface CollapsibleOptions {
  disabled?: boolean
  /** useCollapsibleState hook return */
  state: CollapsibleState
}
