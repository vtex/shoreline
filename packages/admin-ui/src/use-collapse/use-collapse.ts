import { useCallback } from 'react'
import externalUseCollapse from 'react-collapsed'
import type {
  GetCollapsePropsInput,
  GetCollapsePropsOutput,
  GetTogglePropsInput,
  GetTogglePropsOutput,
} from 'react-collapsed/dist/types'

export const useCollapse = (props?: UseCollapsibleParams): CollapsibleState => {
  const { getCollapseProps, getToggleProps, isExpanded, setExpanded } =
    externalUseCollapse({
      ...props,
      defaultExpanded: props?.visible,
    })

  const toggle = useCallback(() => {
    setExpanded(!isExpanded)
  }, [isExpanded])

  return {
    getToggleProps,
    getCollapseProps,
    visible: isExpanded,
    toggle,
  }
}

export interface UseCollapsibleParams {
  onCollapseStart?: () => void
  onCollapseEnd?: () => void
  onExpandStart?: () => void
  onExpandEnd?: () => void
  /** Weather the content is visible at first or not */
  visible?: boolean
}

export interface CollapsibleState {
  getToggleProps: (config?: GetTogglePropsInput) => GetTogglePropsOutput
  getCollapseProps: (config?: GetCollapsePropsInput) => GetCollapsePropsOutput
  /** Is true if content is currently visible */
  visible: boolean
  /** Toggle collapsible expansion */
  toggle: () => void
}
