import React, { ReactNode } from 'react'

import {
  DisclosureStateReturn,
  useCollapsible,
} from '../components/Collapsible'
import { useToggle, CheckboxStateReturn } from '../components/Toggle'
import { useMenuState, MenuStateReturn } from '../components/Menu'

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
  const switchProps = useToggle({ state })

  return children?.({ ...switchProps })
}

function MenuState({ children }: MenuStateProps) {
  const menuProps = useMenuState({
    orientation: 'vertical',
    loop: true,
    placement: 'bottom-start',
  })

  return children?.({ ...menuProps })
}

Play.ToggleState = ToggleState
Play.CollapsibleState = CollapsibleState
Play.CheckboxState = CheckboxState
Play.MenuState = MenuState

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

interface MenuStateProps {
  children: (props: MenuStateReturn) => ReactNode
}
