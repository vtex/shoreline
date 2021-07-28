import {
  useModalState,
  ModalStateReturn,
  ModalInitialState,
} from './useModalState'

export function ModalState(props: ModalStateProps) {
  const { initialState, children } = props
  const state = useModalState(initialState)

  return children(state)
}

export interface ModalStateProps {
  children: (state: ModalStateReturn) => JSX.Element
  initialState?: ModalInitialState
}
