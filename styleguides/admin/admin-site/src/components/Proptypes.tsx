import React from 'react'
import warning from 'tiny-warning'
// @ts-expect-error
import Props, { PropsTable } from 'pretty-proptypes'

import * as AdminUILib from '../../../admin-ui/src'

interface Props {
  /** target component */
  component: string
  /** title */
  heading?: string
  /** if should collapse shapes */
  collapse?: boolean
  /** if is a table */
  table?: boolean
}

export function Proptypes(props: Props) {
  const { component, heading = '', collapse = false, table = false } = props

  const targetComponent = (AdminUILib as Record<string, unknown>)[component]

  if (!targetComponent) {
    warning(targetComponent, 'Ooops component not found 😬')

    return <div>No props to show</div>
  }

  const Component = table ? PropsTable : Props

  return (
    <Component
      heading={heading}
      shouldCollapseProps={collapse}
      component={targetComponent}
    />
  )
}
