import { mergeSx } from '@vtex-components/theme'
import React, {
  Children,
  ReactElement,
  PropsWithChildren,
  useState,
  useEffect,
} from 'react'
import { DisclosureStateReturn } from 'reakit'
import { Box, SxStyleProp } from 'theme-ui'

import { useCollapsible, Collapsible, CollapsibleProps } from '../Collapsible'

interface AccordionInitialState {
  /**
   * Key of the current visible section content
   * @default -1
   */
  visible?: boolean | number
  /**
   * List with the keys of disabled sections
   * @default []
   */
  disabled?: number[]
}

interface AccordionProps
  extends Omit<CollapsibleProps, 'visible' | 'toggle' | 'disabled'>,
    AccordionInitialState {
  /**
   * Function to toggle a section with the key received
   */
  toggle: (key: number) => void
}

interface useAccordionReturn {
  props: AccordionProps,
  states: DisclosureStateReturn[]
}

interface useAccordionProps {
  collapsibles: number,
  initialState?: AccordionInitialState,
  animated?: boolean
}

const useAccordion = ({collapsibles, initialState, animated}: useAccordionProps): useAccordionReturn => {
  const [currentVisible, setVisible] = useState((initialState?.visible ?? -1) as number)
  const useCollapsibles = Array.from({length: collapsibles}, _ => useCollapsible({animated}))

  useEffect(() => {
    if (currentVisible > -1) useCollapsibles[currentVisible].show()
  }, [currentVisible])

  const toggle = (id: number) => {
    setVisible((current) => {
      if (current > -1) useCollapsibles[current].hide()
      if(current !== id) useCollapsibles[id].show()
      return(current === id ? -1 : id)
    })
  }

  return {props: {...useCollapsibles[0],
        visible: currentVisible,
        toggle,
        disabled: initialState?.disabled ?? []}, states: useCollapsibles}
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
  sx = {},
  ...accordionProps
}: AccordionProps) {
  const createSection = (child: ReactElement, key: number) => {
    const style = {
      '& > button': {
        borderBottom: 'solid',
        borderBottomWidth: '1px',
        borderBottomColor: 'muted.2',
      },
    }

    const props = {
      ...accordionProps,
      visible: visible === key,
      toggle: () => toggle(key),
      disabled: disabled.some((id) => id === key),
      baseId: `id-${key}`,
      sx: mergeSx<SxStyleProp>(sx, style),
    }

    return React.createElement(Collapsible, props, child.props.children)
  }

  const items = Children.map(children as ReactElement, createSection)

  return <Box variant="accordion">{items}</Box>
}

Panel.Header = Collapsible.Header
Panel.Content = Collapsible.Content

Accordion.Section = Panel

export { Accordion, useAccordion, AccordionProps, AccordionInitialState }
