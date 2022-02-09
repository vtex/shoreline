import useCollapse from 'react-collapsed'
import type {
  GetCollapsePropsOutput,
  GetTogglePropsOutput,
} from 'react-collapsed/dist/types'

export const useCollapsibleState = (
  props?: UseCollapsibleStateParams
): CollapsibleState => {
  const { getCollapseProps, getToggleProps, isExpanded, setExpanded } =
    useCollapse({
      ...props,
      defaultExpanded: props?.visible,
    })

  const toggleProps = getToggleProps()
  const { id: baseId } = toggleProps

  const toggle = () => {
    setExpanded(!isExpanded)
  }

  return {
    toggleProps,
    collapseProps: getCollapseProps(),
    visible: isExpanded,
    toggle,
    baseId,
  }
}

export interface UseCollapsibleStateParams {
  onCollapseStart?: () => void
  onCollapseEnd?: () => void
  onExpandStart?: () => void
  onExpandEnd?: () => void
  visible?: boolean
}

export interface CollapsibleState {
  toggleProps: GetTogglePropsOutput
  collapseProps: GetCollapsePropsOutput
  visible: boolean
  toggle: () => void
  baseId: string
}
