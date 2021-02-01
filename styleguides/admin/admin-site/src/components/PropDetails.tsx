import React from 'react'
import { Collapsible, useCollapsible } from '@vtex/admin-ui'

import { Proptypes } from './Proptypes'

interface Props {
  heading: string
  component: string
}

export default function PropDetails(props: Props) {
  const { heading, component, ...restProps } = props
  const collapsible = useCollapsible({ visible: false })

  return (
    <Collapsible
      state={collapsible}
      {...restProps}
      styleOverrides={{ marginBottom: 2 }}
    >
      <Collapsible.Header label={heading} />
      <Collapsible.Content>
        <Proptypes component={component} />
      </Collapsible.Content>
    </Collapsible>
  )
}
