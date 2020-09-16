import React from 'react'

import { useCollapsible } from '../src/components/Collapsible'

export default function Play({ children }) {
  return <>{children}</>
}

function ToggleState({ children }) {
  const [toggle, setToggle] = React.useState(false)

  return children?.({ toggle, setToggle })
}

function CollapsibleState({ children }) {
  const collapsibleProps = useCollapsible({ visible: true })

  return children?.({ ...collapsibleProps })
}

Play.ToggleState = ToggleState
Play.CollapsibleState = CollapsibleState
