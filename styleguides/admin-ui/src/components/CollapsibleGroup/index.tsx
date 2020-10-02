import { forwardRef } from '@vtex-components/utils'
import React, { Children, Ref, cloneElement, ReactElement } from 'react'

import { Card, CardProps } from '../Card'
import { Divider } from '../Divider'

export const CollapsibleGroup = forwardRef(
  (props: CollapsibleGroupProps, ref: Ref<HTMLDivElement>) => {
    const { children, ...restProps } = props

    return (
      <Card p="0" {...restProps} ref={ref}>
        {Children.map(children, (child, index) => (
          <>
            {index >= 1 && <Divider m="0" />}
            {cloneElement(child, {
              ...child.props,
              bs: 'none',
            })}
          </>
        ))}
      </Card>
    )
  }
)

export interface CollapsibleGroupProps extends Omit<CardProps, 'children'> {
  children: ReactElement | ReactElement[]
}
