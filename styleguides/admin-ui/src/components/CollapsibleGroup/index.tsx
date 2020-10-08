import React, { Children, cloneElement, ReactElement } from 'react'
import { SxStyleProp } from 'theme-ui'

import {
  BorderTokensProps,
  ColorTokensProps,
  LayoutTokensProps,
  SpaceTokensProps,
} from '../../tokens'
import { Card } from '../Card'
import {
  Collapsible,
  CollapsibleContentProps,
  CollapsibleHeaderProps,
  CollapsibleProps,
  Content,
  Header,
} from '../Collapsible'
import { Divider } from '../Divider'

const FIRST_CHILD = 0

/**
 * Component that group Collapsible's components.
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
 *       <CollapsibleGroup.Item state={state}>
 *         <CollapsibleGroup.Item.Header label="Collapsible Label"/>
 *         <CollapsibleGroup.Item.Content>
 *           {content}
 *         </CollapsibleGroup.Item.Content>
 *       </CollapsibleGroup.Item>
 *     </CollapsibleGroup>
 *   )
 * }
 * ```
 */
export function CollapsibleGroup(props: CollapsibleGroupProps) {
  const { children, sx, ...restProps } = props

  return (
    <Card p="0" sx={sx} {...restProps}>
      {Children.map(children, (child, index) => (
        <>
          {index > FIRST_CHILD && <Divider m="0" />}
          {cloneElement(child)}
        </>
      ))}
    </Card>
  )
}

function Item(props: CollapsibleProps) {
  return <Collapsible bs="none" {...props} />
}

/**
 * ```
 * CollapsibleGroup.Item header is always visible.
 * Disclosure Button -> always on the left side, and is responsible for controlling the content visibility.
 * Actions Panel -> always on the right side.
 * ```
 */
Item.Header = function ItemHeader(props: CollapsibleHeaderProps) {
  return <Header p="4" pl="2" {...props} />
}

/**
 * ```
 * CollapsibleGroup.Item content.
 * Can be visible or hidden.
 * ```
 */
Item.Content = function ItemContent(props: CollapsibleContentProps) {
  return <Content p="4" pt="0" {...props} />
}

/**
 * Same as the `Collapsible` component.
 *
 * @example
 * ```jsx
 * import { CollapsibleGroup, useCollapsible } from `@vtex/admin-ui`
 * const state = useCollapsible()
 * <CollapsibleGroup>
 *   <CollapsibleGroup.Item state={state}>
 *     <CollapsibleGroup.Item.Header label="Title goes here">
 *       {children}
 *     </CollapsibleGroup.Item.Header>
 *     <CollapsibleGroup.Item.Content>{content}</CollapsibleGroup.Item.Content>
 *   </CollapsibleGroup.Item>
 * </CollapsibleGroup>
 * ```
 */
CollapsibleGroup.Item = Item

export interface CollapsibleGroupProps
  extends BorderTokensProps,
    SpaceTokensProps,
    LayoutTokensProps,
    Pick<ColorTokensProps, 'bg' | 'bc' | 'btc' | 'bbc' | 'blc' | 'brc'> {
  children: ReactElement | ReactElement[]
  /** ThemeUI Style Prop */
  sx?: SxStyleProp
}
