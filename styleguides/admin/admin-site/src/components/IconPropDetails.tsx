import React from 'react'
import { Collapsible, useCollapsible } from '@vtex/admin-ui'
import warning from 'tiny-warning'
// @ts-expect-error: it is not typed correctly
import Props, { PropsTable } from 'pretty-proptypes'

import * as IconLib from '../../../admin-ui-icons/src'

interface Props {
  heading: string
  component: string
}

export default function PropDetails(props: Props) {
  const { heading, component, ...restProps } = props
  const collapsible = useCollapsible({ visible: false })

  return (
    <Collapsible state={collapsible} {...restProps} styleOverrides={{ marginBottom: 2 }}>
      <Collapsible.Header label={heading} />
      <Collapsible.Content>
        <Proptypes component={component} />
      </Collapsible.Content>
    </Collapsible>
  )
}

interface PropTypesProps {
  /** target component */
  component: string
  /** title */
  heading?: string
  /** if should collapse shapes */
  collapse?: boolean
  /** if is a table */
  table?: boolean
}

function Proptypes(props: PropTypesProps) {
  const { component, heading = '', collapse = false, table = false } = props

  const targetComponent = (IconLib as Record<string, unknown>)[component]

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
