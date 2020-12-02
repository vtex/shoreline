import React, { Children, ReactNode, Fragment } from 'react'
import { isElement } from 'react-is'

import { Overridable } from '../../types'
import { Card } from '../Card'
import { Divider } from '../Divider'
import { Group } from '../Group'

const FIRST_CHILD_INDEX = 0

/**
 * Component that nests Collapsible's components.
 * Composites: CollapsibleGroup.Item
 *
 * @example
 * ```jsx
 * import { CollapsibleGroup, useCollapsible } from `@vtex/admin-ui`
 *
 * function UseCase() {
 *   const state = useCollapsible()
 *
 *   return (
 *     <CollapsibleGroup>
 *       <Collapsible state={state}>
 *         <Collapsible.Header label="Collapsible Label"/>
 *         <Collapsible.Content>
 *           {content}
 *         </Collapsible.Content>
 *       </Collapsible>
 *     </CollapsibleGroup>
 *   )
 * }
 * ```
 */
export function CollapsibleGroup(props: CollapsibleGroupProps) {
  const { children, styleOverrides, ...cardProps } = props

  const validChildren = Children.toArray(children).filter((child) =>
    isElement(child)
  )

  return (
    <Card styleOverrides={{ padding: 0, ...styleOverrides }} {...cardProps}>
      <Group>
        {Children.map(validChildren, (child, index) => (
          <Fragment>
            {index > FIRST_CHILD_INDEX && <Divider />}
            {child}
          </Fragment>
        ))}
      </Group>
    </Card>
  )
}

export interface CollapsibleGroupProps extends Overridable {
  children?: ReactNode
}
