import React from 'react'
import warning from 'tiny-warning'
// @ts-expect-error
import { PropsTable } from 'pretty-proptypes'

import * as AdminUILib from '../../../admin-ui/src'

interface Props {
  component: string
  heading?: string
}

export function Proptypes(props: Props) {
  const { component, heading = '' } = props

  const targetComponent = (AdminUILib as Record<string, unknown>)[component]

  if (!targetComponent) {
    warning(targetComponent, 'Ooops component not found 😬')

    return <div>No props to show</div>
  }

  return <PropsTable heading={heading} component={targetComponent} />
}
