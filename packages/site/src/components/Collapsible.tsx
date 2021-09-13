import type { ReactNode } from 'react'
import React from 'react'
import {
  Collapsible,
  CollapsibleHeader,
  CollapsibleContent,
  useCollapsibleState,
} from '@vtex/admin-ui'

interface Props {
  heading: string
  component: string
  children: ReactNode
  visible?: boolean
}

export default function DocsCollapsbile(props: Props) {
  const { heading, component, children, visible, ...restProps } = props
  const collapsible = useCollapsibleState({ visible })

  return (
    <Collapsible state={collapsible} {...restProps} csx={{ marginBottom: 2 }}>
      <CollapsibleHeader label={heading} />
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  )
}
