import React, { Children, cloneElement, ReactElement } from 'react'

import { Card, CardProps } from '../Card'
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

export function CollapsibleGroup(props: CollapsibleGroupProps) {
  const { children, ...restProps } = props

  return (
    <Card p="0" {...restProps}>
      {Children.map(children, (child, index) => (
        <>
          {index > FIRST_CHILD && <Divider m="0" />}
          {cloneElement(child, {
            ...child.props,
          })}
        </>
      ))}
    </Card>
  )
}

function Item(props: CollapsibleProps) {
  return <Collapsible bs="none" {...props} />
}

Item.Header = function ItemHeader(props: CollapsibleHeaderProps) {
  return <Header p="4" pl="2" {...props} />
}

Item.Content = function ItemContent(props: CollapsibleContentProps) {
  return <Content p="4" pt="0" {...props} />
}

CollapsibleGroup.Item = Item

export interface CollapsibleGroupProps extends Omit<CardProps, 'children'> {
  children: ReactElement | ReactElement[]
}
