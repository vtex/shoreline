import React from 'react'
import {
  Collapsible,
  CollapsibleHeader,
  CollapsibleContent,
  useCollapsibleState,
} from '@vtex/admin-ui'

import { Proptypes } from './Proptypes'

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
