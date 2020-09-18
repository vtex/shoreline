import React, { ReactNode } from 'react'

import {
  DisclosureStateReturn,
  useCollapsible,
} from '../components/Collapsible'
import { useSwitch, CheckboxStateReturn } from '../components/Switch'

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

function CheckboxState({ state = false, children }: CheckboxStateProps) {
  const switchProps = useSwitch({ state })

  return children?.({ ...switchProps })
}

Play.ToggleState = ToggleState
Play.CollapsibleState = CollapsibleState
Play.CheckboxState = CheckboxState

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

interface CheckboxStateProps {
  state?: boolean | 'indeterminate' | Array<number | string>
  children: (props: CheckboxStateReturn) => ReactNode
}
