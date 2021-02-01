import React, { ReactNode } from 'react'
import { Collapsible, useCollapsible } from '@vtex/admin-ui'

interface Props {
  heading: string
  component: string
  children: ReactNode
  visible?: boolean
}

export default function DocsCollapsbile(props: Props) {
  const { heading, component, children, visible, ...restProps } = props
  const collapsible = useCollapsible({ visible })

  return (
    <Collapsible
      state={collapsible}
      {...restProps}
      styleOverrides={{ marginBottom: 2 }}
    >
      <Collapsible.Header label={heading} />
      <Collapsible.Content>{children}</Collapsible.Content>
    </Collapsible>
  )
}
