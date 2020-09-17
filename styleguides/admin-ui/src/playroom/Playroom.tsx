import React, { ReactNode } from 'react'

import {
  DisclosureStateReturn,
  useCollapsible,
} from '../components/Collapsible'

export function Play({ children }: Props) {
  return <>{children}</>
}

function ToggleState({ children }: ToggleStateProps) {
  const [toggle, setToggle] = React.useState(false)

  return children?.({ toggle, setToggle })
}

function CollapsibleState({ children }: CollapsibleStateProps) {
  const collapsibleProps = useCollapsible({ visible: false })

  return children?.({ ...collapsibleProps })
}

Play.ToggleState = ToggleState
Play.CollapsibleState = CollapsibleState

interface Props {
  children: ReactNode
}

interface ToggleStateProps {
  children: (props: {
    toggle: boolean
    setToggle: React.Dispatch<React.SetStateAction<boolean>>
  }) => ReactNode
}

interface CollapsibleStateProps {
  children: (props: DisclosureStateReturn) => ReactNode
}
