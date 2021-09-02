import React from 'react'
import {
  Collapsible,
  CollapsibleHeader,
  CollapsibleContent,
  useCollapsibleState,
} from '@vtex/admin-ui'
import warning from 'tiny-warning'
// @ts-expect-error: it is not typed correctly
import Props, { PropsTable } from 'pretty-proptypes'

import * as IconLib from '../../../icons'

interface Props {
  heading: string
  component: string
}

export default function PropDetails(props: Props) {
  const { heading, component, ...restProps } = props
  const collapsible = useCollapsibleState({ visible: false })

  return (
    <Collapsible state={collapsible} {...restProps} csx={{ marginBottom: 2 }}>
      <CollapsibleHeader label={heading} />
      <CollapsibleContent>
        <Proptypes component={component} />
      </CollapsibleContent>
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
