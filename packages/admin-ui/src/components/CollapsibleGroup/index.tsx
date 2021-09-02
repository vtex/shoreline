import type { ReactNode } from 'react'
import React, { Children, Fragment } from 'react'
import { isElement } from 'react-is'

import type { SystemComponent } from '../../types'
import { Card } from '../Card'
import { Divider } from '../Divider'
import { Group } from '../Group'

const FIRST_CHILD_INDEX = 0

/**
 * Component that nests Collapsible's components.
 * @example
 * ```jsx
 * import { CollapsibleGroup, useCollapsibleState } from `@vtex/admin-ui`
 *
 * function UseCase() {
 *   const state = useCollapsibleState()
 *
 *   return (
 *     <CollapsibleGroup>
 *       <Collapsible state={state}>
 *         <CollapsibleHeader label="Collapsible Label"/>
 *         <CollapsibleContent>
 *           {content}
 *         </CollapsibleContent>
 *       </Collapsible>
 *     </CollapsibleGroup>
 *   )
 * }
 * ```
 */
export function CollapsibleGroup(props: CollapsibleGroupProps) {
  const { children, csx, ...cardProps } = props

  const validChildren = Children.toArray(children).filter((child) =>
    isElement(child)
  )

  return (
    <Card csx={{ padding: 0, ...csx }} {...cardProps}>
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

export interface CollapsibleGroupProps extends SystemComponent {
  children?: ReactNode
}
