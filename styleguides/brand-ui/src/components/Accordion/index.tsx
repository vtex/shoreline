import React, {
  Children,
  ReactElement,
  PropsWithChildren,
  useState,
} from 'react'
import { Box } from 'theme-ui'

import { useCollapsible, Collapsible, CollapsibleProps } from '../Collapsible'

interface AccordionInitalState {
  /**
   * Key of the current visible section content
   * @default -1
   */
  visible?: number
  /**
   * List with the keys of disabled sections
   * @default []
   */
  disabled?: number[]
}

interface AccordionProps
  extends Omit<CollapsibleProps, 'visible' | 'toggle' | 'disabled'>,
    AccordionInitalState {
  /**
   * Function to toggle a section with the key received
   */
  toggle: (key: number) => void
}

const useAccordion = (initialState?: AccordionInitalState): AccordionProps => {
  const [currentVisible, setVisible] = useState(initialState?.visible ?? -1)
  const collapsible = useCollapsible({ animated: true })

  const toggle = (id: number) => {
    setVisible((current) => (current === id ? -1 : id))
  }

  return {
    ...collapsible,
    visible: currentVisible,
    toggle,
    disabled: initialState?.disabled ?? [],
  }
}

function Panel({ children }: PropsWithChildren<{}>) {
  return <>{children}</>
}

/**
 * Accordion is a special kind of Collapse, which allows only one panel to be expanded at a time.
 * @example
 * ```jsx
 * import { Accordion, useAccordion } from '@vtex/brand-ui'
 * const accordion = useAccordion()
 *
 * <Accordion {...accordion}>
 *   <Accordion.Section>
 *     <Accordion.Section.Header>
 *       Header Section #1
 *     </Accordion.Section.Header>
 *     <Accordion.Section.Content>
 *       Content Section #1
 *     </Accordion.Section.Content>
 *   </Accordion.Section>
 *   <Accordion.Section>
 *     <Accordion.Section.Header>
 *       Header Section #2
 *     </Accordion.Section.Header>
 *     <Accordion.Section.Content>
 *       Content Section #2
 *     </Accordion.Section.Content>
 *   </Accordion.Section>
 * </Accordion>
 * ```
 */
function Accordion({
  visible,
  toggle,
  disabled = [],
  children,
  ...accordionProps
}: AccordionProps) {
  const createSection = (child: ReactElement, key: number) => {
    const props = {
      ...accordionProps,
      visible: visible === key,
      toggle: () => toggle(key),
      disabled: disabled.some((id) => id === key),
      baseId: `id-${key}`,
    }

    return React.createElement(Collapsible, props, child.props.children)
  }

  const items = Children.map(children as ReactElement, createSection)

  return <Box variant="accordion">{items}</Box>
}

Panel.Header = Collapsible.Header
Panel.Content = Collapsible.Content

Accordion.Section = Panel

export { Accordion, useAccordion, AccordionProps, AccordionInitalState }
