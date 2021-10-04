import React from 'react'
import type { DisclosureProps, DisclosureStateReturn } from 'reakit/Disclosure'

import { jsx } from '@vtex/admin-ui-react'

import { CollapsibleProvider } from '../context'
import { useGroup } from '../../Group'

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
    bg: 'light.primary',
    borderColor: 'mid.tertiary',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 'default',
  },
  {
    options: ['disabled', 'focusable', 'state'],
    useOptions(options: CollapsibleOptions, props) {
      const { disabled, focusable, state } = options
      const { csx, children, ...collapsibleProps } = props
      const { grouped } = useGroup()

      return {
        ...collapsibleProps,
        csx: {
          borderWidth: grouped ? 0 : 1,
          ...csx,
        },
        children: (
          <CollapsibleProvider
            focusable={focusable}
            disabled={disabled}
            {...state}
          >
            {children}
          </CollapsibleProvider>
        ),
      }
    },
  }
)

export interface CollapsibleOptions
  extends Pick<DisclosureProps, 'focusable' | 'disabled'> {
  /** useCollapsibleState hook return */
  state: DisclosureStateReturn
}
