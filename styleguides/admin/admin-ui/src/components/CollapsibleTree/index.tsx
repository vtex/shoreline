import React, { Children, ReactNode } from 'react'

import { Overridable } from '../../types'
import { Card } from '../Card'
import { Collapsible, CollapsibleProps, Content, Header } from '../Collapsible'
import { Divider } from '../Divider'

const FIRST_CHILD = 0

/**
 * Component that nests Collapsible's components.
 * Composites: CollapsibleTree.Item
 *
 * @example
 * ```jsx
 * import { CollapsibleTree, useCollapsible } from `@vtex/admin-ui`
 *
 * function UseCase() {
 *   const state = useCollapsible()
 *
 *   return (
 *     <CollapsibleTree>
 *       <CollapsibleTree.Item state={state}>
 *         <CollapsibleTree.Item.Header label="Collapsible Label"/>
 *         <CollapsibleTree.Item.Content>
 *           {content}
 *         </CollapsibleTree.Item.Content>
 *       </CollapsibleTree.Item>
 *     </CollapsibleTree>
 *   )
 * }
 * ```
 */
export function CollapsibleTree(props: CollapsibleTreeProps) {
  const { children, styleOverrides, ...cardProps } = props

  return (
    <Card styleOverrides={styleOverrides} padding={0} {...cardProps}>
      {Children.map(children, (child, index) => (
        <>
          {index > FIRST_CHILD && <Divider margin={0} />}
          {child}
        </>
      ))}
    </Card>
  )
}

function CollapsibleTreeItem(props: CollapsibleProps) {
  const { styleOverrides, ...collapsibleProps } = props

  return (
    <Collapsible
      styleOverrides={{ borderStyle: 'none', ...styleOverrides }}
      {...collapsibleProps}
    />
  )
}

/**
 * ```
 * CollapsibleTree.Item header is always visible.
 * Disclosure Button -> always on the left side, and is responsible for controlling the content visibility.
 * Actions Panel -> always on the right side.
 * ```
 */
CollapsibleTreeItem.Header = Header

/**
 * ```
 * CollapsibleTree.Item content.
 * Can be visible or hidden.
 * ```
 */
CollapsibleTreeItem.Content = Content

/**
 * Same as the `Collapsible` component.
 *
 * @example
 * ```jsx
 * import { CollapsibleTree, useCollapsible } from `@vtex/admin-ui`
 * const state = useCollapsible()
 * <CollapsibleTree>
 *   <CollapsibleTree.Item state={state}>
 *     <CollapsibleTree.Item.Header label="Title goes here">
 *       {children}
 *     </CollapsibleTree.Item.Header>
 *     <CollapsibleTree.Item.Content>{content}</CollapsibleTree.Item.Content>
 *   </CollapsibleTree.Item>
 * </CollapsibleTree>
 * ```
 */
CollapsibleTree.Item = CollapsibleTreeItem

export interface CollapsibleTreeProps extends Overridable {
  children?: ReactNode
}
